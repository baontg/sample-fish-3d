
import { _decorator, Component, Node } from 'cc';
import UIEnum from '../enum/ui-enum';
import EventManager from '../event-manager/event-manager';
const { ccclass, property } = _decorator;

@ccclass('ButtonCreateFish')
export class ButtonCreateFish extends Component {
    start () {
        this.node.on('click', this.buttonClickedHandler.bind(this));
    }

    buttonClickedHandler(){
        EventManager.publish(UIEnum.ButtonCreateFishClicked);
    }
}