
import { _decorator, Component, Node, SkeletalAnimationComponent, AnimationClip, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Fish')
export class Fish extends Component {
    @property({ type: SkeletalAnimationComponent })
    private animation: SkeletalAnimationComponent;

    @property({ type: AnimationClip })
    private clipSwim: AnimationClip;

    @property(Node )
    private nodeModel: Node;

    @property(Vec3)
    private swimAnchor = cc.v3();

    swim() {
        this.animation.play(this.clipSwim.name);
        this.nodeModel.setPosition(this.swimAnchor as any);
    }

    onEnable() {
        this.swim();
    }
}