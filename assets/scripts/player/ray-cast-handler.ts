import { _decorator, Component, systemEvent, SystemEventType, EventTouch, CameraComponent, geometry, Touch, PhysicsSystem } from "cc";
import { Fish } from '../fish/fish';
const { ccclass, property } = _decorator;

@ccclass('RayCastHandler')
export class RayCastHandler extends Component {
    @property(CameraComponent)
    private camera: CameraComponent = null!;

    private ray: geometry.Ray = new geometry.Ray();

    onEnable() {
        systemEvent.on(SystemEventType.TOUCH_START, this.touchStartHandler, this);
    }

    onDisable() {
        systemEvent.off(SystemEventType.TOUCH_START, this.touchStartHandler, this);
    }

    touchStartHandler(touch: Touch, event: EventTouch) {
        this.camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this.ray);

        if (PhysicsSystem.instance.raycastClosest(this.ray)) {
            const r = PhysicsSystem.instance.raycastClosestResult;
            const fishComp = r.collider.node.getComponent(Fish)!;
            fishComp.switchState();
        }
    }
}