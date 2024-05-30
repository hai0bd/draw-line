import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact } from "cc";
import { UIManager } from "./UIManager";
import { DrawControl } from "./DrawControl";
const { ccclass, property } = _decorator;

@ccclass("MapControl")
export class MapControl extends Component {
    @property(Collider2D)
    circleCollider: Collider2D = null;

    @property(Collider2D)
    partnerCollider: Collider2D = null;

    @property(DrawControl)
    drawControl: DrawControl = null;

    uiCanvas: UIManager;
    isWin: boolean = false;

    start() {
        this.colliderEvent();
    }

    colliderEvent() {
        const circle = this.circleCollider;
        const partner = this.partnerCollider;
        if (circle) {
            circle.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        if (partner) {
            partner.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == CollisionTag.Goal && selfCollider.node == this.circleCollider.node) {
            console.log("Win");
            this.uiCanvas.victory();
        } else if (otherCollider.tag == CollisionTag.DeathPoint) {
            console.log("Death");
            this.uiCanvas.lose();
        }
    }
}
export enum CollisionTag {
    Goal = 1,
    DeathPoint = 2,
}
