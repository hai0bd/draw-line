import { _decorator, Component, Node, Label } from 'cc';
import { BouncePopUp } from './BouncePopUp';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupControl')
export class PopupControl extends Component {
    @property(BouncePopUp)
    winPopUp: BouncePopUp = null;

    @property(BouncePopUp)
    losePopUp: BouncePopUp = null;

    @property(Node)
    multiphyBG: Node = null;

    @property(Label)
    levelLabel: Label = null;

    victory() {
        const levelIndex = GameManager.instance.levelIndex + 1;
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
        GameManager.instance.replay();
    }

    onNextLevelButtonClick() {
        this.ClosePopUp(this.winPopUp);
        this.multiphyBG.active = false;
        GameManager.instance.nextLevel();
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


