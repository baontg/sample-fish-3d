
import { _decorator, Component, Node, SkeletalAnimationComponent, AnimationClip, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fish')
export class Fish extends Component {
    @property(SkeletalAnimationComponent)
    private animation: SkeletalAnimationComponent = null;

    @property(AnimationClip)
    private clipSwim: AnimationClip = null;

    @property(Node)
    private nodeModel: Node = null;

    @property
    private swimAnchor = new Vec3();

    private defaultPosition = new Vec3();

    onEnable() {
        this.swim();
    }

    onDisable(){
        this.idle();
    }

    swim() {
        this.defaultPosition = this.nodeModel.getPosition();
        this.animation.play(this.clipSwim.name);
        this.nodeModel.setPosition(this.swimAnchor);
    }

    idle(){
        this.animation.stop();
        this.nodeModel.setPosition(this.defaultPosition);
        this.defaultPosition = null;
    }
}