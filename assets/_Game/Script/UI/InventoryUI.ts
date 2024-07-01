import { _decorator, Button, Component, Node, Sprite, SpriteFrame } from 'cc';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('InventoryUI')
export class InventoryUI extends Component {
    @property(Sprite)
    ballButton: Sprite;

    @property(Node)
    ballTab: Node;

    @property(Sprite)
    boxButton: Sprite;

    @property(Node)
    boxTab: Node;

    @property(SpriteFrame)
    buttonOn: SpriteFrame;

    @property(SpriteFrame)
    buttonOff: SpriteFrame;

    start(){
        this.ballButton.node.on(Button.EventType.CLICK, this.onClickBallTab, this)
        this.boxButton.node.on(Button.EventType.CLICK, this.onClickBoxTab, this)
    }
    onClickBallTab(){
        this.ballButton.spriteFrame= this.buttonOn;
        this.boxButton.spriteFrame= this.buttonOff;

        this.ballTab.active = true;
        this.boxTab.active = false;
    }
    onClickBoxTab(){
        this.boxButton.spriteFrame = this.buttonOn;
        this.ballButton.spriteFrame = this.buttonOff;

        this.boxTab.active = true;
        this.ballTab.active = false;
    }
}


