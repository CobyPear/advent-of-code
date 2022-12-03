import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day3-input.txt').trim()
const getPrioNumber = (charcode) => {
    return charcode <= 90 ? charcode - 38 : charcode - 96
}

const rucksackCounter = (sacks) => {
    return sacks.split('\n').map((sack) => {
        const middle = sack.length / 2
        // seperate the compartments
        const comp1 = sack.slice(0, middle)
        const comp2 = sack.slice(middle)
        // get the priority item
        let prioItem = ''
        comp1.split('').forEach(item => {
           if (comp2.split('').includes(item)) {
               prioItem = item
           }
        })
        const charcode = prioItem.charCodeAt(0)
        return getPrioNumber(charcode)
    }).reduce((a, c) => a + c)
}
const rucksackBadgeCounter = (sacks) => {
    const badges = []
    sacks = sacks.split('\n')
    for (let i = 0; i <= sacks.length - 3; i += 3) {
        const sack1 = sacks[i].split('')
        const sack2 = sacks[i + 1].split('')
        const sack3 = sacks[i + 2].split('')
        let prioItem = ''
        sack1.forEach(item => {
            if (sack2.includes(item) && sack3.includes(item)) {
                prioItem = item
            }
        })
        const charcode = prioItem.charCodeAt(0)
        badges.push(getPrioNumber(charcode))
    }
    return badges.reduce((a, c) => a + c)
}

console.log(rucksackCounter(rawFile))
console.log(rucksackBadgeCounter(rawFile))
