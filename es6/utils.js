/**
 * Utils class containing different utils functins
 */
class Utils {
  /**
   * Find keys of any object using `Object.keys`
   * @param  {Object} object Object to find keys
   * @return {Array}        Array of givien object keys
   */
  static keys(object) {
    return Object.keys(object)
  }
  /**
   * Assign or merge two objects same like `lodash.extend'
   * it will use native `Object.assign` function
   * @param  {Object}    srcObject     Source Object
   * @param  {...Object} targetObjects Target objects to merge with source object
   * @return {Object}                  Merged object with all values of given objects
   * @todo Fix this function
   */
  static assign() {
    /* eslint-disable prefer-rest-params*/
    return Object.assign.apply({}, arguments)
  }
  static merge() {
    const ret = {}
    for (let i = 0; i < arguments.length; i += 1) {
      if (Utils.isObject(arguments[i])) {
        for (const j in arguments[i]) { //eslint-disable-line
          if (Utils.isEmpty(ret[j])) {
            ret[j] = arguments[i][j]
          } else {
            ret[j] = (Utils.isArray(ret[j])) ? ret[j] : [ret[j]]
            ret[j].push(arguments[i][j])
          }
        }
      }
    }
    return ret
  }
  /**
   * Clone any object
   * @param  {*} obj Object which we want to clone
   * @return {*}     Copy of given object
   */
  static clone(obj) {
    try {
      return JSON.parse(JSON.stringify(obj))
    } catch (exp) {
      return null
    }
  }
  /**
   * Check that given object is Array or not
   * @param  {Any}  object Input object
   * @return {Boolean}        `true` if given object is an Array otherwise `false`
   */
  static isArray(object) {
    return Array.isArray(object)
  }
  /**
   * Get type of any object
   * @param  {Any} object Any kind of javascript object
   * @return {String}        Type of provided object i.e String, Object, Array or Frunction
   * **Result will be `upperCamel` case**
   */
  static type(object) {
    return Object.prototype.toString.call(object).replace(/\[object |\]/g, '')
  }
  /**
   * Check given object is instance of String
   * @param  {Any}  string Input object
   * @return {Boolean}        `true` if String else `false`
   */
  static isString(string) {
    return Utils.type(string) === 'String'
  }
  /**
   * Check given object is instance of Object
   * @param  {Any}  object Input object
   * @return {Boolean}        `true` if Object else `false`
   */
  static isObject(object) {
    return Utils.type(object) === 'Object'
  }
  /**
   * Check given object is empty or not according to type of object
   * @param  {String|Array|Object}  object Input object
   * @return {Boolean}        `true` if empty else `false`
   */
  static isEmpty(object) {
    switch (Utils.type(object)) {
      case 'String':
      case 'Array':
        return object.length === 0
      case 'Object':
        return Utils.keys(object).length === 0
      default:
        return typeof object === 'undefined'
    }
  }
  /**
   * Typecasting of any object
   * @param  {String} string Input object
   * @return {Any} it will send actual value with exact data type
   */
  static toType(string) {
    if (string.match(/^-?\d*(\.\d+)?$/)) {
      return parseFloat(string)
    }
    if (string.match(/^true|false?$/)) {
      return string === 'true'
    }
    return string
  }
  /**
   * Get value ONLY. in case of single element array return value
   * otherwise return given object
   * @param  {Array} array - Input Array
   * @return {Number|Array} - return value otherwise return given object
   */
  static toValue(array) {
    return array.length === 1 ? array[0] : array
  }
  static joinValue(object, oprs) {
    switch (Utils.type(object)) {
      case 'Array':
        return object.join(oprs.pairOR)
      case 'Object':
        return Utils.keys(object).map(kItr => `${kItr}${oprs.pairEql}${Utils.joinValue(object[kItr], oprs)}`).join(oprs.pairEnd)
      default:
        return object.toString()
    }
  }
  /**
   * Genrate Unique id
   * @param  {Array} previous Existing ids array
   * @return {String}         Unique id
   */
  static uuid(previous = []) {
    const ID_LENGTH = 8
    const UNIQUE_RETRIES = 9999
    const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const arr = Array(ID_LENGTH).fill(1)
    let retries = 0
    let id
    while (!id && retries < UNIQUE_RETRIES) {
      id = arr.map(() => ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length)))
      if (previous.indexOf(id) !== -1) {
        id = null
        retries += 1
        previous.push(id)
      }
    }
    return id
  }
}
export default Utils
