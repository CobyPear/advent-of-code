/**
  This list represents the Calories of the food carried by five Elves:

    The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
    The second Elf is carrying one food item with 4000 Calories.
    The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
    The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
    The fifth Elf is carrying one food item with 10000 Calories.

In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

Find the Elf carrying the most
* 1000
* 2000
* 3000
* 
* 4000
* 
* 5000
* 6000
* 
* 7000
* 8000
* 9000
* 
* 10000
*/
import fs from 'fs'
import path from 'path'

const inputFile = ('day1.input.txt')
const getObjectsFromFile = (file) => {
    const rawFile = fs.readFileSync(file, 'utf8')
    const elfData = rawFile.split('\n\n')
    // need numbers, not strings :3
    let elves = elfData.map(elf => elf.split('\n')).map(elf => elf.map(e => Number(e)))
    return elves

}
const elves = getObjectsFromFile(inputFile)
const getMostRecursive = ({elves, topElf = 0, i}) => {
    if (i === 0) return topElf
    if (Array.isArray(elves[0])) {
        elves = elves.map((elf, i) => elf.reduce((acc, cur) => acc + cur)).sort((a, b) => a - b)
    }
    topElf += elves.pop()
    i--
    return getMostRecursive({elves:elves, topElf, i})
}


/**
 *
 * Get the sum of the top 3 most calories carried
 *
 */
console.log(getMostRecursive({elves: elves, i: 3 }))
