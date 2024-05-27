import { _decorator, Component, Node } from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("UIManager")
export class UIManager extends Component {
    @property(Node)
    winPopUp: Node = null;

    @property(Node)
    losePopUp: Node = null;

    gameManager: GameManager = null;

    victory() {
        console.log("Win");
        this.winPopUp.active = true;
    }

    lose() {
        console.log("Win");
        this.losePopUp.active = true;
    }

    onReplayButtonClick() {
        this.losePopUp.active = false;
        this.winPopUp.active = false;
        this.gameManager.replay();
    }

    onNextLevelButtonClick() {
        this.winPopUp.active = false;
        this.gameManager.nextLevel();
    }
}
