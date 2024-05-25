import { _decorator, Collider, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, Prefab } from 'cc';
import { CollisionTag, MapControl } from './MapControl';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab)
    level: Prefab[] = [];

    @property(Node)
    levelContain: Node = null;

    @property(UIManager)
    uiCanvas: UIManager = null;

    map: Node;
    mapControl: MapControl = null;
    levelIndex: number = 0;

    start() {
        this.instantiateMap(this.levelIndex);
        this.uiCanvas.gameManager = this;
    }

    victory() {
        this.uiCanvas.victory();
    }

    nextLevel() {
        this.map.active = false;
        this.map.destroy();
        this.levelIndex++;
        this.instantiateMap(this.levelIndex);
    }
    replay() {
        this.map.active = false;
        this.map.destroy();
        this.instantiateMap(this.levelIndex);
    }

    instantiateMap(index: number) {
        this.map = instantiate(this.level[this.levelIndex]);
        this.levelContain.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);
        this.mapControl.uiCanvas = this.uiCanvas;
    }
}