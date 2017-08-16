import Parser from '../es6/filter-parser'


const parser = new Parser()



parser.addValue('user', 'nomi')
parser.addValue('status', 1, true)
parser.addValue('status', 2, true)
parser.addValue('page', 5)

const str = 'user:nomi,status:1|2,page:5|6,5'

console.log(parser.toObject(str), parser.toObject())
