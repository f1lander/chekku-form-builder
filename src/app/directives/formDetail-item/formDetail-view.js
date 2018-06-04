(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('formdetailView', FormDetailView);

  /*@ngInject*/
  function FormDetailView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/formDetail-item/formDetail-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: FormDetailViewCtrl,
      controllerAs: 'FormDetailView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {

      //this timeout is placed here in order to make sure that the creator directive of this view is finished its work
      $timeout(function () {
        ctrl.init();
      }, 50);
    }

    return directive;
  }

  /*@ngInject*/
  function FormDetailViewCtrl(Utils) {
    this.Utils = Utils;
  }

  FormDetailViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  
  };


})(angular);
