import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import zlib from 'zlib';
import { createWorld, createGround, createCreature, extractBodiesAndConstraints } from './world';
import { PORT, UPDATE_INTERVAL } from './constants';
import protobuf from '../world_pb'; // Assuming the protobufjs is compiled into a single file
import { Engine } from 'matter-js'; // Correctly import Engine and World

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const { engine, world } = createWorld();

createGround(world);
createCreature(world, {
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
});

let isFirstClientConnected = false;
let updateInterval: NodeJS.Timeout | null = null;

const lastWorldData = {
    bodies: {} as { [key: number]: any },
    constraints: {} as { [key: number]: any }
};

const broadcastFullWorldToClient = (client: WebSocket) => {
    const worldUpdate = protobuf.WorldUpdate.create();

    const addOrUpdateBodyData = (bodyData: any) => {
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

    const addOrUpdateConstraintData = (constraintData: any) => {
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

    const buffer = protobuf.WorldUpdate.encode(worldUpdate).finish(); // Encode the message
    const compressedBuffer = zlib.gzipSync(buffer);

    if (client.readyState === WebSocket.OPEN) {
        client.send(compressedBuffer);
    }
};

const broadcastWorld = () => {
    const worldUpdate = protobuf.WorldUpdate.create();

    const addOrUpdateBodyData = (bodyData: any) => {
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

    const addOrUpdateConstraintData = (constraintData: any) => {
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

    extractBodiesAndConstraints(world, addOrUpdateBodyData, addOrUpdateConstraintData);

    if (worldUpdate.bodies.length > 0 || worldUpdate.constraints.length > 0) {
        console.log(`Broadcasting ${worldUpdate.bodies.length} bodies and ${worldUpdate.constraints.length} constraints.`);

        const buffer = protobuf.WorldUpdate.encode(worldUpdate).finish(); // Encode the message
        const compressedBuffer = zlib.gzipSync(buffer);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(compressedBuffer);
            }
        });
    }
};

const updatePhysics = () => {
    Engine.update(engine, 1000 / 60); // Update the physics engine at 60 FPS
};

// Listen for new WebSocket connections
wss.on('connection', (ws: WebSocket) => {
    // Send the full world state to the new client
    broadcastFullWorldToClient(ws);

    if (!isFirstClientConnected) {
        isFirstClientConnected = true;

        // Start broadcasting world updates every 200ms (5 FPS)
        updateInterval = setInterval(() => {
            updatePhysics(); // Update the physics engine
            broadcastWorld(); // Send the world state to clients
        }, UPDATE_INTERVAL); // 5 FPS
    }
});

// Start the server and listen on a port
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
