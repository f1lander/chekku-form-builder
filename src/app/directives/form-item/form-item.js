(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('formItem', FormItem);

  /** @ngInject */
  function FormItem($compile) {
    var directive = {
      restrict: 'E',
      link: linker,
      scope: {
        item: '=',
        dataSource:'=',
        onDelete: '&',
        onUp: '&',
        onDown: '&',
        index: '&'        
      },
      controller: FormItemCtrl,
      controllerAs: 'FormItem',
      bindToController: true
    };

    function linker(scope, elem, attrs, ctrl) {
      var template = ctrl._getItemTemplate(attrs.type);
      var el = $compile(template)(scope);
      elem.append(el);

      ctrl.init();
    }

    return directive;
  }

  /*@ngInject*/
  function FormItemCtrl($attrs, Utils) {
    this.Attrs = $attrs;
    this.Utils = Utils;
    this.templates = {
      input: '<input-item item="FormItem.item"></input-item>',
      list: '<list-item dataSource="FormItem.dataSrc" item="FormItem.item"><list-item>',
      chooseFromList: '<bet-form-choose-from-list item="FormItem.item"></bet-form-choose-from-list>',
      radioGroup: '<radio-button-item item="FormItem.item"></radio-button-item>',
      matrix: '<matrix-item item="FormItem.item"></matrix-item>',
      checkboxes: '<checkboxes-item item="FormItem.item"></checkboxes-item>',
      textarea: '<textarea-item item="FormItem.item"></textarea-item>',
      label: '<label-item item="FormItem.item"></label-item>'      
    };
  }

  FormItemCtrl.prototype.init = function () {
    this.Utils.extend(this.item, {
      type: this.Attrs.type,
      props: {
        title: '',
        helpText: ''
      },
      config: {
        required: false
      }
    });
  };

  FormItemCtrl.prototype.deleteClicked = function() {
    this.onDelete({item: this.item, index: this.index()});
  };

  FormItemCtrl.prototype._getItemTemplate = function (type) {
    var prefix = '' +
      '<div layout-padding layout="column" class="form-item-container">' +
        '<div flex class="form-item-actions">' +
          '<md-button class="md-button" ng-if="FormItem.Attrs.onDelete" ng-click="FormItem.deleteClicked()"> ' +
            '<ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon>' +
          '</md-button>' +
          // '<md-button class="md-button" ng-if="FormItem.Attrs.onUp" ng-click="FormItem.onUp({item: FormItem.item, index: FormItem.index()})"> ' +
          //   ' <ng-md-icon class="icon-bar" icon="arrow_drop_up" style="fill:#4D4D4D"></ng-md-icon>' + 
          // '</md-button>' +
          // '<md-button class="md-button" ng-if="FormItem.Attrs.onDown" ng-click="FormItem.onDown({item: FormItem.item, index: FormItem.index()})"> ' +
          //   '<ng-md-icon class="icon-bar" icon="arrow_drop_down" style="fill:#4D4D4D"></ng-md-icon>' +
          // '</md-button>' +
        '</div>' +
        '<md-input-container flex>' +
          '<label>{{ "FIELD_TITLE" | translate }}</label>' +
          '<input ng-model="FormItem.item.props.title"/>' +
        '</md-input-container></div>';

    // var suffix = '' +
    //   '<md-input-container>' +
    //     '<md-checkbox ng-model="FormItem.item.config.required">Required field</md-checkbox>' +
    //   '</md-input-container>' +
    // '</div>';

    return prefix + this.templates[type];
  };

})(angular);
