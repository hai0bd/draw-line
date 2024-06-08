import { _decorator, Component, game, Label, Node, Vec3 } from "cc";
import { GameManager } from "./GameManager";
import { BouncePopUp } from "./BouncePopUp";
const { ccclass, property } = _decorator;

@ccclass("UIManager")
export class UIManager extends Component {
    @property(BouncePopUp)
    winPopUp: BouncePopUp = null;

    @property(BouncePopUp)
    losePopUp: BouncePopUp = null;

    @property(Node)
    multiphyBG: Node = null;

    @property(Label)
    levelLabel: Label = null;

    gameManager: GameManager = null;

    victory() {
        const levelIndex = this.gameManager.levelIndex + 1;
        this.levelLabel.string = levelIndex.toString();
        this.OpenPopUp(this.winPopUp);
        this.multiphyBG.active = true;
    }

    lose() {
        this.OpenPopUp(this.losePopUp);
        this.multiphyBG.active = true;
    }

    onReplayButtonClick() {
        this.ClosePopUp(this.losePopUp);
        this.ClosePopUp(this.winPopUp);
        this.multiphyBG.active = false;
        this.gameManager.replay();
    }

    onNextLevelButtonClick() {
        this.ClosePopUp(this.winPopUp);
        this.multiphyBG.active = false;
        this.gameManager.nextLevel();
    }

    OpenPopUp(popup: BouncePopUp) {
        popup.node.active = true;
        popup.init();
    }

    ClosePopUp(popup: BouncePopUp) {
        if (popup.repeatTween) {
            popup.node.active = false;
            popup.stopRepeatBoune();
        }
    }
}

