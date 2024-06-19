class Message {
    private event: Event | string

    constructor(event: Event | string) {
        this.event = event
    }

    public getEvent(): Event | string {
        return this.event
    }
}

export default Message
