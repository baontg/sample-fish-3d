
import { _decorator, Component, view, Layout, UITransform, Size } from 'cc';
const { ccclass } = _decorator;

@ccclass('LayoutButtons')
export class LayoutButtons extends Component {
    start() {
        view.on('canvas-resize', this.canvasResizeHandler.bind(this));
        this.canvasResizeHandler();
    }

    canvasResizeHandler() {
        let frameSize = view.getFrameSize();
        if (frameSize.width > frameSize.height) {
            this.setHorizontalLayout();
        } else {
            this.setVerticalLayout();
        }
    }

    setHorizontalLayout() {
        let layout = this.node.getComponent(Layout);
        layout.type = Layout.Type.HORIZONTAL;
        layout.spacingX = 40;
        layout.node.children.forEach(el => el.setPosition(el.position.x, 0));
        let transform = this.node.getComponent(UITransform);
        transform.setContentSize(new Size(transform.width, 60));
    }

    setVerticalLayout() {
        let layout = this.node.getComponent(Layout);
        layout.type = Layout.Type.VERTICAL;
        layout.spacingY = 40;
        layout.node.children.forEach(el => el.setPosition(0, el.position.y));
        let transform = this.node.getComponent(UITransform);
        transform.setContentSize(new Size(250, transform.height));
    }
}