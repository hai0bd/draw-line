import { _decorator, CCFloat, Component, Node, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BouncePopUp')
export class BouncePopUp extends Component {
    @property(CCFloat)
    durationTime: number = 1;

    repeatTween;

    init() {
        // this.repeatTween.stop();
        // Thiết lập trạng thái ban đầu cho node (kích thước nhỏ)
        this.node.setScale(new Vec3(0, 0, 0));

        // Sử dụng tween để phóng to node với hiệu ứng nảy ra từ giữa
        this.bouncePopUp()
    }

    bouncePopUp() {
        tween(this.node)
            .to(this.durationTime, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .call(() => {
                this.repeatBounce();
            })
            // .to(this.jumpDuration, {position: this.startScale}, {easing: 'backIn'})
            .start();
    }
    repeatBounce() {
        this.repeatTween = tween(this.node)
            .to(this.durationTime * 1.5, { scale: new Vec3(1.02, 1.02, 1.02) }, { easing: 'backOut' })
            .to(this.durationTime * 1.5, { scale: new Vec3(0.98, 0.98, 0.98) }, { easing: 'backIn' })
            .union()
            .repeatForever()
            .start();
    }
    customEasing(time) {
        return Math.cos(time * Math.PI * 2) * 0.5 + 0.5;
    }

    stopRepeatBoune() {
        this.repeatTween.stop();
    }
}


