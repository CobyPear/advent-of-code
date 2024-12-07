import inputFileHelper from '../../utils/input-file-helper.js'

const rawFile = inputFileHelper(process.argv[2]).trim()


// parse the input file into 2 arrays
const makeArrays = (input) => {
    const pairs = input.split("\n")
    const tuples = pairs.map((p) => p.split(/\s{3}/))
    const a = tuples.map((t) => parseInt(t[0])).sort()
    const b = tuples.map((t) => parseInt(t[1])).sort()

    return [a, b]
}

//part 1
// calculate the distance
const calculateDistance = (arrays) => {
    const [a, b] = arrays
    return a.reduce((acc, cur, i) => {
        acc.push(Math.abs(cur - b[i]))
        return acc
    }, []).reduce((acc,cur)=>{
        acc = acc + cur
        return acc
    }, 0)
}

// part 2
const calculateSimilarityScore = (arrays) => {
    const [a, b] = arrays
    // multiply a for each time it occurs in list b
    return a.map((n) => {
        const numToMultiplyBy = b.filter(x => x === n).length
        return numToMultiplyBy * n
    }).reduce((acc,cur)=>{
        acc = acc + cur
        return acc
    }, 0)
}

// console.log(calculateDistance(makeArrays(rawFile)))
console.log(calculateSimilarityScore(makeArrays(rawFile)))