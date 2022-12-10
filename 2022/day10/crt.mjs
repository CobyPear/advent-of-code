import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day10-input.txt').trim()
const exampleFile = inputFileHelper('example.txt').trim()


// noop - takes 1 cycle, no change
// addx - takes 2 cyles, adds number to the register at the END of 2nd cycle
// 20th, 60th, 100th, 140th, 180th, and 220th




const calculateCycles = (instructions) => {
    const addxValues = []
    let currentCycle = 1
    const importantCycles = [20, 60, 100, 140, 180, 220]
    const signalStrengths = []

    const getSignalStrength = () => {
        if (importantCycles.includes(currentCycle)) {
                const signalStrength = 
                    addxValues.map(Number)
                        .reduce((a, c) => a + c, 1) * currentCycle
                console.log('important signal strength------------------ cycle',currentCycle, '--', signalStrength)
                signalStrengths.push(signalStrength)
            }
    }

    instructions.split('\n').forEach((instruction, i)=> {
        if (instruction.startsWith('noop')) {
            currentCycle++
            getSignalStrength()
        } else {
            currentCycle++
            getSignalStrength()
            const [_, addxValue] = instruction.split(' ')
            addxValues.push(addxValue)
            currentCycle++
            getSignalStrength()
        } 
    })
    return signalStrengths.reduce((a, c) => a + c)
}

console.log(calculateCycles(rawFile))
//console.log(calculateCycles(exampleFile))
