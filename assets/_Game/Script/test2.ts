import { _decorator, Collider2D, Component, EPhysics2DDrawFlags, ERigidBody2DType, EventTouch, Graphics, Input, input, Node, NodeEventType, PhysicsSystem2D, PolygonCollider2D, RigidBody2D, UITransform, Vec2 } from 'cc';
import { AStar } from './AStar';
import { ConditionDraw } from './ConditionDraw';
const { ccclass, property } = _decorator;

@ccclass('test2')
export class test2 extends Component {
    @property(Node)
    private ex1: Node
    @property(Node)
    private ex2: Node

    private isCollider: boolean = false

    private aStart: ConditionDraw

    onLoad() {
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
            EPhysics2DDrawFlags.Pair |
            EPhysics2DDrawFlags.CenterOfMass |
            EPhysics2DDrawFlags.Joint |
            EPhysics2DDrawFlags.Shape

        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.None

        this.aStart = new ConditionDraw()

        const graphic = this.node.getComponent(Graphics);
        let rigidBody = this.node.addComponent(RigidBody2D)

        rigidBody.type = ERigidBody2DType.Static

        const { width: widthParent, height: heightParent } = this.node.parent.getComponent(UITransform)

        this.node.getComponent(UITransform).width = widthParent
        this.node.getComponent(UITransform).height = heightParent

        const { width, height } = this.node.getComponent(UITransform)

        this.node.on(NodeEventType.TOUCH_START, function (event) {
            this.isCollider = this.aStart.checkPoint(new Vec2(event.getUILocation().x, event.getUILocation().y))

            if (this.isCollider) return

            rigidBody.destroy()
            rigidBody = this.node.addComponent(RigidBody2D)
            rigidBody.type = ERigidBody2DType.Static

            this.lastPos = event.getUILocation();
        }, this)

        this.node.on(NodeEventType.TOUCH_MOVE, function (event) {

            if (this.isCollider) return

            const startPoint = new Vec2(this.lastPos.x, this.lastPos.y)
            const endPoint = new Vec2(event.getUILocation().x, event.getUILocation().y)

            const isCollider = this.aStart.checkRaycast(endPoint, startPoint)

            if (isCollider) return

            if (this.aStart.checkPoint(endPoint)) return

            if (startPoint.x == endPoint.x && startPoint.y == endPoint.y) return

            graphic.moveTo(startPoint.x - width / 2, startPoint.y - height / 2);
            graphic.lineTo(endPoint.x - width / 2, endPoint.y - height / 2);
            graphic.stroke();

            this.createPolygon(startPoint, endPoint, width, height)

            this.lastPos = event.getUILocation();
        }, this);

        this.node.on(NodeEventType.TOUCH_END, function () {

            if (this.isCollider) return

            rigidBody.type = ERigidBody2DType.Dynamic
            rigidBody.wakeUp()
        }, this)
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
}


