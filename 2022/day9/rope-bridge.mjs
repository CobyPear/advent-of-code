import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day9-input.txt').trim()

const pushIfNotIncluded = (arr, coord) => {
    const result = arr.find(item => { 
       return item.tail.y === coord.tail.y && item.tail.x === coord.tail.x
    })
    if (!result) {
        arr.push(coord)
        return true
    }
    return false
}

const mapVisitedSquares = (instructions) => {
    const coords = { 
        head: { x: 0, y: 0 },
        tail: { x: 0, y: 0 }, 
    }


    const visitedCoords = []
    const uniqueVisits = []
    visitedCoords.push(coords)
    instructions.split('\n').forEach(line => {
        const currentCoords = visitedCoords[visitedCoords.length-1]
        const clonedCoords = JSON.parse(JSON.stringify(currentCoords))
        let [dir, num] = line.split(' ')
        num = Number(num)
        for (let i = 0; i <= num; i++) {
            switch (dir) {
                    // TODO: Need to account for a few more cases
                    // like the head being +1 y and the tail being -2 x
                case 'L':
                    clonedCoords.head.x--
                    if (Math.abs(clonedCoords.head.x - currentCoords.tail.x) > 2) {
                        clonedCoords.tail.x = currentCoords.head.x + 1
                    }
                        pushIfNotIncluded(uniqueVisits, clonedCoords)
                    break
                case 'R':
                    clonedCoords.head.x++
                    if (Math.abs(clonedCoords.head.x + currentCoords.tail.x) > 2) {
                        clonedCoords.tail.x = currentCoords.head.x -1
                    }
                        pushIfNotIncluded(uniqueVisits, clonedCoords)

                    break
                case 'U':
                    clonedCoords.head.y++
                    if (Math.abs(clonedCoords.head.y + currentCoords.tail.y) > 2) {
                        clonedCoords.tail.y = currentCoords.head.y -1
                    } 
                        pushIfNotIncluded(uniqueVisits, clonedCoords)
                    break
                case 'D':
                    clonedCoords.head.y--
                    if (Math.abs(clonedCoords.head.y - currentCoords.tail.y) > 2) {
                        clonedCoords.tail.y = currentCoords.head.y +1
                    }
                        pushIfNotIncluded(uniqueVisits, clonedCoords)
                    break
                default:
                    throw 'Something went wrong'
            }
            visitedCoords.push(clonedCoords)


        }
    })
    console.log(uniqueVisits.length)
//    const uniqueTail = []
 //   visitedCoords.map(({ tail }) => {
 //       console.log(tail)
 //       uniqueTail.includes(tail) && uniqueTail.push(tail)
 //   }) 
 //   console.log(uniqueTail)
}


console.log(mapVisitedSquares(rawFile))
