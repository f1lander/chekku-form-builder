(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('listView', ListView);

  /*@ngInject*/
  function ListView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/list-item/list-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: ListViewCtrl,
      controllerAs: 'ListView',
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
  function ListViewCtrl(Utils) {
    this.Utils = Utils;
  }

  ListViewCtrl.prototype.valueParse = function(item) {
    return item.value || (item.dataSrcSelected ? item.dataSrcSelected.title : "");
  };

  ListViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  
  };


})(angular);
