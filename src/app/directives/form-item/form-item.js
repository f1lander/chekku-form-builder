(function (angular) {
  'use strict';

  var toCamelCase = function (str) {
    return str
      .replace(/[\s|_|-](.)/g, function ($1) { return $1.toUpperCase(); })
      .replace(/[\s|_|-]/g, '')
      .replace(/\./g, '')
      .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
  };

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
        formulaSources: '=',
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
  function FormItemCtrl($attrs, Utils, CommonData) {
    this.Attrs = $attrs;
    this.Utils = Utils;
    this.CommonData = CommonData;
    this.typeItems = {
      input: { icon: 'input', name: 'INPUT' },
      list: { icon: 'list', name: 'DATA_SRC' },
      formdetail: { icon: 'grid_on', name: 'FORM_DETAIL' },
      radioGroup: { icon: 'radio_button_checked', name: 'RADIO_BUTTON' },
      checkboxes: { icon: 'check_box', name: 'CHECKBOX' },
      textarea: { icon: 'insert_comment', name: 'TEXT_AREA' },
      label: { icon: 'label_outline', name: 'LABEL' },
      image: { icon: 'image', name: 'IMAGE' },
      signature: { icon: 'signature', name: 'SIGNATURE' },
    };
    this.templates = {
      input: '<input-item formula-sources="FormItem.formulaSources" item="FormItem.item"></input-item>',
      list: '<list-item sources="FormItem.sources" item="FormItem.item"><list-item>',
      formdetail: '<formdetail-item forms="FormItem.forms" item="FormItem.item"><formdetail-item>',
      chooseFromList: '<bet-form-choose-from-list item="FormItem.item"></bet-form-choose-from-list>',
      radioGroup: '<radio-button-item item="FormItem.item"></radio-button-item>',
      matrix: '<matrix-item item="FormItem.item"></matrix-item>',
      checkboxes: '<checkboxes-item item="FormItem.item"></checkboxes-item>',
      textarea: '<textarea-item item="FormItem.item"></textarea-item>',
      label: '<label-item item="FormItem.item"></label-item>',
      image: '<image-item item="FormItem.item"></image-item>',
      signature: '<sign-item item="FormItem.item"></sign-item>'
    };
  }

  FormItemCtrl.prototype.init = function () {
    console.log("INIT1");
    this.Utils.extend(this.item, {
      type: this.Attrs.type,
      props: {
        title: '',
        field: '',
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

  FormItemCtrl.prototype.deleteClicked = function () {

    this.onDelete({ item: this.item, index: this.index() });
    var _item = this.item;
    var _index = this.CommonData.items.findIndex(function (item) { return item.props.field === _item.props.field; });
    if (_index > 1) {
      this.CommonData.items.splice(_index, 1);
    }
  };

  FormItemCtrl.prototype.inputValueChange = function () {

    this.item.props.field = toCamelCase(this.item.props.title);
  };

  FormItemCtrl.prototype._getItemTemplate = function (type) {


    var prefix = '' +
      '<div layout="column" style="padding-top: 0px;" class="form-item-container">' +
      '<div flex class="top-form-item" layout="row">' +
      (this.typeItems[type].icon !== 'signature' ?
        '<ng-md-icon flex="10" class="icon-bar" icon="' + this.typeItems[type].icon + '" style="fill:#262626;"></ng-md-icon>'
        :
        '<md-icon style="fill:#262626;" md-svg-src="images/feather/signature-black.svg"></md-icon>') +
      '<h4 flex style="color:#262626;">{{' + '"' + this.typeItems[type].name + '"' + '| translate }}</h4>' +
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
      '<input ng-change="FormItem.inputValueChange(FormItem.item)" ng-model="FormItem.item.props.title"/>' +
      '</md-input-container>';
    var suffix = '' +
      '<md-input-container class="custom-padding-left">' +
      '<md-checkbox ng-model="FormItem.item.config.required">{{"FIELD_REQUIRED" | translate}}</md-checkbox>' +
      '</md-input-container>' +
      '</div>';

    return prefix + (this.templates[type] + '</div>') + suffix;
  };

})(angular);
