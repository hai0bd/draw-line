import { _decorator, Component, instantiate, Node, Prefab } from "cc";
import { MapControl } from "./MapControl";
import { UIManager } from "./UIManager";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    @property(Prefab)
    level: Prefab[] = [];

    @property(Node)
    levelContain: Node = null;

    @property(Node)
    gamePlayCanvas: Node = null;
    
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
        if(this.levelIndex >= this.level.length) this.levelIndex = 0;
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
        this.mapControl.drawControl.canvas = this.gamePlayCanvas.position;
    }
}
