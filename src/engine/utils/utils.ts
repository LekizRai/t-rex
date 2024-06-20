function randomInt(low: number, high: number) {
    let gap: number = high - low + 1
    return Math.floor(Math.random() * gap + low)
}

export default { randomInt }
