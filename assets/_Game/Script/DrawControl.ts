import {
    _decorator, Component, EPhysics2DDrawFlags, ERaycast2DType, ERigidBody2DType, EventTouch, Graphics, Input, input, NodeEventType, PhysicsSystem2D, PolygonCollider2D, RigidBody2D, UITransform, Vec2,
    Vec3,
} from "cc";
import { ConditionDraw } from "./ConditionDraw";
const { ccclass, property } = _decorator;

@ccclass("DrawControl")
export class DrawControl extends Component {
    @property(RigidBody2D)
    listRigibody: RigidBody2D[] = [];

    canvasTransform: UITransform;

    lastMouseMoveTime: number = 0;
    isCollision: boolean = false;

    private condition: ConditionDraw;
    private transform: UITransform;
    private graphic: Graphics;
    private rigidBody: RigidBody2D;
    private lastPos: Vec2;

    start() {
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape

        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None

        this.condition = new ConditionDraw()

        this.graphic = this.node.getComponent(Graphics);
        this.rigidBody = this.node.addComponent(RigidBody2D)

        this.rigidBody.type = ERigidBody2DType.Static

        this.transform = this.canvasTransform;

        this.node.getComponent(UITransform).width = this.transform.width;
        this.node.getComponent(UITransform).height = this.transform.height;

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this)
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    OnDisable() {
        this.offEvent();
    }
    offEvent() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    onTouchStart(event: EventTouch) {
        this.isCollision = this.condition.checkPoint(new Vec2(event.getUILocation().x, event.getUILocation().y))

        if (this.isCollision) return

        this.rigidBody.destroy()
        this.rigidBody = this.node.addComponent(RigidBody2D)
        this.rigidBody.type = ERigidBody2DType.Static

        this.lastPos = event.getUILocation();
        /* this.isCollison = this.condition.checkPoint(new Vec2(event.getUILocation().x, event.getUILocation().y));
        if (this.isCollison) return;

        this.startPoint = event.getUILocation();*/
        this.schedule(this.checkMouseMove, 1);
    }
    onTouchMove(event: EventTouch) {
        if (this.isCollision) return;

        this.lastMouseMoveTime = Date.now();

        const startPoint = new Vec2(this.lastPos.x, this.lastPos.y);
        const endPoint = new Vec2(event.getUILocation().x, event.getUILocation().y);

        const isCollider = this.condition.checkRaycast(endPoint, startPoint);
        if (isCollider) return;
        if (this.condition.checkPoint(endPoint)) return;
        if (startPoint.x == endPoint.x && startPoint.y == endPoint.y) return;

        this.drawLine(startPoint, endPoint);

        /* if (this.isCollison) return;

        this.endPoint = event.getUILocation();
        

        if (!this.checkCanDraw()) return;
        this.drawLine(this.startPoint, this.endPoint); */
    }
    onTouchEnd(event: EventTouch) {
        if (this.isCollision) return

        this.touchEnd();
    }
    touchEnd() {
        this.rigidBody.type = ERigidBody2DType.Dynamic;
        this.rigidBody.wakeUp();
        this.turnDynamicType();
        this.offEvent();
    }

    convertLocation(event: EventTouch) {
        let touchPos = new Vec3(event.getUILocation().x, event.getUILocation().y);
        let pos = this.canvasTransform.convertToNodeSpaceAR(touchPos);
        return new Vec2(pos.x, pos.y);
    }

    checkMouseMove() {
        const currentTime = Date.now();
        if (currentTime - this.lastMouseMoveTime >= 50) {
            this.lastMouseMoveTime = currentTime;
            this.touchEnd();
        }
    }

    drawLine(startPoint: Vec2, endPoint: Vec2) {

        const { width, height } = this.transform;

        this.graphic.moveTo(startPoint.x - width / 2, startPoint.y - height / 2);
        this.graphic.lineTo(endPoint.x - width / 2, endPoint.y - height / 2);
        this.graphic.stroke();

        this.createPolygon(startPoint, endPoint, width, height);

        this.lastPos = endPoint;
        /* const { width, height } = this.lineTransform;

        this.lineGraphics.moveTo(start.x - width / 2, start.y - height / 2); // Move to start point
        this.lineGraphics.lineTo(end.x - width / 2, end.y - height / 2); // Draw line to end point
        this.lineGraphics.stroke(); // Apply the stroke to draw the line

        this.createPolygon(this.startPoint, this.endPoint, width, height);
        this.startPoint = this.endPoint; */
    }
    checkCanDraw(): boolean {
        /* if (this.endDraw) return false;
        if (!this.lineGraphics) {
            return false;
        }

        if (this.condition.checkRaycast(this.startPoint, this.endPoint)) return false;
        if (this.condition.checkPoint(this.endPoint)) return false; */

        return true;
    }

    private createPolygon(startPoint: Vec2, endPoint: Vec2, width: number, height: number): void {
        const vec = new Vec2(endPoint.x - startPoint.x, endPoint.y - startPoint.y).normalize()
        vec.rotate(Math.PI / 2)

        const offset = 2.5

        const listPoint = [new Vec2(startPoint.x - width / 2 - vec.x * offset, startPoint.y - height / 2 - vec.y * offset),
        new Vec2(endPoint.x - width / 2 - vec.x * offset, endPoint.y - height / 2 - vec.y * offset),
        new Vec2(endPoint.x - width / 2 + vec.x * offset, endPoint.y - height / 2 + vec.y * offset),
        new Vec2(startPoint.x - width / 2 + vec.x * offset, startPoint.y - height / 2 + vec.y * offset)]

        const collider = this.node.addComponent(PolygonCollider2D)
        // collider.group = 0
        collider.points = listPoint
        collider.density = 100;
        collider.apply()
    }

    turnDynamicType() {
        for (let i = 0; i < this.listRigibody.length; i++) {
            this.listRigibody[i].type = ERigidBody2DType.Dynamic;
            console.log(this.listRigibody[i].node.name + ": " + this.listRigibody[i].linearVelocity + " " + this.listRigibody[i].angularVelocity);
            // console.log(this.listRigibody[i]);
        }
    }
}
