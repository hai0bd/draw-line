import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ToggleBar')
export class ToggleBar extends Component {
    @property(Node)
    toggleOn: Node;

    @property(Node)
    toggleOff: Node;

    @property({})
    isOn: boolean = false;

    /*  onClick() {
         this.isOn = !this.isOn;
         this.checkToggle();
     } */

    checkToggle() {
        if (this.isOn) this.changeToggle(this.toggleOn, this.toggleOff);
        else this.changeToggle(this.toggleOff, this.toggleOn);
    }
    changeToggle(NodeOn: Node, NodeOff: Node) {
        NodeOn.active = true;
        NodeOff.active = false;
    }
}


