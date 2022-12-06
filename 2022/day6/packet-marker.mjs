import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day6-input.txt').trim()

const findNextUniques = (string, numOfUniques) => {
    let result
    string.split('').find((_, i, chars) => {
        const nextX = chars.slice(i, i + numOfUniques)
        const uniques = [...new Set(nextX)]
        if (uniques.length === numOfUniques) {
            return result = i + numOfUniques
        }
        return false
    })
    return result
}


console.log(findNextUniques(rawFile, 4))
console.log(findNextUniques(rawFile, 14))
