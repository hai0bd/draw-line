import { _decorator, Component, Node } from 'cc';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('NoAdsUI')
export class NoAdsUI extends Component {
    onClickBuy(){
        this.onEse();
    }
    
    onEse(){
        UIManager.instance.backToHomeMenu(this.node);
    }
}


