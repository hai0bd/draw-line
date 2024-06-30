import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../Manager/GameManager';
const { ccclass, property } = _decorator;

@ccclass('GamePlayUI')
export class GamePlayUI extends Component {
    onReplayButton(){
        GameManager.instance.replay();
    }

    onOptionButton(){
        
    }
}


