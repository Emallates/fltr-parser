/* global angular*/
const FilterParser = require('./es6/filter-parser')

angular.module('ng-fltr-parser', [])
// .provider()
  .service('fltr-parser', [() => {
    const factory = {
      getFilter: optoins => new FilterParser(optoins),
    }
    return factory
  }])
