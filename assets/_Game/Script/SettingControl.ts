import { _decorator, Component, Node } from 'cc';
import { ToggleBar } from './UI/ToggleBar';
import { DataManager } from './Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('SettingControl')
export class SettingControl extends Component {
    @property(ToggleBar)
    musicToggle: ToggleBar;

    @property(ToggleBar)
    soundToggle: ToggleBar;

    @property(ToggleBar)
    vibrationToggle: ToggleBar;

    init() {
        this.musicToggle.isOn = DataManager.instance.playerData.musicToggle;
        this.soundToggle.isOn = DataManager.instance.playerData.soundToggle;
        this.vibrationToggle.isOn = DataManager.instance.playerData.vibrationToggle;

        this.musicToggle.checkToggle();
        this.soundToggle.checkToggle();
        this.vibrationToggle.checkToggle();
    }

    clickMusicBtn() {
        this.musicToggle.isOn = !this.musicToggle.isOn;
        DataManager.instance.playerData.musicToggle = this.musicToggle.isOn;
        this.musicToggle.checkToggle();
    }
    clickSoundBtn() {
        this.soundToggle.isOn = !this.soundToggle.isOn;
        DataManager.instance.playerData.soundToggle = this.soundToggle.isOn;
        this.soundToggle.checkToggle();
    }
    clickVibrationBtn() {
        this.vibrationToggle.isOn = !this.vibrationToggle.isOn;
        DataManager.instance.playerData.vibrationToggle = this.vibrationToggle.isOn;
        this.vibrationToggle.checkToggle();
    }
}


