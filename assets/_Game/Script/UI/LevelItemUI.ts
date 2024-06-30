import { _decorator, Component, game, Label, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelItemUI')
export class LevelItemUI extends Component {
    @property(Sprite)
    status: Sprite;

    @property(Label)
    levelIndex: Label;

    @property({})
    canPlay: boolean = false;

    onLevelSelect(){
        game.emit("levelSelect", this)
    }
}


