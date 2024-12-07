import inputFileHelper from '../../utils/input-file-helper.js'

const rawFile = inputFileHelper(process.argv[2]).trim()

const parseFile = (input) => {
    const arr = input.split('\n')
    return arr.map(s => s.split(' ').map(Number))
}

const isIncreasingOrDecreasing = (parsedInputRow) => {
    const differenceBetweenItems = parsedInputRow.reduce(acc, curr, i, () => {
        if (i === parsedInputRow.length - 1) {
            return acc
        } else {
            const diff = curr - parsedInputRow[i + 1]
            acc.push(diff)
            return acc
        }
    }, [])

    const hasZero = differenceBetweenItems.find(n => n === 0) 
    if (hasZero) {
        return false
    }

    const isAllPositive = differenceBetweenItems.every(n => n > 0)
    const isAllNegative = differenceBetweenItems.every(n => n < 0)

    return isAllPositive && isAllNegative
}