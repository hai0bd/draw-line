import { _decorator, Component, game, instantiate, Label, Node, Prefab, SpriteFrame } from 'cc';
import { UIManager } from '../Manager/UIManager';
import { LevelItemUI } from './LevelItemUI';
import { GameManager } from '../Manager/GameManager';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('LevelUI')
export class LevelUI extends Component {
    @property(Label)
    gemAmout: Label;

    @property(Prefab)
    levelItems: Prefab;

    @property(Node)
    levelLayout: Node;

    @property(SpriteFrame)
    status: SpriteFrame[] = [];

    start() {
        this.SpawnLevel();
        this.gemAmout.string = DataManager.instance.playerData.gem.toString();
        game.on("levelSelect", this.onLevelSelect, this);
    }
    SpawnLevel() {
        const levelQuantity = GameManager.instance.level.length;
        for (let i = 0; i < levelQuantity; i++) {
            const levelIns = instantiate(this.levelItems);

            const levelItem = levelIns.getComponent(LevelItemUI);
            const userData = DataManager.instance.playerData
            console.log(userData)
            if (userData.levelID.indexOf(i) != -1) {
                levelItem.canPlay = true;
                if (userData.currentLevel == i) {
                    levelItem.status.spriteFrame = this.status[1];
                }
                else {
                    levelItem.status.spriteFrame = this.status[0];
                }
            }
            else levelItem.status.spriteFrame = this.status[2];
            levelItem.levelIndex.string = i.toString();

            this.levelLayout.addChild(levelIns);
        }
    }

    onLevelSelect(level: LevelItemUI) {
        if (!level.canPlay) return;
        const levelIndex = parseInt(level.levelIndex.string);
        this.node.active = false;
        UIManager.instance.startGame(levelIndex);
    }

    onBackButton() {
        UIManager.instance.backToHomeMenu(this.node);
    }

}


