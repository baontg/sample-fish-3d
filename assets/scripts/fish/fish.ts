
import { _decorator, Component, Node, SkeletalAnimationComponent, AnimationClip, Vec3 } from 'cc';
import Random from '../utils/random';
const { ccclass, property } = _decorator;
type Range = { left: number, right: number, top: number, bot: number };

@ccclass('Fish')
export class Fish extends Component {
    @property(SkeletalAnimationComponent)
    private animation: SkeletalAnimationComponent = null;

    @property(AnimationClip)
    private clipSwim: AnimationClip = null;

    @property(Node)
    private nodeModel: Node = null;

    @property
    private moveSpeed = 0.0002;

    @property
    private swimAnchor = new Vec3();

    private defaultPosition = new Vec3();
    private movingRange: Range;
    private isSwimming = false;
    private posTarget = new Vec3();

    onDisable() {
        this.idle();
    }

    update(dt: number) {
        if (this.isSwimming) {
            let pos = this.node.getPosition();
            if (!(pos.x.toFixed(2) != this.posTarget.x.toFixed(2) ||
                pos.z.toFixed(2) != this.posTarget.z.toFixed(2))) {
                this.moveNext();
            } else {
                let offset = new Vec3();
                Vec3.subtract(offset, this.posTarget, this.node.position);
                offset.normalize();

                Vec3.multiplyScalar(offset, offset, this.moveSpeed);
                let pos = this.node.worldPosition;
                offset.add(pos);
                this.node.setPosition(offset);
            }
        }
    }

    setMovingRange(left: number, right: number, top: number, bot: number) {
        this.movingRange = { left: left, right: right, top: top, bot: bot };
    }

    swim() {
        this.isSwimming = true;
        this.defaultPosition = this.nodeModel.getPosition();
        this.animation.play(this.clipSwim.name);
        this.nodeModel.setPosition(this.swimAnchor);
        this.moveNext();
    }

    idle() {
        this.isSwimming = false;
        this.animation.stop();
        this.nodeModel.setPosition(this.defaultPosition);
        this.defaultPosition = null;
    }

    moveNext() {
        this.posTarget = new Vec3(Random.range(this.movingRange.left, this.movingRange.right),
            Random.range(-0.02, 0.02),
            Random.range(this.movingRange.top, this.movingRange.bot));
        let pos = this.node.position;
        let targetDir = this.posTarget.clone();
        targetDir.subtract(pos);
        let vectorForward = pos.clone();
        vectorForward.subtract(new Vec3(pos.x, pos.y, -1));
        let angle = Vec3.angle(targetDir, vectorForward) * 180 / Math.PI;
        if (targetDir.x < 0) {
            angle = 360 - angle;
        }
        this.node.setRotationFromEuler(new Vec3(0, angle, 0));
    }
}