(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('listItem', ListItem);

  function ListItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/list-item/list-item.html',
      scope: {
        item: '=',        
        dataSource:'='
      },
      controller: ListItem,
      controllerAs: 'List',
      bindToController: true
    };

    return directive;
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
