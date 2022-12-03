import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day3-input.txt').trim()

const rucksackCounter = (sacks) => {
    return sacks.split('\n').map((sack) => {
        const middle = sack.length / 2
        // seperate the compartments
        const comp1 = sack.slice(0, middle)
        const comp2 = sack.slice(middle)
        // get the priority item
        let prioItem = '';
        comp1.split('').forEach(item => {
           if (comp2.split('').includes(item)) {
               prioItem = item
           }
        })
        const charcode = prioItem.charCodeAt(0)
        return charcode <= 90 ?  charcode - 38 : charcode - 96
    }).reduce((a, c) => a + c)
}

console.log(rucksackCounter(rawFile))
