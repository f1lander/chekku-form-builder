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
        sources: '=',
        forms: '=',
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
    this.typeItems = {
      input: { icon: 'input', name: 'INPUT' },
      list: { icon: 'list', name: 'LIST' },
      formdetail: { icon: 'grid_on', name: 'FORM_DETAIL' },
      radioGroup: { icon: 'radio_button_checked', name: 'RADIO_BUTTON' },
      checkboxes: { icon: 'check_box', name: 'CHECKBOX' },
      textarea: { icon: 'insert_comment', name: 'TEXT_AREA' },
      label: { icon: 'label_outline', name: 'LABEL' },
    };
    this.templates = {
      input: '<input-item item="FormItem.item"></input-item>',
      list: '<list-item sources="FormItem.sources" item="FormItem.item"><list-item>',
      formdetail: '<formdetail-item forms="FormItem.forms" item="FormItem.item"><formdetail-item>',
      chooseFromList: '<bet-form-choose-from-list item="FormItem.item"></bet-form-choose-from-list>',
      radioGroup: '<radio-button-item item="FormItem.item"></radio-button-item>',
      matrix: '<matrix-item item="FormItem.item"></matrix-item>',
      checkboxes: '<checkboxes-item item="FormItem.item"></checkboxes-item>',
      textarea: '<textarea-item item="FormItem.item"></textarea-item>',
      label: '<label-item item="FormItem.item"></label-item>'
    };
  }

  FormItemCtrl.prototype.init = function () {
    console.log("This is this", this);
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

  FormItemCtrl.prototype.deleteClicked = function () {

    this.onDelete({ item: this.item, index: this.index() });
  };

  FormItemCtrl.prototype._getItemTemplate = function (type) {
    var prefix = '' +
      '<div layout="column" style="padding-top: 0px;" class="form-item-container">' +
      '<div flex style="background-color:#CFD8DC; padding-left: 5%; border-radius: 4px;" layout="row">' +
      '<ng-md-icon flex="10" class="icon-bar" icon="'+ this.typeItems[type].icon  +'" style="fill:#262626;"></ng-md-icon>' +
      '<h4 flex style="color:#262626;">{{' +'"'+ this.typeItems[type].name +'"'+ '| translate }}</h4>' +
      '<div flex class="form-item-actions">' +
      '<md-button class="md-button" ng-if="FormItem.Attrs.onDelete" ng-click="FormItem.deleteClicked()"> ' +
      '<ng-md-icon class="icon-bar" icon="delete" style="fill:#262626"></ng-md-icon>' +
      '</md-button>' +
      '<md-button class="md-button" ng-if="FormItem.Attrs.onUp" ng-click="FormItem.onUp({item: FormItem.item, index: FormItem.index()})"> ' +
      ' <ng-md-icon class="icon-bar" icon="arrow_drop_up" style="fill:#262626"></ng-md-icon>' +
      '</md-button>' +
      '<md-button class="md-button" ng-if="FormItem.Attrs.onDown" ng-click="FormItem.onDown({item: FormItem.item, index: FormItem.index()})"> ' +
      '<ng-md-icon class="icon-bar" icon="arrow_drop_down" style="fill:#262626"></ng-md-icon>' +
      '</md-button>' +
      '</div>' +
      '</div>' +
      '<div flex layout="column" layout-padding>' +
      '<md-input-container class="md-block" flex style="margin-bottom: 0px;">' +
      '<label>{{ "FIELD_TITLE" | translate }}</label>' +
      '<input ng-model="FormItem.item.props.title"/>' +
      '</md-input-container>';
    // var suffix = '' +
    //   '<md-input-container>' +
    //     '<md-checkbox ng-model="FormItem.item.config.required">Required field</md-checkbox>' +
    //   '</md-input-container>' +
    // '</div>';

    return prefix + (this.templates[type] + '</div>');
  };

})(angular);
