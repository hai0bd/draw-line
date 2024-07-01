import { _decorator, Component, Label, Node, UI } from 'cc';
import { UIManager } from '../Manager/UIManager';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('HomeMenuUI')
export class HomeMenuUI extends Component {
    @property(Label)
    gemAmount: Label;
    start() {
        this.gemAmount.string = DataManager.instance.playerData.gem.toString();
    }

    onButtonNoAds() {
        UIManager.instance.openNoAds();
    }
    onButtonShop() {
        UIManager.instance.openShop();
    }

    onButtonInventory() {
        UIManager.instance.openInventory();
    }

    onButtonPlay() {
        const index = DataManager.instance.playerData.currentLevel;
        UIManager.instance.startGame(index);
    }

    onButtonSetting() {
        UIManager.instance.openSettingHomePopUp();
    }

    onButtonLevel() {
        UIManager.instance.openLevel();
    }
}


