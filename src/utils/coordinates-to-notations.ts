export default (coordinates: Array<[number, number]>) => {
    return coordinates.map(([row, col]) => {
        return `${String.fromCharCode(97 + col)}${8 - row}`
    })
}