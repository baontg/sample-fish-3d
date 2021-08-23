
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
        let randPrefab = this.fishPrefabs[Math.floor(Math.random() * this.fishPrefabs.length)];
        let randPosition = new Vec3(this.random(this.leftLimit, this.rightLimit), 0, this.random(this.topLimit, this.botLimit));
        let randRotation = new Vec3(0, this.random(0, 360), 0);
        let fish: Node = null;
        if (this.fishPool.size() > 0) {
            fish = this.fishPool.get();
        } else {
            fish = instantiate(randPrefab);
        }
        fish.parent = this.fishContainer;
        fish.setPosition(randPosition);
        fish.setRotationFromEuler(randRotation);
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
        let num = Math.random() * (max - min) + min;
        return num;
    }
}