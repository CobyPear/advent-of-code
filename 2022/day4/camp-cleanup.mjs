import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day4-input.txt').trim()

const campCleanup = (cleanupAssignments) => {
    return cleanupAssignments.split('\n').map((sections) => {
        // seperate each elf
        const [elf1, elf2] = sections.split(',')
        // get each elf start and end
        const [elf1Start, elf1End] = elf1.split('-').map(Number)
        const [elf2Start, elf2End] = elf2.split('-').map(Number)
        // full overlap returns 1
        if (elf1Start >= elf2Start && 
            elf1End <=elf2End || 
            elf2Start >= elf1Start && 
            elf2End <= elf1End) {
            return 1 
        }
        // otherwise return 0
        return 0
    }).reduce((a, c) => a + c)
}

const campCleanupPart2= (cleanupAssignments) => {
    return cleanupAssignments.split('\n').map((sections) => {
        // seperate each elf
        const [elf1, elf2] = sections.split(',')
        // get each elf start and end
        const [elf1Start, elf1End] = elf1.split('-').map(Number)
        const [elf2Start, elf2End] = elf2.split('-').map(Number)
        // any overlap returns 1
        if (elf1Start === elf2Start ||
            elf1Start === elf2End ||
            elf1End === elf2Start ||
            elf2End === elf1End ||
            (elf1End > elf2Start &&
            elf1Start < elf2End)) {
            return 1
        }
        // otherwise return 0
        return 0
    }).reduce((a, c) => a + c)
}

console.log(campCleanup(rawFile))
console.log(campCleanupPart2(rawFile))
