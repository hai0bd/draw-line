import { _decorator, Component, game, Label, Node, Vec3 } from "cc";
import { GameManager } from "./GameManager";
import { BouncePopUp } from "../UI/BouncePopUp";
import { PopupControl } from "../UI/PopupControl";
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
    
    @property(Node)
    shopUI: Node;
    
    @property(Node)
    inventoryUI: Node;

    @property(Node)
    noAds: Node;
    
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
    
    startGame(levelIndex: number){
        GameManager.instance.instantiateMap(levelIndex);
        this.homeMenu.active = false;
        this.gamePlay.active = true;
    }
    
    backToHomeMenu(node: Node){
        node.active = false;
        this.homeMenu.active = true;
    }
    
    openNoAds() {
        this.noAds.active = true;
    }
    
    openLevel(){
        this.level.active = true;
        this.homeMenu.active = false;
    }
    
    openInventory(){
        // this.homeMenu.active = false;
        this.inventoryUI.active = true;
    }
    
    openShop(){
        // this.homeMenu.active = false;
        this.shopUI.active = true;
    }

    victory() {
        this.popUp.victory();
    }

    lose() {
        this.popUp.lose();
    }
}

