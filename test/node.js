import should from 'should'
import Parser from '../es6/filter-parser'


const parser = new Parser()
const samples = [
  // { s: 'a:b', o: { a: 'b' } },
  // { s: 'a:b|c', o: { a: ['b', 'c'] } },
  // { s: 'a:b|c,b:1|2', o: { a: ['b', 'c'], b: [1, 2] } },
  { s: 'a:b,a:1', o: { a: ['b', 1] } },
  // { s: 'a:a,a:b,a:c,b:1|2', o: { a: ['a', 'b', 'c'], b: [1, 2] } },
]

it('toObject', () => {
  samples.forEach((sm) => {
    should(sm.o).be.deepEqual(parser.toObject(sm.s))
  })
})
