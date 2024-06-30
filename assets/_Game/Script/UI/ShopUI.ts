import { _decorator, Button, Component, Node, Sprite, SpriteFrame } from 'cc';
import { UIManager } from '../Manager/UIManager';
const { ccclass, property } = _decorator;

@ccclass('ShopUI')
export class ShopUI extends Component {
    @property(Sprite)
    gemButton: Sprite;

    @property(Node)
    gemTab: Node;

    @property(Sprite)
    skipButton: Sprite;

    @property(Node)
    skipTab: Node;

    @property(SpriteFrame)
    buttonOn: SpriteFrame;

    @property(SpriteFrame)
    buttonOff: SpriteFrame;

    start() {
        this.gemButton.node.on(Button.EventType.CLICK, this.onClickgemTab, this)
        this.skipButton.node.on(Button.EventType.CLICK, this.onClickskipTab, this)
    }
    onClickgemTab() {
        this.gemButton.spriteFrame = this.buttonOn;
        this.skipButton.spriteFrame = this.buttonOff;

        this.gemTab.active = true;
        this.skipTab.active = false;
    }
    onClickskipTab() {
        this.skipButton.spriteFrame = this.buttonOn;
        this.gemButton.spriteFrame = this.buttonOff;

        this.skipTab.active = true;
        this.gemTab.active = false;
    }
    onEsc(){
        UIManager.instance.backToHomeMenu(this.node);
    }
}


