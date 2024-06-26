import { _decorator, Collider, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, RigidBody, RigidBody2D, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LineDebug')
export class LineDebug extends Component {
    @property(RigidBody2D)
    rb: RigidBody2D;

    @property(Collider2D)
    lineCollider: Collider2D;

    currentPos: Vec3 = new Vec3(0, 0, 0);
    currentRb: RigidBody2D;

    start() {
        const collider = this.lineCollider;
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        console.log("Line collidion with: " + otherCollider.node.name)
    }

    update(deltaTime: number) {
        /* if (this.currentRb != this.rb) {
            console.log(this.rb);
            this.currentRb = this.rb;
        } */
        if (Vec3.distance(this.node.position, this.currentPos) > 0.1) {
            // if (this.node.position != this.currentPos) {
            // console.log("Line Position: " + this.node.position)
            this.currentPos = this.node.getPosition();
        }
    }
}


