import { Engine, World, Bodies, Constraint, Composite, Body } from 'matter-js';
import { roundTo } from './utils';

export const createWorld = () => {
    const engine = Engine.create();
    const world = engine.world;

    return { engine, world };
};

export const createGround = (world: World) => {
    const ground = Bodies.rectangle(400, 590, 810, 60, {
        isStatic: true,
        label: 'Ground'
    });
    World.add(world, ground);
};

export const createCreature = (world: World, creatureJson: any) => {
    const joints: { [key: number]: Body } = {};
    const bones: { [key: number]: Constraint } = {};

    // Create joints (as Matter.js bodies)
    creatureJson.joints.forEach((joint: any) => {
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
    creatureJson.bones.forEach((bone: any) => {
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
    creatureJson.muscles.forEach((muscle: any) => {
        const bodyA = bones[muscle.startBoneID].bodyA;
        const bodyB = bones[muscle.endBoneID].bodyB;
        if (!bodyA || !bodyB) {
            return;
        }

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

export const extractBodiesAndConstraints = (composite: Composite, addOrUpdateBodyData: any, addOrUpdateConstraintData: any) => {
    composite.bodies.forEach((body: Body) => {
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

    composite.constraints.forEach((constraint: Constraint) => {
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

    composite.composites.forEach((nestedComposite: Composite) => {
        extractBodiesAndConstraints(nestedComposite, addOrUpdateBodyData, addOrUpdateConstraintData);
    });
};
