(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('listItem', ListItem);

  function ListItem() {
    var directive = {
      restrict: 'E',
      link:init,
      templateUrl: 'app/directives/list-item/list-item.html',
      scope: {
        item: '=',
        sources:'=' 
      },
      controller: ListItemCtrl,
      controllerAs: 'List',
      bindToController: true
    };

    return directive;
  }

  function init(scope, elem, attrs, ctrl) {

    // console.log("-------------------------ARGS------------------------------");
    // console.log("log Atrrs", attrs, elem, scope, ctrl);
  }

  /*@ngInject*/
  function ListItemCtrl(Utils, $element) {
  this.Element = $element;   
    Utils.extend(this.item, {
      config: {
        type: 'list'
      }
    });
  }

})(angular);
