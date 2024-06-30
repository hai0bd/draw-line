import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, size, UITransform, view, Widget } from "cc";
import { UIManager } from "./Manager/UIManager";
import { DrawControl } from "./DrawControl";
const { ccclass, property } = _decorator;

@ccclass("MapControl")
export class MapControl extends Component {
    @property(UITransform)
    mapTransform: UITransform;

    @property(Collider2D)
    circleCollider: Collider2D = null;

    @property(Collider2D)
    partnerCollider: Collider2D = null;

    @property(DrawControl)
    drawControl: DrawControl = null;

    uiCanvas: UIManager;
    isWin: boolean = false;

    onLoad() {
        this.updatecanvas();
        // bắt sự kiện thay đổi kích thước màn hình
        view.on("canvas-resize", this.updatecanvas, this);
    }

    updatecanvas() {
        const canvas = view.getDesignResolutionSize();
        let deviceResolution = view.getResolutionPolicy();
        let designRatio = canvas.width / canvas.height;
        let deviceRatio =
            deviceResolution.canvasSize.width /
            deviceResolution.canvasSize.height;
        if (deviceRatio < designRatio) {
            this.node.getComponent(UITransform).contentSize = size(
                canvas.width,
                canvas.width / deviceRatio
            );
        } else {
            this.node.getComponent(UITransform).contentSize = size(
                canvas.height * deviceRatio,
                canvas.height
            );
        }
    }

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
            this.uiCanvas.victory();
        } else if (otherCollider.tag == CollisionTag.DeathPoint) {
            this.uiCanvas.lose();
        }
    }
}
export enum CollisionTag {
    Goal = 1,
    DeathPoint = 2,
}
