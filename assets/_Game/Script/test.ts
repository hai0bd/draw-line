import { _decorator, CCFloat, CCInteger, Component, Node, RigidBody, RigidBody2D, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property(Node)
    targetPos: Node;

    @property(CCInteger)
    durationTime: number = 1;

    @property(CCFloat)
    speed: number = 1;

    start() {
        this.test()
    }
    test() {
        tween(this.node.position)
            .to(this.durationTime, this.targetPos.position, {
                easing: 'bounceInOut',
                onUpdate: (target: Vec3, ratio: number) => {
                    this.node.position = target;
                }
            })
            .start();
    }
}


