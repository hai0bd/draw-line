import { _decorator, Collider2D, Component, ERaycast2DType, PhysicsSystem2D, RaycastResult2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ConditionDraw')
export class ConditionDraw {
    checkPoint(point: Vec2) {
        const result = PhysicsSystem2D.instance.testPoint(point) as Collider2D[];

        return result.length == 0 ? false : true;
    }

    checkRaycast(start: Vec2, end: Vec2) {
        const raycast = PhysicsSystem2D.instance.raycast(start, end, ERaycast2DType.Closest) as RaycastResult2D[]

        // if(raycast.length != 0) console.log('raycast', raycast)

        for (let index = 0; index < raycast.length; index++) {
            const raycastResult2D = raycast[index]
            if (raycastResult2D.collider.node.name != 'Line') return true
        }

        return false
    }
}


