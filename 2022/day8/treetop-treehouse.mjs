import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day8-input.txt').trim()
const exampleInput = `30373
25512
65332
33549
35390`

const treeViewer = (trees) => {
    const canBeSeenFromEdge = []
    const rows = trees.split('\n')
    rows.forEach((row, i, rowsArr) => {
        console.log(i, row)
        row.split('').forEach((col, j, colsArr) => {
            // if it's on the edge it can be seen
            if (j === 0 || j === colsArr.length - 1 || i === 0 || i === rowsArr.length - 1) {
                canBeSeenFromEdge.push(col)
            } 
            else {
                // compare current column to neighbors
                const fromLeft = colsArr.slice(0, j)
                const fromRight = colsArr.slice(j+1, colsArr.length)
                //console.log(fromLeft,'-----', col, '------',fromRight)
                const canNotBeSeenFromLeft = fromLeft.find(left => Number(col) <= Number(left))
                const canNotBeSeenFromRight = fromRight.find(right => Number(col) <= Number(right))
                //console.log('R', canNotBeSeenFromLeft, 'col', col, 'L', canNotBeSeenFromRight)
                if (!canNotBeSeenFromLeft || !canNotBeSeenFromRight) {
                    console.log('col', col)
                    canBeSeenFromEdge.push(col)
                }

            }
        })
    })
    return canBeSeenFromEdge.length
}
console.log(treeViewer(rawFile))
console.log(treeViewer(exampleInput))
