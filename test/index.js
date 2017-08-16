/* eslint-disable global-require */

describe('NodeJS Module', () => {
  require('./node')
})

// import should from 'should'
// import Parser from '../es6'

// describe('Testing:Parser', () => {
//   const parser = new Parser()
//   const cases = {
//     'a:1,b:2,c:3': { a: 1, b: 2, c: 3 },
//     'a:1,b:2,c:3|4': { a: 1, b: 2, c: [3, 4] },
//     // 'a:1,b:c:2@d:3': { a: 1, b: 2, c: [3, 4] },
//   }
//   // console.log(parser.toStr({ a: 1, b: 3, c: { a: 1 } }))
//   // console.log(parser.parse('a:1,b:3,c:a*1'))
//   Object.keys(cases).forEach((caseItr) => {
//     it(`Case ${caseItr}`, () => (should(parser.parse(caseItr)).be.deepEqual(cases[caseItr])))
//   })
// })
// // describe('Testing:Utils', () => {
// //   it('should do what...', (done) => {
// //     done()
// //   })
// // })
