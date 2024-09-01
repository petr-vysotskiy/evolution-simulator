const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const zlib = require('zlib');
const protobuf = require('./world_pb.js');
const Matter = require('matter-js');

const { Engine, World, Bodies, Constraint } = Matter;

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const engine = Engine.create();
const world = engine.world;

let isFirstClientConnected = false;
let updateInterval = null;

const lastWorldData = {
    bodies: {},
    constraints: {}
};

// Function to round numbers to reduce data size
const roundTo = (value, places) => {
    const factor = Math.pow(10, places);
    return Math.round(value * factor) / factor;
};

// Function to create a creature in the Matter.js world
const createCreature = (world, creatureJson) => {
    const joints = {};
    const bones = {};

    // Create joints (as Matter.js bodies)
    creatureJson.joints.forEach(joint => {
        const body = Bodies.circle(joint.x * 10 + 400, -joint.y * 10 + 300, 5, {
            mass: joint.weight,
            friction: 0.1,
            restitution: 0.9,
            label: `joint_${joint.id}`
        });
        joints[joint.id] = body;
        World.add(world, body);
    });

    // Create bones (as Matter.js constraints)
    creatureJson.bones.forEach(bone => {
        const constraint = Constraint.create({
            bodyA: joints[bone.startJointID],
            bodyB: joints[bone.endJointID],
            length: Math.hypot(
                joints[bone.endJointID].position.x - joints[bone.startJointID].position.x,
                joints[bone.endJointID].position.y - joints[bone.startJointID].position.y
            ),
            stiffness: 0.7,
            label: `bone_${bone.id}`
        });
        bones[bone.id] = constraint;
        World.add(world, constraint);
    });

    // Create muscles (as additional constraints)
    creatureJson.muscles.forEach(muscle => {
        const bodyA = bones[muscle.startBoneID].bodyA;
        const bodyB = bones[muscle.endBoneID].bodyB;

        const muscleConstraint = Constraint.create({
            bodyA: bodyA,
            bodyB: bodyB,
            pointA: { x: 0, y: 0 }, // Attach at center of bone A
            pointB: { x: 0, y: 0 }, // Attach at center of bone B
            length: Math.hypot(
                bodyB.position.x - bodyA.position.x,
                bodyB.position.y - bodyA.position.y
            ),
            stiffness: 0.9,
            label: `muscle_${muscle.id}`
        });

        World.add(world, muscleConstraint);
    });
};

// Function to create a static ground in the Matter.js world
const createGround = (world) => {
    const ground = Bodies.rectangle(400, 590, 810, 60, {
        isStatic: true, 
        label: 'Ground'
    });
    World.add(world, ground);
};

// Creature JSON definition
const creatureJson = {
  "name": "Ololosha",
  "joints": [
    { "id": 0, "x": -6.48098564, "y": 4.64400101, "weight": 1 },
    { "id": 1, "x": -3.06345272, "y": 14.808672, "weight": 1 },
    { "id": 2, "x": -0.0135471281, "y": 12.7705307, "weight": 1 },
    { "id": 3, "x": 2.8352797, "y": 16.0610943, "weight": 1 },
    { "id": 4, "x": 5.63789082, "y": 9.32218742, "weight": 1 },
    { "id": 5, "x": 1.94118965, "y": 10.9499369, "weight": 1 },
    { "id": 6, "x": -1.26729715, "y": 10.7079535, "weight": 1 }
  ],
  "bones": [
    { "id": 7, "startJointID": 0, "endJointID": 1, "weight": 1, "legacy": false },
    { "id": 8, "startJointID": 1, "endJointID": 2, "weight": 1, "legacy": false },
    { "id": 9, "startJointID": 2, "endJointID": 3, "weight": 1, "legacy": false },
    { "id": 10, "startJointID": 3, "endJointID": 4, "weight": 1, "legacy": false },
    { "id": 11, "startJointID": 5, "endJointID": 2, "weight": 1, "legacy": false },
    { "id": 12, "startJointID": 2, "endJointID": 6, "weight": 1, "legacy": false },
    { "id": 13, "startJointID": 6, "endJointID": 5, "weight": 1, "legacy": false }
  ],
  "muscles": [
    { "id": 14, "startBoneID": 8, "endBoneID": 9, "strength": 1500, "canExpand": true },
    { "id": 15, "startBoneID": 9, "endBoneID": 11, "strength": 1500, "canExpand": true },
    { "id": 20, "startBoneID": 11, "endBoneID": 10, "strength": 1500, "canExpand": true },
    { "id": 21, "startBoneID": 10, "endBoneID": 9, "strength": 1500, "canExpand": true },
    { "id": 22, "startBoneID": 12, "endBoneID": 8, "strength": 1500, "canExpand": true },
    { "id": 24, "startBoneID": 8, "endBoneID": 7, "strength": 1500, "canExpand": true },
    { "id": 25, "startBoneID": 7, "endBoneID": 12, "strength": 1500, "canExpand": true }
  ]
};

// Create the ground and the creature in the Matter.js world
createGround(world);
createCreature(world, creatureJson);

// Function to extract bodies and constraints, and handle their updates
const extractBodiesAndConstraints = (composite, addOrUpdateBodyData, addOrUpdateConstraintData) => {
    composite.bodies.forEach(body => {
        const bodyData = {
            id: body.id,
            label: body.label,
            position: {
                x: roundTo(body.position.x, 2),
                y: roundTo(body.position.y, 2)
            },
            angle: roundTo(body.angle, 3),
            velocity: {
                x: roundTo(body.velocity.x, 2),
                y: roundTo(body.velocity.y, 2)
            },
            angularVelocity: roundTo(body.angularVelocity, 3),
            isStatic: body.isStatic,
            isSleeping: body.isSleeping
        };
        addOrUpdateBodyData(bodyData);
    });

    composite.constraints.forEach(constraint => {
        const constraintData = {
            id: constraint.id,
            label: constraint.label,
            bodyA: constraint.bodyA ? constraint.bodyA.id : null,
            bodyB: constraint.bodyB ? constraint.bodyB.id : null,
            pointA: {
                x: roundTo(constraint.pointA.x, 2),
                y: roundTo(constraint.pointA.y, 2)
            },
            pointB: {
                x: roundTo(constraint.pointB.x, 2),
                y: roundTo(constraint.pointB.y, 2)
            },
            length: roundTo(constraint.length, 2),
            stiffness: roundTo(constraint.stiffness, 3)
        };
        addOrUpdateConstraintData(constraintData);
    });

    composite.composites.forEach(nestedComposite => {
        extractBodiesAndConstraints(nestedComposite, addOrUpdateBodyData, addOrUpdateConstraintData);
    });
};

// Function to broadcast the entire world state to a specific client
const broadcastFullWorldToClient = (client) => {
    const worldUpdate = protobuf.WorldUpdate.create();

    // Extract the full state of bodies and constraints
    const addOrUpdateBodyData = (bodyData) => {
        const body = {
            id: bodyData.id,
            label: bodyData.label,
            position: {
                x: bodyData.position.x,
                y: bodyData.position.y
            },
            angle: bodyData.angle,
            velocity: {
                x: bodyData.velocity.x,
                y: bodyData.velocity.y
            },
            angularVelocity: bodyData.angularVelocity,
            isStatic: bodyData.isStatic,
            isSleeping: bodyData.isSleeping
        };
        worldUpdate.bodies.push(body);
    };

    const addOrUpdateConstraintData = (constraintData) => {
        const constraint = {
            id: constraintData.id,
            label: constraintData.label,
            bodyA: constraintData.bodyA,
            bodyB: constraintData.bodyB,
            pointA: {
                x: constraintData.pointA.x,
                y: constraintData.pointA.y
            },
            pointB: {
                x: constraintData.pointB.x,
                y: constraintData.pointB.y
            },
            length: constraintData.length,
            stiffness: constraintData.stiffness
        };
        worldUpdate.constraints.push(constraint);
    };

    extractBodiesAndConstraints(world, addOrUpdateBodyData, addOrUpdateConstraintData);

    // Send the full state to the newly connected client
    const buffer = protobuf.WorldUpdate.encode(worldUpdate).finish(); // Encode the message
    const compressedBuffer = zlib.gzipSync(buffer);

    if (client.readyState === WebSocket.OPEN) {
        client.send(compressedBuffer);
    }
};

// Function to broadcast world updates to all connected clients
const broadcastWorld = () => {
    const worldUpdate = protobuf.WorldUpdate.create();

    const addOrUpdateBodyData = (bodyData) => {
        const lastBodyData = lastWorldData.bodies[bodyData.id];

        if (
            !lastBodyData ||
            Math.abs(lastBodyData.position.x - bodyData.position.x) > 1 ||
            Math.abs(lastBodyData.position.y - bodyData.position.y) > 1 ||
            Math.abs(lastBodyData.angle - bodyData.angle) > 0.01 ||
            Math.abs(lastBodyData.velocity.x - bodyData.velocity.x) > 0.01 ||
            Math.abs(lastBodyData.velocity.y - bodyData.velocity.y) > 0.01
        ) {
            const body = {
                id: bodyData.id,
                label: bodyData.label,
                position: {
                    x: bodyData.position.x,
                    y: bodyData.position.y
                },
                angle: bodyData.angle,
                velocity: {
                    x: bodyData.velocity.x,
                    y: bodyData.velocity.y
                },
                angularVelocity: bodyData.angularVelocity,
                isStatic: bodyData.isStatic,
                isSleeping: bodyData.isSleeping
            };
            worldUpdate.bodies.push(body);

            lastWorldData.bodies[bodyData.id] = bodyData;
        }
    };

    const addOrUpdateConstraintData = (constraintData) => {
        const lastConstraintData = lastWorldData.constraints[constraintData.id];

        if (
            !lastConstraintData ||
            lastConstraintData.length !== constraintData.length ||
            lastConstraintData.stiffness !== constraintData.stiffness
        ) {
            const constraint = {
                id: constraintData.id,
                label: constraintData.label,
                bodyA: constraintData.bodyA,
                bodyB: constraintData.bodyB,
                pointA: {
                    x: constraintData.pointA.x,
                    y: constraintData.pointA.y
                },
                pointB: {
                    x: constraintData.pointB.x,
                    y: constraintData.pointB.y
                },
                length: constraintData.length,
                stiffness: constraintData.stiffness
            };
            worldUpdate.constraints.push(constraint);

            lastWorldData.constraints[constraintData.id] = constraintData;
        }
    };

    // Extract and serialize world data
    extractBodiesAndConstraints(world, addOrUpdateBodyData, addOrUpdateConstraintData);

    if (worldUpdate.bodies.length > 0 || worldUpdate.constraints.length > 0) {
        console.log(`Broadcasting ${worldUpdate.bodies.length} bodies and ${worldUpdate.constraints.length} constraints.`);

        const buffer = protobuf.WorldUpdate.encode(worldUpdate).finish();  // Encode the message
        const compressedBuffer = zlib.gzipSync(buffer);

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(compressedBuffer);
            }
        });
    }
};

// Start the Matter.js engine update loop
const updatePhysics = () => {
    Engine.update(engine, 20);
};

// Listen for new WebSocket connections
wss.on('connection', (ws) => {
    // Send the full world state to the new client
    broadcastFullWorldToClient(ws);

    if (!isFirstClientConnected) {
        isFirstClientConnected = true;

        updateInterval = setInterval(() => {
            updatePhysics(); // Update the physics engine
            broadcastWorld(); // Send the world state to clients
        }, 20); // 5 FPS
    }
});

// Start the server and listen on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
