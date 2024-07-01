import { _decorator, Component, game, Label, Node, Vec3 } from "cc";
import { GameManager } from "./GameManager";
import { BouncePopUp } from "../UI/BouncePopUp";
import { PopupControl } from "../UI/PopupControl";
import { SettingControl } from "../SettingControl";
const { ccclass, property } = _decorator;

@ccclass("UIManager")
export class UIManager extends Component {
    private static _instance: UIManager;

    @property(Node)
    homeMenu: Node;

    @property(Node)
    level: Node;

    @property(Node)
    gamePlay: Node;

    @property(BouncePopUp)
    settingHome: BouncePopUp;

    @property(BouncePopUp)
    shopUI: BouncePopUp;

    @property(BouncePopUp)
    inventoryUI: BouncePopUp;

    @property(BouncePopUp)
    noAds: BouncePopUp;

    @property(PopupControl)
    popUp: PopupControl;

    public static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager;
        }
        return this._instance;
    }

    onLoad() {
        if (!UIManager._instance) {
            UIManager._instance = this;
        } else {
            this.destroy();
        }
    }

    startGame(levelIndex: number) {
        GameManager.instance.instantiateMap(levelIndex);
        this.homeMenu.active = false;
        this.gamePlay.active = true;
    }

    backToHomeMenu(node: Node) {
        node.active = false;
        this.gamePlay.active = false;
        this.homeMenu.active = true;
    }

    openNoAds() {
        this.noAds.node.active = true;
        this.noAds.init();
    }

    openLevel() {
        this.level.active = true;
        this.homeMenu.active = false;
    }

    openInventory() {
        this.inventoryUI.node.active = true;
        this.inventoryUI.init();
    }

    openShop() {
        this.shopUI.node.active = true;
        this.shopUI.init();
    }

    openSettingHomePopUp() {
        this.settingHome.node.active = true;
        this.settingHome.init();
        const setting = this.settingHome.getComponent(SettingControl);
        setting.init();
    }

    openSettingPopUp() {
        this.popUp.onSettingButtonClick();
    }

    victory() {
        this.popUp.victory();
    }

    lose() {
        this.popUp.lose();
    }
}

