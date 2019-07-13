(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('signItem', SignItem);

  function SignItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/sign-item/sign-item.html',
      scope: {
        item: '='
      },
      controller: SignItemCtrl,
      controllerAs: 'Sign',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function SignItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {}
    });
  }

})(angular);
