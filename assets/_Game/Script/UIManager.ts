import { _decorator, Component, game, Label, Node } from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("UIManager")
export class UIManager extends Component {
    @property(Node)
    winPopUp: Node = null;

    @property(Node)
    losePopUp: Node = null;

    @property(Node)
    multiphyBG: Node = null;

    @property(Label)
    levelLabel: Label = null;

    gameManager: GameManager = null;

    victory() {
        const levelIndex = this.gameManager.levelIndex + 1;
        this.levelLabel.string = levelIndex.toString();
        this.winPopUp.active = true;
        this.multiphyBG.active = true;
    }

    lose() {
        this.losePopUp.active = true;
        this.multiphyBG.active = true;
    }

    onReplayButtonClick() {
        this.losePopUp.active = false;
        this.winPopUp.active = false;
        this.multiphyBG.active = false;
        this.gameManager.replay();
    }

    onNextLevelButtonClick() {
        this.winPopUp.active = false;
        this.multiphyBG.active = false;
        this.gameManager.nextLevel();
    }
}
