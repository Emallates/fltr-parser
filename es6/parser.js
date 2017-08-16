import _ from './utils'
/**
 * URL Filter parser like **Amazon url scheme**
 * @example
 * Parser.parse('page:2,status:1|2,price:25.78')
 * //returns { page:2, status:[1,2], price:25.78 }
 * @example
 * Parser.parse('status:1|2@3@a|ab')
 * //returns { status:[1,2,3,'a','ab'] }
 * @todo implement AND operator
 * @todo Define validation schema(s) like page will be always number
 * @todo Implement toString function which will parse fltr Object to string back
 */
/**
 * Parser operators type defination
 * @typedef {Object} ParserOptions
 * @property {Object} [pairOR=|] OR operator for values i.e `2|3|4|5`
 * @property {Object} [pairAND=@] AND operator for values i.e `2|3@4|5`
 * **for now its is working just like options.pairOR**
 * @property {Object} [pairEnd=,] End of single pair i.e `status:2,page:6`
 * @property {Object} [pairEql=:] Equal operator for single key-value pair
 */

class Parser {
  /**
   * Create Parser instance and initialize basic options
   * @param {ParserOptions} options Parser operators
   * @return {Parser}
   */
  constructor(options = {}) {
    this.opts = _.assign({
      pairOR: '|',
      pairAND: '@',
      pairEnd: ',',
      pairEql: ':',
    }, options)
    this.opts.spliters = [this.opts.pairOR, this.opts.pairAND]
    this.opts.pairSpliter = new RegExp(`${this.opts.spliters.map(i => (`\\${i}`)).join('|')}`, 'g')
    // TODO: validate first all `fltr` input
    this.opts.pairTest = new RegExp(`^[a-zA-Z0-9_-]+[${this.opts.pairEql}][a-zA-Z_0-9-_${this.opts.spliters.join('')}]+$`)
  }
  /**
   * Parse fltr String to Object
   * @param  {String} fltr Filter string for parsing
   * @return {Object}      Filter Object after parsing
   * @todo Support AND so that it will be able to
   * parse `a:1,b:3,c:a*1` into `{ a: 1, b:3, c:{a:1}}` ** * is sub equal operator here**
   */
  parse(fltr) {
    let fltrFinal
    switch (_.type(fltr)) {
      case 'String':
        fltrFinal = fltr.split(this.opts.pairEnd)
          .map(pItr => pItr.split(this.opts.pairEql))
          .filter(pItr => (pItr.length === 2))
          .map(pItr => ({
            [pItr[0]]: _.toValue(pItr[1].split(this.opts.pairSpliter).map(_.toType)),
          }))
        return (fltrFinal.length === 0)
          ? {}
          : fltrFinal.reduce((p1, p2) => (_.merge({}, p1, p2)))
      case 'Object':
        return fltr
      default:
        return {}
    }
  }
  /**
   * Parse back fltr Object to String
   * @param  {Object} object Filter object for parsing
   * @return {String}      Parsed string
   */
  toStr(object) {
    return Object.keys(object)
      .map(kItr => (`${kItr}${this.opts.pairEql}${_.joinValue(object[kItr], this.opts)}`))
      .join(this.opts.pairEnd)
  }

}
export default Parser
