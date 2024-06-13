export class Message {
    private keyCode: number
    private status: string

    construtor() {}

    getKeyCode(): number {
        return this.keyCode
    }

    getStatus(): string {
        return this.status
    }

    setKeyCode(keyCode: number): void {
        this.keyCode = keyCode
    }

    setStatus(status: string): void {
        this.status = status
    }
}
