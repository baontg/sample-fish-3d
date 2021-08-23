
import { _decorator, Component, Node, NodePool, Prefab, instantiate, Vec3 } from 'cc';
import UIEnum from '../enum/ui-enum';
import EventManager from '../event-manager/event-manager';
const { ccclass, property } = _decorator;

@ccclass('FishSpawner')
export class FishSpawner extends Component {
    @property
    private leftLimit = 0;
    @property
    private rightLimit = 0;
    @property
    private topLimit = 0;
    @property
    private botLimit = 0;

    @property({type: Node})
    private fishContainer;

    @property({type: Prefab})
    private fishPrefabs = [];

    private fishPool: NodePool;
    private fishes: Node[] = [];

    start() {
        this.fishPool = new NodePool();

        EventManager.subscribe(UIEnum.ButtonCreateFishClicked, this.spawnFish.bind(this));
        EventManager.subscribe(UIEnum.ButtonRemoveAllClicked, this.removeAllFish.bind(this));
    }

    spawnFish() {
        let randPrefab = this.fishPrefabs[this.random(0, this.fishPrefabs.length)];
        let randPosition = new Vec3(this.random(this.leftLimit, this.rightLimit), this.random(this.botLimit, this.topLimit));
        let fish: Node = null;
        if (this.fishPool.size() > 0) {
            fish = this.fishPool.get();
        } else {
            fish = instantiate(randPrefab);
        }
        fish.parent = this.fishContainer;
        fish.setPosition(randPosition);
        fish.active = true;
        this.fishes.push(fish);
    }

    removeAllFish() {
        let fish = this.fishes.pop();
        while (fish != null) {
            fish.active = false;
            this.fishPool.put(fish);
            fish = this.fishes.pop();
        }
    }

    random(min, max): number {
        let num = Math.floor(Math.random() * (max - min) ) + min;
        return num;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
