/**
 starting stacks:
[Q] [J]                         [H]
[G] [S] [Q]     [Z]             [P]
[P] [F] [M]     [F]     [F]     [S]
[R] [R] [P] [F] [V]     [D]     [L]
[L] [W] [W] [D] [W] [S] [V]     [G]
[C] [H] [H] [T] [D] [L] [M] [B] [B]
[T] [Q] [B] [S] [L] [C] [B] [J] [N]
[F] [N] [F] [V] [Q] [Z] [Z] [T] [Q]
 1   2   3   4   5   6   7   8   9
*/
// parsing this by hand b/c can't figure out the JS at the moment
const useableInput = {
    1: ['Q', 'G', 'P', 'R', 'L', 'C', 'T', 'F'],
    2: ['J', 'S', 'F', 'R', 'W', 'H', 'Q', 'N'],
    3: ['Q', 'M', 'P', 'W', 'H', 'B', 'F'],
    4: ['F', 'D', 'T', 'S', 'V'],
    5: ['Z', 'F', 'V', 'W', 'D', 'L', 'Q'],
    6: ['S', 'L', 'C', 'Z'],
    7: ['F', 'D', 'V', 'M', 'B', 'Z'],
    8: ['B', 'J', 'T'],
    9: ['H', 'P', 'S', 'L', 'G', 'B', 'N', 'Q']
}

import inputFileHelper from '../utils/input-file-helper.js'

const [stacks, instructions] = inputFileHelper('day5-input.txt').split('\n\n')

const moveStacks = (stacks, instructions) => {
    const instArr = instructions.trim().split('\n')
    for (let i = 0; i < instArr.length; i++) {
        const [numCrates, start, end] = instArr[i].match(/[\d]+/g)
        const temp = Array.from({ length: numCrates-1}, (_, i) => i)
        for (let j = 0; j <= temp.length; j++ ) {
            stacks[end].unshift(stacks[start].shift())
        }
    }
    const result = []
    for (const stack of Object.values(stacks)) {
        result.push(stack[0])
    }
    return result.join('')

}

console.log(moveStacks(useableInput, instructions))
