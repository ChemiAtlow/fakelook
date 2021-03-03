class TabUtilsClass {
    static keyPrefix = "_tabUtils_";
    //eslint-disable-next-line
    static handlers: { [messageId: string]: any } = {};
    broadcastMessageToAllTabs<T>(messageId: string, eventData: T) {
        const data = {
            data: eventData,
            timeStamp: Date.now(),
        };
        localStorage.setItem(TabUtilsClass.keyPrefix + "event" + messageId, JSON.stringify(data));

        //now we also need to manually execute handler in the current tab too, because current tab does not get 'storage' events
        try {
            TabUtilsClass.handlers[messageId](eventData);
        } catch (x) {
            //"try" in case handler not found
        }

        //cleanup
        setTimeout(function() {
            localStorage.removeItem(TabUtilsClass.keyPrefix + "event" + messageId);
        }, 3000);
    }
    onBroadcastMessage<T>(messageId: string, fn: (payload: T) => void) {
        //first register a handler for "storage" event that we trigger above
        window.addEventListener("storage", ev => {
            if (ev.key !== TabUtilsClass.keyPrefix + "event" + messageId) return; // ignore other keys
            if (!ev.newValue) return; //called by cleanup?
            const messageData = JSON.parse(ev.newValue);
            fn(messageData.data);
        });

        //second, add callback function to the local array so we can access it directly
        TabUtilsClass.handlers[messageId] = fn;
    }
}

export const TabUtils = new TabUtilsClass();
