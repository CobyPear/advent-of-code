import fileHelper from '../utils/input-file-helper.js'

const rawFile = fileHelper('./day2-input.txt')


const rpsCheatManualReader = (manual) => {
    // A & X - Rock
    // B & Y - Paper
    // C & Z - Scissors
    const r = 1 
    const p = 2 
    const s = 3
    const dict = {
        A: r,
        X: r,
        B: p,
        Y: p,
        C: s,
        Z: s,
    }
    
    let scores = manual.split('\n')
        // remove empty line
        scores.pop()
        scores = scores.map((line) => {
       const [opp, me] = line.split(' ')
        const oppChoice = dict[opp]
        const myChoice = dict[me]

        // round is a draw (3 pts)
        if (oppChoice === myChoice) {
            return myChoice + 3
        }

        if (myChoice === 1 && oppChoice === 3 || 
            myChoice === 2 && oppChoice === 1 ||
            myChoice === 3 && oppChoice === 2) {
            // round is a win (6 pts)
            return myChoice + 6

        } else {
            // round is a loss (0 pts)
            return myChoice
        }
    })
    return scores.reduce((a,c) => a + c)
}
const rpsCheatManualReaderVersion2 = (manual) => {
    // A - rock
    // B - paper
    // C - scissors
    // X - lose
    // Y - draw
    // Z - win
    const r = 1 
    const p = 2 
    const s = 3
    const dict = {
        A: r,
        B: p,
        C: s,
        X: 'lose',
        Y: 'draw',
        Z: 'win',
    }
    
    let scores = manual.split('\n')
        // remove empty line
        scores.pop()
        scores = scores.map((line) => {
       const [opp, me] = line.split(' ')
        const oppChoice = dict[opp]
        const myChoice = dict[me]
            switch (myChoice) {
                case 'lose':
                    switch (oppChoice){
                        case r:
                            return s
                        case p:
                            return r
                        case s:
                            return p
                    }
                case 'draw':
                    return oppChoice + 3
                case 'win':
                    switch (oppChoice){
                        case r:
                            return p + 6
                        case p:
                            return s + 6
                        case s:
                            return r + 6
                    }
                default:
                    throw 'Something went wrong...'

            }

    })
    return scores.reduce((a,c) => a + c)
}

console.log(rpsCheatManualReader(rawFile))
console.log(rpsCheatManualReaderVersion2(rawFile))
