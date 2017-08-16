/*
 * Dependencies
 */
import _ from './utils'
import Parser from './parser'

class FilterParser {
  /**
   * Create new instance
   * @param  {Object}        options                 Filter parser options
   * @param  {ParserOptions} options.parserOptions   Operators for parsing and back to string
   * @return {FilterParser}
   */
  constructor(options = {}) {
    this.filter = {}
    this.opts = options
    this.parser = new Parser(this.opts.parserOptions)
  }
  /**
   * Set initial filter
   * @param {Object|String} fltr Filter initial value
   */
  setFilter(fltr) {
    this.filter = _.isObject(fltr)
      ? fltr
      : this.parser.parse(fltr)
  }
  /**
   * Add any value in filter
   * @param {String} name  Filter filed key
   * @param {*} value Filter filed value
   * @param {Boolean} [multi=false] Make filter field multi
   * @return {*} It will return final value of filter field
   */
  addValue(name, value, multi) {
    if (_.isEmpty(this.filter[name]) || !multi) {
      this.filter[name] = value
    } else {
      this.filter[name] = (_.isArray(this.filter[name])) ? this.filter[name] : [this.filter[name]]
      this.filter[name].push(value)
    }
    return this.filter[name]
  }
  /**
   * Delete any field from filter
   * @param {String} name  Filter filed key
   * @param {*} [value] Filter filed target value
   * @return {Boolean}
   */
  delValue(name, value) {
    if (_.isEmpty(value) || _.isArray(this.filter[name]) === false) {
      delete this.filter[name]
    } else {
      const ind = this.filter[name].indexOf(value)
      if (ind > -1) {
        this.filter[name].splice(ind, 1)
      }
    }
    return true
  }
  /**
   * Alias for {@link delValue} function
   * @param {String} name  Filter filed key
   * @param {*} [value] Filter filed target value
   * @return {Boolean}
   */
  removeValue(name, value) {
    return this.delValue(name, value)
  }
  /**
   * Convert given/inner filter object to String
   * @param  {Object} object Filter object
   * @return {String}        Filter formated string
   */
  toString(object) {
    return this.parser.toStr(object || this.filter)
  }
  /**
   * Convert any string to filter Object
   * @param  {String} string Filter string
   * @return {Object}        Filter object from given string or inner filter
   */
  toObject(string) {
    if (_.isEmpty(string)) {
      return _.clone(this.filter)
    }
    return this.parser.parse(string)
  }
}
export {
  Parser,
  FilterParser as default,
}
