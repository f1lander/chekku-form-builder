(function (angular) {
  'use strict';

  angular
    .module('angularMaterialFormBuilder')
    .service('CommonData', CommonData);

  function CommonData() {
    return {
      formulaSourcesFlag: false,
      formulaSources:[
        {
          'name': '*',
          'label': 'MULTIPLICATION',
          'field': '*'
        },
        {
          'name': '-',
          'label': 'SUBTRACTION',
          'field': '-'
        },
        {
          'name': '/',
          'label': 'DIFFERENCE',
          'field': '/'
        },
        {
          'name': '+',
          'label': 'SUM',
          'field': '+'
        },
        {
          'name': '(',
          'label': 'BRACKET',
          'field': '('
        },
        {
          'name': ')',
          'label': 'BRACKET',
          'field': ')'
        }
      ],  
      items: [],
    };
  }

  angular
    .module('angularMaterialFormBuilder')
    .controller('MainController', MainController);

  var vm;
  /** @ngInject */
  function MainController() {
    vm = this;
    vm.form = {
      items: []
    };

  }

  MainController.prototype.addItem = function (type) {
    this.form.items.push({
      type: type
    });
  };

  MainController.prototype.delete = function (item, index) {
    vm.form.items.splice(index, 1);
  };

  MainController.prototype.up = function (item, index) {
    if (index !== 0) {
      var prevItem = vm.form.items[index - 1];
      vm.form.items[index] = prevItem;
      vm.form.items[index - 1] = item;
    }
  };

  MainController.prototype.down = function (item, index) {
    if (index !== vm.form.items.length - 1) {
      var nextItem = vm.form.items[index + 1];
      vm.form.items[index] = nextItem;
      vm.form.items[index + 1] = item;
    }
  };

})(angular);
