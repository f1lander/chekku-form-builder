(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('imageItem', ImageItem);

  function ImageItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/image-item/image-item.html',
      scope: {
        item: '='
      },
      controller: ImageItemCtrl,
      controllerAs: 'Image',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function ImageItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        allowFromGallery: false,
      }
    });
  }

})(angular);
