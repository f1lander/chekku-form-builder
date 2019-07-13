(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('signView', SignView);

  /*@ngInject*/
  function SignView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/sign-item/sign-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: SignViewCtrl,
      controllerAs: 'SignView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {
      

      var file = new Blob([ctrl.formItem.value], { type: 'image/svg+xml' });
      
      scope.blobFile =URL.createObjectURL(file);
      //this timeout is placed here in order to make sure that the creator directive of this view is finished its work
      $timeout(function () {
        ctrl.init();
      }, 50);
    }

    return directive;
  }

  /*@ngInject*/
  function SignViewCtrl(Utils) {
    this.Utils = Utils;
   
  }
  
  SignViewCtrl.prototype.init = function () {
    

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);
