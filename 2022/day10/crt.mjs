import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day10-input.txt').trim()
const exampleFile = inputFileHelper('example.txt').trim()


// noop - takes 1 cycle, no change
// addx - takes 2 cyles, adds number to the register at the END of 2nd cycle
// 20th, 60th, 100th, 140th, 180th, and 220th
const calculateCycles = (instructions) => {
    let currentCycle = 1
    let currentRow = 0
    let currentCol = 0
    let currentRegister = 1
    let row = []
    let [start, mid, end] = [0, 1, 2]

    const addxValues = []
    const rows = []
    const importantCycles = [20, 60, 100, 140, 180, 220]
    const signalStrengths = []

    const drawPixel = (currentRegister) => {
        if (currentCol === 40) {
            currentCol = 0
            currentRow++
            rows.push(row)
            row = []
            start = 0
            mid = 1
            end = 2
            if (currentRow === 6) {
                return
            }
        }
        if (currentCol === start || currentCol === mid || currentCol ===  end) {
            row.push('#')

        } else {
            row.push('.')
        }
        currentCol++
    }

    const getSignalStrength = () => {
        if (importantCycles.includes(currentCycle)) {
                const signalStrength = 
                    addxValues.map(Number)
                        .reduce((a, c) => a + c, 1) * currentCycle
                signalStrengths.push(signalStrength)
            }
    }

    // start it off
    drawPixel(currentRegister)
    
    instructions.split('\n').forEach((instruction, i)=> {
        if (instruction.startsWith('noop')) {
            currentCycle++
            currentRegister = addxValues.map(Number).reduce((a, c) => a + c, 1)
            drawPixel(currentRegister)
            getSignalStrength()
        } else {
            currentCycle++
            getSignalStrength()
            currentRegister = addxValues.map(Number).reduce((a, c) => a + c, 1)
            drawPixel(currentRegister)
            
            const [_, addxValue] = instruction.split(' ')
            addxValues.push(addxValue)
            currentCycle++
            getSignalStrength()

            currentRegister = addxValues.map(Number).reduce((a, c) => a + c, 1)
            drawPixel(currentRegister)

        } 
            start = currentRegister
            mid = currentRegister +1
            end = currentRegister +2

    })
    console.log(signalStrengths.reduce((a, c) => a + c))
    console.log(rows.forEach(row=> console.log(row.join(''))))
}

console.log(calculateCycles(rawFile))
//console.log(calculateCycles(exampleFile))
