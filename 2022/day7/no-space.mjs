import { dir } from 'console'
import inputFileHelper from '../utils/input-file-helper.js'

const rawFile = inputFileHelper('day7-input.txt')
const exampleInput = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

const getCommand = (line) => {
    if (line.startsWith('$')) {
        return line.split('$')[1].trimStart()
    }
    return false
}

const cd = (arg) => {
    if (arg === '..') {
        return false
    } else {
        return arg
    }
}

const findNextCommandIndex = (arr) => {
    let result;
    arr.find((line, i) => {
        if (line.startsWith('$')) {
            return result = i
        }
        return false
    })
    return result || 0
}


const sumSpaceOfDirsGreaterThan1000000 = (log) => {
    let command, currentDir, currentParent, parentDir
    const dirHistory = []
    const fileTree = {} 
    const logs = log.split('\n')
    for (let i = 0; i < logs.length; i++) {
        const line = logs[i]
        command = getCommand(line) 
        if (command) {
            switch (command.split(' ')[0]) {
                case 'cd':
                    const [_, arg] = command.split(' ')
                    currentDir = cd(arg) || dirHistory[dirHistory.length - 1] 
                    arg === '..' && dirHistory.pop()
                    !dirHistory.includes(currentDir) && dirHistory.push(currentDir)
                    
                    if (!fileTree[currentDir]) {
                        parentDir = dirHistory.slice(-2)[0]

                        fileTree[currentDir] = {}
                        currentParent = fileTree[currentDir]
                    } 
                    break
                        
                case 'ls':
                    const indexOfNextCmd = findNextCommandIndex(logs.slice(i, logs.length-1)) || logs.length -1
                    const nextXLines = logs.slice(i + 1, i + indexOfNextCmd)
                    const nextXLinesTotal = nextXLines.map(line => {
                        const [first, second] = line.split(' ')
                        if (/\d+/.exec(first)) {
                            return Number(first)
                        }
                        return 0
                    }).reduce((a, c) => a + c)
                    if (currentParent === undefined) {
                        console.log("SOMETHING")
                    }
                    currentParent['dirs'] = nextXLines.filter(x => x.startsWith('dir')).map(y => y.split(' ')[1])
                    currentParent['files'] = nextXLines.filter(x => !x.startsWith('dir'))

                    currentParent[`total`] = nextXLinesTotal
                    break
                default:
                    throw 'Something is not right...'

            }
        }
    }
    const addTotalToParent = (parent) => {
        console.log(parent)
        console.log('before',fileTree[parent])
        if (fileTree[parent]?.dirs?.length) {
            console.log(fileTree[parent].dirs)
            fileTree[parent].dirs.forEach(dir => {
                fileTree[parent].total += fileTree[dir].total
            })
        }
        return fileTree[parent]?.total
    }


    // now we have the full file tree with the total file contents in each dir
    // but we need to add that total to it's parent
    const dirs = Object.keys(fileTree).reverse()
    const mappedDirs = dirs.map(addTotalToParent)
    const t = []
    for (const dir of Object.keys(fileTree)) {
        fileTree[dir].total <= 100000 && t.push(fileTree[dir].total)
        
    }
    const totals = mappedDirs.reverse().filter(x => x <= 100000).reduce((a, c) => a + c)

    console.dir(fileTree, {depth:null})
    console.log(t)
    
    return totals


}


// between 782556 and 1156863
console.log(sumSpaceOfDirsGreaterThan1000000(exampleInput))
console.log(sumSpaceOfDirsGreaterThan1000000(rawFile))

