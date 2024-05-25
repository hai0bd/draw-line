import { _decorator, Collider, Collider2D, Component, Contact2DType, game, IPhysics2DContact, Node } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('MapControl')
export class MapControl extends Component {
    @property(Collider2D)
    circleCollider: Collider2D = null;

    uiCanvas: UIManager;
    isWin: boolean = false;

    start() {
        this.colliderEvent();
    }

    colliderEvent() {
        const collider = this.circleCollider;
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == CollisionTag.Goal) {
            console.log("Win");
            this.uiCanvas.victory();
        }
    }
}
export enum CollisionTag {
    Goal = 1,
    Obstacle = 2,
}


