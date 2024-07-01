import { _decorator, Component, Node, Label } from 'cc';
import { BouncePopUp } from './BouncePopUp';
import { GameManager } from '../Manager/GameManager';
import { UIManager } from '../Manager/UIManager';
import { SettingControl } from '../SettingControl';
const { ccclass, property } = _decorator;

@ccclass('PopupControl')
export class PopupControl extends Component {
    @property(BouncePopUp)
    winPopUp: BouncePopUp = null;

    @property(BouncePopUp)
    losePopUp: BouncePopUp = null;

    @property(BouncePopUp)
    settingPopUp: BouncePopUp = null;

    @property(Node)
    multiphyBG: Node = null;

    @property(Label)
    levelLabel: Label = null;

    @property(Label)
    levelReward: Label = null;

    victory() {
        const levelIndex = GameManager.instance.levelIndex + 1;
        this.levelLabel.string = levelIndex.toString();
        this.levelReward.string = "+" + levelIndex.toString() + '0';
        this.OpenPopUp(this.winPopUp);
    }

    lose() {
        this.OpenPopUp(this.losePopUp);
    }

    onReplayButtonClick() {
        this.ClosePopUp(this.losePopUp);
        this.ClosePopUp(this.winPopUp);
        GameManager.instance.replay();
    }

    onSettingButtonClick() {
        this.OpenPopUp(this.settingPopUp);
        const setting = this.settingPopUp.getComponent(SettingControl);
        setting.init();
    }
    onEscSetting() {
        this.ClosePopUp(this.settingPopUp);
    }

    onQuitLevel() {
        this.ClosePopUp(this.settingPopUp);
        GameManager.instance.map.destroy();
        UIManager.instance.backToHomeMenu(this.settingPopUp.node);
    }

    onNextLevelButtonClick() {
        this.ClosePopUp(this.winPopUp);
        GameManager.instance.nextLevel();
    }

    OpenPopUp(popup: BouncePopUp) {
        popup.node.active = true;
        this.multiphyBG.active = true;
        popup.init();
    }

    ClosePopUp(popup: BouncePopUp) {
        if (popup.repeatTween) {
            // popup.node.active = false;
            popup.stopRepeatBoune();
        }
        popup.closePopUp();
        this.multiphyBG.active = false;
    }
}


