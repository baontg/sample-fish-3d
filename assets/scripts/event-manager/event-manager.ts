class EventManager {
    private static listeners: Map<any, Function[]> = new Map<any, Function[]>();

    public static publish(event: any, data?: any) {
        if (!this.listeners.has(event)) {
            return;
        }
        let actions = this.listeners.get(event);
        actions.forEach(action => action(data));
    }

    public static subscribe(event: any, actionHandler: Function) { // target, function (bind same target + same object => n binding objects)
        let actions = this.listeners.get(event) || [];
        actions.push(actionHandler);
        this.listeners.set(event, actions);
    }
}

export default EventManager;