import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day11-input.txt').trim()

const exampleInput = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`


const inputParser = (input) => {
    const monkeys = {}
    let monkey
    let currentMonkey
    input.split('\n').forEach((lines, i) => {
        lines.split('\n').forEach((line) => {
            if (line.startsWith('Monkey')) {
                const [_, monkeyNum] = line.split(' ')
                currentMonkey = Number(monkeyNum.replace(':', ''))
                monkeys[currentMonkey] = {
                    inspected: 0
                }
            }

            if (line.startsWith('  Starting items:')) {
                const [_, startingItems] = line.split(': ')
                monkeys[currentMonkey].startingItems = startingItems.split(', ').map(Number)
            }

            if (line.startsWith('  Operation:')) {
                const [_, fullOp] = line.split(': ')
                const [__, operation] = fullOp.split('= ') 
                const [old, modifier, c] = operation.split(' ')
                const func = (x) => {
                    const y = c === old ? x : c
                    switch (modifier) {
                        case '+':
                            return Number(x) + Number(y)
                        case '*':
                            return Number(x) * Number(y) 
                        default:
                            throw 'Something went wrong...'
                    }
                    
                }
                monkeys[currentMonkey].operation = func
            }
            
            if (line.startsWith('  Test:')) {
                const [_, testCase] = line.split(': ')
                const [__, testNum] = testCase.split('by ')
                monkeys[currentMonkey].testNum = Number(testNum)
            }

            if (line.startsWith('    If')) {
                const [bool] = /true|false/.exec(line)
                const [toMonkey] = /\d+/.exec(line)
                monkeys[currentMonkey][bool] = Number(toMonkey)
                
            }

        })

    })
    return monkeys
}

const calculateMonkeyBusiness = (monkeys) => { 
    for (let i = 1; i <= 20; i++) {
        Object.keys(monkeys).forEach((key) => {
            const monkey = monkeys[key]
            const startLength = monkey.startingItems.length
            for (let j = 0; j < startLength; j++) {
                const item = monkey.startingItems[0]
                // perform monkey's operation on the item
                let newItemLevel = monkey.operation(item)
                // reduce worry level by /3 rounded down
                newItemLevel = Math.floor(newItemLevel / 3)
                // set the new worry level
                // remove the item from the current array
                monkey.startingItems.shift()
                // get the receiving monkey
                let receivingMonkey
                if (newItemLevel % monkey.testNum === 0) {
                    receivingMonkey = monkey.true
                } else {
                    receivingMonkey = monkey.false
                }
                // move the item to the new monkey
                monkeys[receivingMonkey].startingItems.push(newItemLevel)
                monkey.inspected++
        }
    
        })
    }
    const numInspected = Object.values(monkeys).map(({inspected}) => {
        return inspected
    }).sort((a, b) => b - a)
    const result = numInspected[0] * numInspected[1]
    return result

}

console.log(calculateMonkeyBusiness(inputParser(exampleInput)))
console.log(calculateMonkeyBusiness(inputParser(rawFile)))

