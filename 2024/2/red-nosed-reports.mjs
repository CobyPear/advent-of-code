import inputFileHelper from '../../utils/input-file-helper.js'

const rawFile = inputFileHelper(process.argv[2]).trim()

const parseFile = (input) => {
    const arr = input.split('\n')
    return arr.map(s => s.split(' ').map(Number))
}

const isIncreasingOrDecreasing = (parsedInputRow) => {
    const differenceBetweenItems = parsedInputRow.reduce((acc, curr, i) => {
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

    return isAllPositive || isAllNegative
}

const findInterval = (parsedInput) => {
    // The levels are either all increasing or all decreasing.
    // Any two adjacent levels differ by at least one and at most three.
    let safe = true;
    parsedInput.map((num, i)=> {
        // find if the number is increasing or decreasing
        const difference = num - parsedInput[i + 1]
        return difference
    }).filter(x => x !== NaN).forEach(num => {
        if (num > 3 || num < -3 || num === 0) {      
            safe = false
            return
        }
    })
    return safe
}

const findSafe = (parsedInput) => {
    let result = 0;
    parsedInput.forEach(input => {
        if (findInterval(input) && isIncreasingOrDecreasing(input)) {
            result += 1
        }
    })

    return result
}

console.log(findSafe(parseFile(rawFile)))