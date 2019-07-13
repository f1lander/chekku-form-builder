(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('imageView', ImageView);

  /*@ngInject*/
  function ImageView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/image-item/image-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: ImageViewCtrl,
      controllerAs: 'ImageView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {

      //this timeout is placed here in order to make sure that the creator directive of this view is finished its work
      $timeout(function() {
        ctrl.init();
      }, 50);
    }

    return directive;
  }

  /*@ngInject*/
  function ImageViewCtrl(Utils) {
    this.Utils = Utils;
  }

  ImageViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);
