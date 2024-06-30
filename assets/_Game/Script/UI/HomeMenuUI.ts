import { _decorator, Component, Node, UI } from 'cc';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('HomeMenuUI')
export class HomeMenuUI extends Component {
    onButtonNoAds(){
        UIManager.instance.openNoAds();
    }
    onButtonShop(){
        UIManager.instance.openShop();
    }

    onButtonInventory(){
        UIManager.instance.openInventory();
    }

    onButtonPlay(){
        UIManager.instance.startGame(0);
    }

    onButtonLevel(){
        UIManager.instance.openLevel();
    }
}


