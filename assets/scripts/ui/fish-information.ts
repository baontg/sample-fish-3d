
import { _decorator, Component, Node, Vec3, Camera, view, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FishInformation')
export class FishInformation extends Component {
    @property(Label)
    private labelName = null;
    
    private out: Vec3 = new Vec3();
    private camera = null;
    private target: Node = null;

    setTarget(target: Node, name: string, camera: Camera) {
        this.target = target;
        this.labelName.string = name;
        this.camera = camera;
    }

    update() {
        if (this.target) {
            if (!this.target.isValid) {
                this.node.destroy();
                return;
            }
            this.camera.convertToUINode(this.target.worldPosition, this.node.parent, this.out);
            this.node.setPosition(this.out);
        }
    }
}