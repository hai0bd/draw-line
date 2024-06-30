import { _decorator, Component, instantiate, Node, Prefab, UITransform } from "cc";
import { MapControl } from "../MapControl";
import { UIManager } from "./UIManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    private static _instance: GameManager;

    @property(Prefab)
    level: Prefab[] = [];

    @property(Node)
    levelContain: Node = null;

    @property(UIManager)
    uiCanvas: UIManager = null;

    @property(UITransform)
    canvas: UITransform = null;

    map: Node;
    mapControl: MapControl = null;
    levelIndex: number = 0;

    public static get instance(): GameManager {
        if (!this._instance) {
            this._instance = new GameManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!GameManager._instance) {
            GameManager._instance = this;
        } else {
            this.destroy();
        }
    }

    /* start() {
        this.instantiateMap(this.levelIndex);
    } */

    victory() {
        this.uiCanvas.victory();
    }

    nextLevel() {
        this.map.active = false;
        this.map.destroy();
        this.levelIndex++;
        if (this.levelIndex >= this.level.length) this.levelIndex = 0;
        this.instantiateMap(this.levelIndex);
    }
    replay() {
        this.map.active = false;
        this.map.destroy();
        this.instantiateMap(this.levelIndex);
    }

    instantiateMap(index: number) {
        this.levelIndex = index;

        this.map = instantiate(this.level[this.levelIndex]);
        this.levelContain.addChild(this.map);
        this.mapControl = this.map.getComponent(MapControl);

        this.mapControl.uiCanvas = this.uiCanvas;
        this.mapControl.mapTransform.contentSize = this.canvas.contentSize;
        this.mapControl.drawControl.canvasTransform = this.canvas;
    }
}
