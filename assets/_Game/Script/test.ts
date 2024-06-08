import { _decorator, Component, Node, Graphics, Vec2, Size, Color } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Graph')
export class Graph extends Component {
    @property(Graphics)
    graphContainer: Graphics = null!;

    @property
    numPoints: number = 10;

    @property
    amplitude: number = 100;

    @property
    frequency: number = 0.1;

    start() {
    }
}
