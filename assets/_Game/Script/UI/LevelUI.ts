import { _decorator, Component, game, instantiate, Node, Prefab } from 'cc';
import { UIManager } from '../Manager/UIManager';
import { LevelItemUI } from './LevelItemUI';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('LevelUI')
export class LevelUI extends Component {
    @property(Prefab)
    levelItems: Prefab;

    @property(Node)
    levelLayout: Node;

    start(){
        this.SpawnLevel();
        game.on("levelSelect", this.onLevelSelect, this);
    }
    SpawnLevel() {
        const levelQuantity = GameManager.instance.level.length;
        for(let i = 0; i < levelQuantity; i++){
            const levelIns = instantiate(this.levelItems);
            const levelItem = levelIns.getComponent(LevelItemUI);
            levelItem.levelIndex.string = i.toString();

            this.levelLayout.addChild(levelIns);
        }
    }

    onLevelSelect(level: LevelItemUI){
        if(!level.canPlay) return;
        const levelIndex = parseInt(level.levelIndex.string);
        this.node.active = false;
        UIManager.instance.startGame(levelIndex);
    }

    onBackButton(){
        UIManager.instance.backToHomeMenu(this.node);
    }
    
}


