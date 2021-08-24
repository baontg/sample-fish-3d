import { warn } from "cc";

class EventManager {
    private listeners: Map<any, Map<object, Function>>;

    constructor() {
        this.listeners = new Map<any, Map<object, Function>>();
    }

    public publish(event: any, data?: any) {
        if (!this.listeners.has(event)) {
            return;
        }
        let actionsMapObject = this.listeners.get(event);
        actionsMapObject.forEach(action => action(data));
    }

    public register(event: any, actionHandler: Function, target: object) {
        let actionsMapObject = this.listeners.get(event) || new Map<object, Function>();
        if (actionsMapObject.has(target)) {
            warn('This object has been registered this event');
            return;
        }
        actionsMapObject.set(target, actionHandler);
        this.listeners.set(event, actionsMapObject);
    }

    public unregister(event: any, actionHandler: Function, target: object) {
        if (!this.listeners.has(event)) {
            return;
        }
        let actionsMapObject = this.listeners.get(event);
        if (actionsMapObject.has(target)) {
            actionsMapObject.delete(target);
        }
    }
}

export default EventManager;