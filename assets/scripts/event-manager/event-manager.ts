class EventManager {
    private static listeners: Map<any, Function[]> = new Map<any, Function[]>();

    public static publish(event: any, data?: any) {
        console.log(`Publishing event`, event, `with data =`, data);
        
        if (!this.listeners.has(event)) {
            return;
        }
        let actions = this.listeners.get(event);
        actions.forEach(action => action(data));
    }

    public static subscribe(event: any, actionHandler: Function) {
        let actions = this.listeners.get(event) || [];
        actions.push(actionHandler);
        this.listeners.set(event, actions);
    }
}

export default EventManager;