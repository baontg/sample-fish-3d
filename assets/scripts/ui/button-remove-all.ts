
import { _decorator, Component, Node } from 'cc';
import UIEnum from '../enum/ui-enum';
import EventManager from '../event-manager/event-manager';
const { ccclass, property } = _decorator;

@ccclass('ButtonRemoveAll')
export class ButtonRemoveAll extends Component {
    start () {
        this.node.on('click', this.buttonClickedHandler.bind(this));
    }

    buttonClickedHandler(){
        EventManager.publish(UIEnum.ButtonRemoveAllClicked);
    }
}