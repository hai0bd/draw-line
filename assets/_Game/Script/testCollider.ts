import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('testCollider')
export class testCollider extends Component {
    @property(Collider2D)
    testCollider: Collider2D

    start() {
        const collider = this.testCollider;
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        console.log(otherCollider.node.name);
    }

    update(deltaTime: number) {

    }
}


