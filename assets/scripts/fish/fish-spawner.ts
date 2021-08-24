
import { _decorator, Component, Node, NodePool, Prefab, instantiate, Vec3, Camera } from 'cc';
import { FishInformation } from '../ui/fish-information';
import Random from '../utils/random';
import { Fish } from './fish';
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

    @property(Camera)
    private camera: Camera = null;

    @property(Node)
    private fishContainer = null;

    @property(Node)
    private fishInformationContainer = null;

    @property(Prefab)
    private fishInformationPrefab = null;
    
    @property(Prefab)
    private fishPrefabs = [];

    spawnFish() {
        let randPrefab = this.fishPrefabs[Math.floor(Math.random() * this.fishPrefabs.length)];
        let randPosition = new Vec3(Random.range(this.leftLimit, this.rightLimit), 0, Random.range(this.topLimit, this.botLimit));
        let fish: Node = instantiate(randPrefab);
        fish.parent = this.fishContainer;
        fish.position = randPosition;
        let fishComp = fish.getComponent(Fish);
        fishComp.setMovingRange(this.leftLimit, this.rightLimit, this.topLimit, this.botLimit);
        fishComp.swim();

        let nodeInformation: Node = instantiate(this.fishInformationPrefab);
        nodeInformation.parent = this.fishInformationContainer;
        let fishInformation: FishInformation = nodeInformation.getComponent(FishInformation);
        fishInformation.setTarget(fish, fish.children[0].name, this.camera);
    }

    removeAllFish() {
        this.fishContainer.destroyAllChildren();
    }
}