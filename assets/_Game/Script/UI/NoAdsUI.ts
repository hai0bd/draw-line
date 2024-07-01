import { _decorator, Component, Node } from 'cc';
import { UIManager } from '../Manager/UIManager';
import { DataManager } from '../Manager/DataManager';
const { ccclass, property } = _decorator;

@ccclass('NoAdsUI')
export class NoAdsUI extends Component {
    onClickBuy() {
        console.log("Buy No Ads");
        DataManager.instance.resetData();
        UIManager.instance.backToHomeMenu(this.node);
    }
}


