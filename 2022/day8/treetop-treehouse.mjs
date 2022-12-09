import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day8-input.txt').trim()
const exampleInput = `30373
25512
65332
33549
35390`

const fromDirectionTaller = (arg, arr) => {
    return arr.find(x => Number(arg) <= Number(x))
}

const treeViewer = (trees) => {
    const canBeSeenFromEdge = []
    const rows = trees.split('\n')
    rows.forEach((row, i, rowsArr) => {
        row.split('').forEach((col, j, colsArr) => {
            // if it's on the edge it can be seen
            if (j === 0 || j === colsArr.length - 1 || i === 0 || i === rowsArr.length - 1) {
                canBeSeenFromEdge.push(col)
            } 
            else {
                // compare current column to neighbors
                const fromLeft = colsArr.slice(0, j)
                const fromRight = colsArr.slice(j+1, colsArr.length)
                const fromTop = rows.slice(0, i).map(rowAgain => rowAgain[j])
                const fromBottom = rows.slice(i+1, rows.length).map(rowAgain => rowAgain[j])

                const leftTreeTaller = fromDirectionTaller(col, fromLeft)
                const rightTreeTaller = fromDirectionTaller(col, fromRight)
                const topTreeTaller = fromDirectionTaller(col, fromTop)
                const bottomTreeTaller = fromDirectionTaller(col, fromBottom)
                
                if (!leftTreeTaller ||
                    !rightTreeTaller ||
                    !topTreeTaller ||
                    !bottomTreeTaller) {
                    canBeSeenFromEdge.push(col)
                }
            }
        })
    })
    return canBeSeenFromEdge.length
}
console.log(treeViewer(rawFile))
console.log(treeViewer(exampleInput))
