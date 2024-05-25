import { _decorator, CCFloat, Component, Node, RigidBody, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('test')
export class test extends Component {
    @property(RigidBody2D)
    rb: RigidBody2D = null;

    @property(CCFloat)
    speed: number = 1;

    update(deltaTime: number) {
        const velocity = this.rb.linearVelocity;
        if (velocity.x > this.speed) return;
        velocity.x = this.speed;
        this.rb.linearVelocity = velocity;
    }
}


