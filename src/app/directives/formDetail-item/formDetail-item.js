(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('formdetailItem', FormDetailItem);

  function FormDetailItem() {
    var directive = {
      restrict: 'E',
      link:init,
      templateUrl: 'app/directives/formDetail-item/formDetail-item.html',
      scope: {
        item: '=',
        forms:'=' 
      },
      controller: FormDetailItemCtrl,
      controllerAs: 'FormDetail',
      bindToController: true
    };

    return directive;
  }

  function init(scope, elem, attrs, ctrl) {
    console.log("log Atrrs", attrs, elem, scope, ctrl);
  }

  /*@ngInject*/
  function FormDetailItemCtrl(Utils, $element) {
  this.Element = $element;   
    Utils.extend(this.item, {
      config: {
        type: 'formDetail'
      }
    });
  }

})(angular);
