import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day6-input.txt').trim()

const findPacketMarker = (packet) => {
    let result
    packet.split('').find((_, i, chars) => {
        const next4 = chars.slice(i, i + 4)
        const uniques = [...new Set(next4)]
        if (uniques.length === 4) {
            return result = i + 4
        }
        return false
    })
    return result
}


console.log(findPacketMarker(rawFile))

