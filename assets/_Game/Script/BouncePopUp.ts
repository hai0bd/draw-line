import { _decorator, CCFloat, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BouncePopUp')
export class BouncePopUp extends Component {
    @property(CCFloat)
    durationTime: number = 1;

    start() {
        // Thiết lập trạng thái ban đầu cho node (kích thước nhỏ)
        this.node.setScale(new Vec3(0, 0, 0));

        // Sử dụng tween để phóng to node với hiệu ứng nảy ra từ giữa
        this.bouncePopUp()
    }

    bouncePopUp() {
        tween(this.node)
            .to(this.durationTime, { scale: new Vec3(1, 1, 1) }, { easing: 'bounceOut' })
            .call(() => {
                this.repeatBounce();
            })
            // .to(this.jumpDuration, {position: this.startScale}, {easing: 'backIn'})
            .start();
    }
    repeatBounce() {
        tween(this.node)
            .to(this.durationTime / 2, { scale: new Vec3(.95, .95, 1) }, { easing: 'sineIn' })
            .to(this.durationTime / 2, { scale: new Vec3(1.05, 1.05, 1) }, { easing: 'sineOut' })
            .union()
            .repeatForever()
            .start();
    }
}


