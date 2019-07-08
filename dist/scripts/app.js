(function (angular) {
  'use strict';

  angular
    .module('angularMaterialFormBuilder', ['ngMaterial', 'angular-sortable-view', 'ngMessages']);

})(angular);

(function (angular) {
  'use strict';

  TextareaView.$inject = ["$timeout"];
  TextareaViewCtrl.$inject = ["Utils"];
  angular.module('angularMaterialFormBuilder')
    .directive('textareaView', TextareaView);

  /*@ngInject*/
  function TextareaView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/textarea-item/textarea-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: TextareaViewCtrl,
      controllerAs: 'TextareaView',
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
  function TextareaViewCtrl(Utils) {
    this.Utils = Utils;
  }

  TextareaViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);

(function (angular) {
  'use strict';

  TextareaItemCtrl.$inject = ["Utils", "$element"];
  angular.module('angularMaterialFormBuilder')
    .directive('textareaItem', textareaItem);

  function textareaItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/textarea-item/textarea-item.html',
      scope: {
        item: '='
      },
      controller: TextareaItemCtrl,
      controllerAs: 'Textarea',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function TextareaItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {}
    });
  }

})(angular);

(function (angular) {
    'use strict';

    MatrixView.$inject = ["$timeout"];
    MatrixViewCtrl.$inject = ["$scope", "Utils"];
    angular.module('angularMaterialFormBuilder')
      .directive('matrixView', MatrixView);

    /*@ngInject*/
    function MatrixView($timeout) {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/directives/matrix-item/matrix-view.html',
        scope: {
          formItem: '=',
          isPreview: '&',
          form: '='
        },
        controller: MatrixViewCtrl,
        controllerAs: 'MatrixView',
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
    function MatrixViewCtrl($scope, Utils) {
      this.Scope = $scope;
      this.Utils = Utils;
      this.isValid = true;
    }

    MatrixViewCtrl.prototype.init = function () {
      this.Utils.extend(this.formItem, {
        config: {
          rows: [],
          columns: []
        }
      });

      this._updateValidity();
      if (this.isPreview()) {
        this._enableWatchers();
      }
    };

    MatrixViewCtrl.prototype._updateValidity = function () {
      var valid = true;
      if (this.formItem.config.required) {
        for (var i = 0; i < this.formItem.config.rows.length; i++) {
          if (!this.formItem.config.rows[i].hasOwnProperty('selected')) {
            valid = false;
            break;
          }
        }
      }

      this.isValid = valid;
      this.form.$setValidity('required', this.isValid);
    };

    MatrixViewCtrl.prototype._enableWatchers = function () {
      this.Scope.$watchGroup(['MatrixView.formItem.config.required',
                         'MatrixView.formItem.config.rows.length'], function (newVal) {
        if (newVal !== undefined) {
          this._updateValidity();
        }
      }.bind(this));
    };

  })
(angular);

(function (angular) {
  'use strict';

  MatrixItemCtrl.$inject = ["Utils", "$document"];
  angular.module('angularMaterialFormBuilder')
    .directive('matrixItem', matrixItem);

  function matrixItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/matrix-item/matrix-item.html',
      scope: {
        item: '='
      },
      controller: MatrixItemCtrl,
      controllerAs: 'Matrix',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function MatrixItemCtrl(Utils, $document) {
    this.RowContainer = angular.element($document[0].querySelector('.rowContainer'));
    this.ColumnContainer = angular.element($document[0].querySelector('.columnContainer'));

    Utils.extend(this.item, {
      config: {
        rows: [{
          value: ''
        }],
        columns: [{
          value: ''
        }]
      }
    });
  }

  MatrixItemCtrl.prototype.deleteRow = function(index) {
    this.item.config.rows.splice(index, 1);
  };

  MatrixItemCtrl.prototype.addRow = function() {
    this.item.config.rows.push({
      value: ''
    });

    setTimeout(function() {
      var options = this.RowContainer.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

  MatrixItemCtrl.prototype.deleteColumn = function(index) {
    this.item.config.columns.splice(index, 1);
  };

  MatrixItemCtrl.prototype.addColumn = function() {
    this.item.config.columns.push({
      value: ''
    });

    setTimeout(function() {
      var options = this.ColumnContainer.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

})(angular);

(function (angular) {
  'use strict';

  RadioButtonView.$inject = ["$timeout"];
  RadioButtonViewCtrl.$inject = ["Utils"];
  angular.module('angularMaterialFormBuilder')
    .directive('radioButtonView', RadioButtonView);

  /*@ngInject*/
  function RadioButtonView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/radio-button-item/radio-button-view.html',
      scope: {
        formItem: '=',
        isPreview: '&',
        form: '='
      },
      controller: RadioButtonViewCtrl,
      controllerAs: 'RadioButtonView',
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
  function RadioButtonViewCtrl(Utils) {
    this.Utils = Utils;
  }

  RadioButtonViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {},
      options: []
    });
  };


})(angular);

(function (angular) {
  'use strict';

  RadioButtonCtrl.$inject = ["Utils", "$element"];
  angular.module('angularMaterialFormBuilder')
    .directive('radioButtonItem', RadioButton);

  function RadioButton() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/radio-button-item/radio-button-item.html',
      scope: {
        item: '='
      },
      controller: RadioButtonCtrl,
      controllerAs: 'RadioButton',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function RadioButtonCtrl(Utils, $element) {
    this.Element = $element;
    Utils.extend(this.item, {
      config: {},
      options: [{
        value: ''
      }]
    });
  }

  RadioButtonCtrl.prototype.deleteOption = function (index) {
    this.item.options.splice(index, 1);
  };

  RadioButtonCtrl.prototype.addOption = function () {
    this.item.options.push({
      value: ''
    });

    setTimeout(function() {
      var options = this.Element.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

})(angular);

(function (angular) {
  'use strict';

  ListView.$inject = ["$timeout"];
  ListViewCtrl.$inject = ["Utils"];
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

  ListViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  
  };


})(angular);

(function (angular) {
  'use strict';

  ListItemCtrl.$inject = ["Utils", "$element"];
  angular.module('angularMaterialFormBuilder')
    .directive('listItem', ListItem);

  function ListItem() {
    var directive = {
      restrict: 'E',
      link:init,
      templateUrl: 'app/directives/list-item/list-item.html',
      scope: {
        item: '=',
        sources:'=' 
      },
      controller: ListItem,
      controllerAs: 'List',
      bindToController: true
    };

    return directive;
  }

  function init(scope, elem, attrs, ctrl) {
    // console.log("-------------------------ARGS------------------------------");
    // console.log("log Atrrs", attrs, elem, scope, ctrl);
  }

  /*@ngInject*/
  function ListItemCtrl(Utils, $element) {
  this.Element = $element;   
    Utils.extend(this.item, {
      config: {
        type: 'list'
      }
    });
  }

})(angular);

(function (angular) {
  'use strict';

  InputView.$inject = ["$timeout"];
  InputViewCtrl.$inject = ["Utils"];
  angular.module('angularMaterialFormBuilder')
    .directive('inputView', InputView);

  /*@ngInject*/
  function InputView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/input-item/input-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: InputViewCtrl,
      controllerAs: 'InputView',
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
  function InputViewCtrl(Utils) {
    this.Utils = Utils;
  }

  InputViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });

    if (this.formItem.config.type === "time" || this.formItem.config.type === "date") {
      this.formItem.value = new Date(this.formItem.value);
    }
  };


})(angular);

(function (angular) {
  'use strict';

  InputItemCtrl.$inject = ["Utils", "$element"];
  angular.module('angularMaterialFormBuilder')
    .directive('inputItem', InputItem);

  function InputItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/input-item/input-item.html',
      scope: {
        item: '='
      },
      controller: InputItem,
      controllerAs: 'Input',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function InputItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {
        type: 'text'
      }
    });
  }

})(angular);

(function (angular) {
  'use strict';

  LabelView.$inject = ["$timeout"];
  LabelViewCtrl.$inject = ["Utils"];
  angular.module('angularMaterialFormBuilder')
    .directive('labelView', LabelView);

  /*@ngInject*/
  function LabelView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/label-item/label-view.html',
      scope: {
        formItem: '=',
        form: '='
      },
      controller: LabelViewCtrl,
      controllerAs: 'LabelView',
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
  function LabelViewCtrl(Utils) {
    this.Utils = Utils;
  }

  LabelViewCtrl.prototype.init = function () {

    this.Utils.extend(this.formItem, {
      config: {}
    });
  };


})(angular);

(function (angular) {
  'use strict';

  LabelItemCtrl.$inject = ["Utils", "$element"];
  angular.module('angularMaterialFormBuilder')
    .directive('labelItem', labelItem);

  function labelItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/label-item/label-item.html',
      scope: {
        item: '='
      },
      controller: LabelItemCtrl,
      controllerAs: 'Label',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function LabelItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {}
    });
  }

})(angular);

(function (angular) {
  'use strict';

  FormDetailView.$inject = ["$timeout"];
  FormDetailViewCtrl.$inject = ["Utils"];
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

(function (angular) {
  'use strict';

  FormDetailItemCtrl.$inject = ["Utils", "$element"];
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

(function (angular) {
  'use strict';

  FormViewCtrl.$inject = ["$scope"];
  angular.module('angularMaterialFormBuilder')
    .directive('formView', FormView);

  function FormView() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/form-view/form-view.html',
      scope: {
        form: '='
      },
      controller: FormViewCtrl,
      controllerAs: 'FormView',
      bindToController: true,
      link: linker
    };

    function linker(scope, elem, attrs, ctrl) {
      ctrl.init();
    }

    return directive;
  }

  /*@ngInject*/
  function FormViewCtrl($scope) {
    this.Scope = $scope;
  }

  FormViewCtrl.prototype.init = function () {
  };

})(angular);

(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .directive('formItemsContainer', FormItemsContainer);

  /** @ngInject */
  function FormItemsContainer() {
    var directive = {
      restrict: 'E',
      scope: {
        form: '='
      },
      controller: FormItemsContainerCtrl,
      controllerAs: 'container',
      bindToController: true,
      templateUrl: 'app/directives/form-items-container/form-items-container.html'
    };

    return directive;
  }

  var vm;

  /*@ngInject*/
  function FormItemsContainerCtrl() {
    vm = this;
  }

  FormItemsContainerCtrl.prototype.delete = function(item, index) {
    vm.form.items.splice(index, 1);
  };

  FormItemsContainerCtrl.prototype.up = function(item, index) {
    if(index !== 0) {
      var prevItem = vm.form.items[index - 1];
      vm.form.items[index] = prevItem;
      vm.form.items[index - 1] = item;
    }
  };

  FormItemsContainerCtrl.prototype.down = function(item, index) {
    if(index !== vm.form.items.length - 1) {
      var nextItem = vm.form.items[index + 1];
      vm.form.items[index] = nextItem;
      vm.form.items[index + 1] = item;
    }
  };

})(angular);

(function (angular) {
  'use strict';

  CheckboxesView.$inject = ["$timeout"];
  CheckboxesViewCtrl.$inject = ["$scope", "Utils"];
  angular.module('angularMaterialFormBuilder')
    .directive('checkboxesView', CheckboxesView);

  /*@ngInject*/
  function CheckboxesView($timeout) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/checkboxes-item/checkboxes-view.html',
      scope: {
        formItem: '=',
        isPreview: '&',
        form: '='
      },
      controller: CheckboxesViewCtrl,
      controllerAs: 'CheckboxesView',
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
  function CheckboxesViewCtrl($scope, Utils) {
    this.Scope = $scope;
    this.Utils = Utils;
  }

  CheckboxesViewCtrl.prototype.init = function () {
    this.Utils.extend(this.formItem, {
      config: {},
      options: []
    });

    this.selectedOptions = this._getSelectedOptions();
    this.disableOptions = false;

    this.isValid = true;
    this._updateView();
    this._updateValidity();
    if (this.isPreview()) {
      this._enableWatchers();
    }
  };

  CheckboxesViewCtrl.prototype.toggleSelectedOption = function () {
    this.selectedOptions = this._getSelectedOptions();
    this._updateView();
    this._updateValidity();
  };

  CheckboxesViewCtrl.prototype._getSelectedOptions = function () {
    return this.formItem.options.filter(function (option) {
      return option.selected;
    });
  };

  CheckboxesViewCtrl.prototype._updateView = function () {
    if (!this.formItem.config.maxSelections) {
      this.disableOptions = false;
    } else if (this.selectedOptions.length === this.formItem.config.maxSelections) {
      this.disableOptions = true;
    } else {
      this.disableOptions = false;
    }
  };

  CheckboxesViewCtrl.prototype._updateValidity = function () {
    if (this.formItem.config.required) {
      this.isValid = this.selectedOptions.length > 0;
    } else {
      this.isValid = true;
    }

    this.form.$setValidity('minSelections', this.isValid);
  };

  CheckboxesViewCtrl.prototype._enableWatchers = function () {
    this.Scope.$watch('CheckboxesView.formItem.config.required', function (newVal) {
      if (newVal !== undefined) {
        this._updateView();
        this._updateValidity();
      }
    }.bind(this));
  };

})(angular);

(function (angular) {
  'use strict';

  CheckboxesItemCtrl.$inject = ["Utils", "$element"];
  angular.module('angularMaterialFormBuilder')
    .directive('checkboxesItem', CheckboxesItem);

  function CheckboxesItem() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/directives/checkboxes-item/checkboxes-item.html',
      scope: {
        item: '='
      },
      controller: CheckboxesItemCtrl,
      controllerAs: 'Checkboxes',
      bindToController: true
    };

    return directive;
  }

  /*@ngInject*/
  function CheckboxesItemCtrl(Utils, $element) {
    this.Element = $element;

    Utils.extend(this.item, {
      config: {},
      options: [{
        value: '',
        selected: false
      }]
    });
  }

  CheckboxesItemCtrl.prototype.deleteOption = function (index) {
    this.item.options.splice(index, 1);
  };

  CheckboxesItemCtrl.prototype.addOption = function () {
    this.item.options.push({
      value: '',
      selected: false
    });

    setTimeout(function() {
      var options = this.Element.find('input');
      var addedOption = options[options.length - 1];
      addedOption.focus();
    }.bind(this), 0);
  };

})(angular);

(function (angular) {
  'use strict';

  FormItem.$inject = ["$compile"];
  FormItemCtrl.$inject = ["$attrs", "Utils"];
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

(function (angular) {
  'use strict';

  angular.module('angularMaterialFormBuilder')
    .service('Utils', Utils);

  function Utils() {}

  Utils.prototype.extend = function(dest, src) {
    Object.keys(src).forEach(function(key) {
      if(!dest.hasOwnProperty(key)) {
        dest[key] = src[key];
      } else if(typeof src[key] === 'object') {
        this.extend(dest[key], src[key]);
      }
    }.bind(this));

    return dest;
  };

})(angular);

(function (angular) {
  'use strict';

  angular
    .module('angularMaterialFormBuilder')
    .controller('MainController', MainController);

  var vm;
  /** @ngInject */
  function MainController() {
    vm = this;
    vm.form = {
      items: []
    };
  }

  MainController.prototype.addItem = function (type) {
    this.form.items.push({
      type: type
    });
  };

  MainController.prototype.delete = function(item, index) {
    vm.form.items.splice(index, 1);
  };

  MainController.prototype.up = function(item, index) {
    if(index !== 0) {
      var prevItem = vm.form.items[index - 1];
      vm.form.items[index] = prevItem;
      vm.form.items[index - 1] = item;
    }
  };

  MainController.prototype.down = function(item, index) {
    if(index !== vm.form.items.length - 1) {
      var nextItem = vm.form.items[index + 1];
      vm.form.items[index] = nextItem;
      vm.form.items[index + 1] = item;
    }
  };

})(angular);

angular.module('angularMaterialFormBuilder').run(['$templateCache', function($templateCache) {$templateCache.put('app/directives/checkboxes-item/checkboxes-item.html','<div flex="" class="sortable-container" layout="column" sv-root="" sv-part="Checkboxes.item.options"><md-switch ng-model="Checkboxes.item.config.direction" ng-true-value="\'horizontal\'" ng-false-value="\'vertical\'">{{\'LAYOUT_DIRECTION\' | translate}} ({{Checkboxes.item.config.direction == \'horizontal\' ? \'Horizontal\' : \'Vertical\'}})</md-switch><div class="option-item" layout="row" ng-repeat="option in Checkboxes.item.options track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container><label>{{\'OPTION\' | translate}} {{$index + 1}}</label> <input ng-model="option.value"></md-input-container><md-button class="md-button" ng-click="Checkboxes.deleteOption($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" ng-click="Checkboxes.addOption()"><ng-md-icon class="icon-bar" icon="add" style="fill:#4D4D4D"></ng-md-icon></md-button></div></div>');
$templateCache.put('app/directives/checkboxes-item/checkboxes-view.html','<md-input-container style="width: 100%;"><div layout="{{CheckboxesView.formItem.config.direction == \'horizontal\' ? \'column\' : \'row\'}}"><md-checkbox disabled="" style="color: black !important;" ng-repeat="option in CheckboxesView.formItem.options track by $index" ng-model="option.selected" ng-change="CheckboxesView.toggleSelectedOption(option)" ng-disabled="CheckboxesView.disableOptions && !option.selected" aria-label="...">{{option.value}}</md-checkbox></div><div ng-messages="CheckboxesView.form.$error"><div ng-message="minSelections">{{\'MUST_SELECT\' | translate}} {{CheckboxesView.formItem.maxSelections || 1}} {{ \'ITEMS\' | translate }}</div></div></md-input-container>');
$templateCache.put('app/directives/form-items-container/form-items-container.html','<div><form-item ng-repeat="item in container.form.items track by $index" type="{{item.type}}" item="item" index="$index" on-delete="container.delete(item, index)" on-up="container.up(item, index)" on-down="container.down(item, index)"></form-item></div>');
$templateCache.put('app/directives/form-view/form-view.html','<div class="formItem" ng-repeat="formItem in FormView.form.items track by $index" ng-switch="formItem.type" layout="column"><ng-form name="formItemForm"><div layout="column"><div class="formItem-title"><h5 ng-class="{\'md-title\': formItem.type === \'label\', \'md-subhead\': formItem.type !== \'label\' }">{{ formItem.type !== \'label\' ? (FormView.form.items.indexOf(formItem) + 1) + \'.\': \'\' }} {{ formItem.props.title}}</h5></div><checkboxes-view flex="100" form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="checkboxes"></checkboxes-view><radio-button-view flex="100" form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="radioGroup"></radio-button-view><input-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="input"></input-view><textarea-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="textarea"></textarea-view><label-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="label"></label-view><list-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="list"></list-view><formdetail-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="formdetail"><matrix-view flex="100" form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="matrix"></matrix-view></formdetail-view></div></ng-form></div>');
$templateCache.put('app/directives/formDetail-item/formDetail-item.html','<md-input-container style="width: 100%" flex=""><label>{{ \'FORM_DETAIL\' | translate }}</label><md-select ng-model="FormDetail.item.formDetailSelected"><md-option><em>{{\'NONE\' | translate}}</em></md-option><md-option ng-repeat="formDetail in List.forms" ng-value="formDetail">{{formDetail.description}}</md-option></md-select></md-input-container>');
$templateCache.put('app/directives/formDetail-item/formDetail-view.html','');
$templateCache.put('app/directives/input-item/input-item.html','<md-input-container style="width: 100%" flex=""><label>{{ \'TYPE\' | translate }}</label><md-select ng-model="Input.item.config.type"><md-option value="text">{{ \'TEXT\' | translate }}</md-option><md-option value="number">{{ \'NUMBER\' | translate }}</md-option><md-option value="date">{{ \'DATE\' | translate }}</md-option><md-option value="time">{{ \'TIME\' | translate }}</md-option></md-select></md-input-container>');
$templateCache.put('app/directives/input-item/input-view.html','<md-input-container style="width: 100%;"><input ng-readonly="true" ng-model="InputView.formItem.value" type="{{InputView.formItem.config.type}}" placeholder="{{InputView.formItem.config.placeholder}}" ng-required="InputView.formItem.config.required"><div ng-messages="InputView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate}}</div></div></md-input-container>');
$templateCache.put('app/directives/label-item/label-item.html','');
$templateCache.put('app/directives/label-item/label-view.html','<md-input-container style="width: 100%;"><div ng-messages="LabelView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | tanslate }]</div></div></md-input-container>');
$templateCache.put('app/directives/matrix-item/matrix-item.html','<div class="sortable-container columnContainer" layout="column" sv-root="" sv-part="Matrix.item.config.columns"><div class="option-item" layout="row" ng-repeat="column in Matrix.item.config.columns track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container class="input-container"><label>{{ \'COLUMN\' | translate }} {{$index + 1}}</label> <input ng-model="column.value"></md-input-container><md-button class="md-button" md-no-ink="" aria-label="delete column item" ng-click="Matrix.deleteColumn($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon><md-tooltip md-autohide="true">{{\'DELETE\' | translate}}</md-tooltip></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" md-no-ink="" aria-label="add option item" ng-click="Matrix.addColumn()">Add Column</md-button></div></div><div class="sortable-container rowContainer" layout="column" sv-root="" sv-part="Matrix.item.config.rows"><div class="option-item" layout="row" ng-repeat="row in Matrix.item.config.rows track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder row item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container class="input-container"><label>{{\'ROW\' | translate}} {{$index + 1}}</label> <input ng-model="row.value"></md-input-container><md-button class="md-button" md-no-ink="" aria-label="delete row item" ng-click="Matrix.deleteRow($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon><md-tooltip md-autohide="true">{{\'DELETE\' | translate}}</md-tooltip></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" md-no-ink="" aria-label="add row item" ng-click="Matrix.addRow()">{{\'ADD_ROW\' | translate}}</md-button></div></div>');
$templateCache.put('app/directives/matrix-item/matrix-view.html','<md-input-container style="width: 100%;" class="matrix-container" layout="column"><div class="matrix"><div class="matrix-row" flex="" layout="row"><span class="matrix-cell" flex="20"></span> <span class="matrix-cell matrix-cell-header" flex="" ng-repeat="column in MatrixView.formItem.config.columns track by $index">{{column.value}}</span></div><div class="matrix-row" ng-repeat="row in MatrixView.formItem.config.rows track by $index" layout="row"><span class="matrix-cell" flex="20" layout="column" layout-align="center">{{row.value}}</span><md-radio-group ng-model="row.selected" ng-change="MatrixView._updateValidity()" flex="" layout="row"><span class="matrix-cell radio-button-cell" flex="" ng-repeat="column in MatrixView.formItem.config.columns track by $index"><md-radio-button value="{{column.value}}" aria-label="..."></md-radio-button></span></md-radio-group></div></div><div ng-messages="MatrixView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate }}</div></div></md-input-container>');
$templateCache.put('app/directives/list-item/list-item.html','<md-input-container style="width: 100%" flex=""><label>{{ \'DATA_SRC\' | translate }}</label><md-select ng-model="List.item.dataSrcSelected" ng-model-options="{trackBy: \'$value._id\'}"><md-option><em>{{\'NONE\' | translate}}</em></md-option><md-option ng-repeat="dtSrc in List.sources" ng-value="dtSrc">{{dtSrc.title}}</md-option></md-select></md-input-container>');
$templateCache.put('app/directives/list-item/list-view.html','<md-input-container style="width: 100%;"><input ng-readonly="true" ng-model="ListView.formItem.value" placeholder="{{ListView.formItem.dataSrcSelected.title}}"><div ng-messages="ListView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate}}</div></div></md-input-container>');
$templateCache.put('app/directives/textarea-item/textarea-item.html','<md-input-container style="width: 100%" flex="" class="input-container"><label>{{ \'PLACEHOLDER\' | translate}}</label> <input type="text" ng-model="Textarea.item.config.placeholder"></md-input-container>');
$templateCache.put('app/directives/textarea-item/textarea-view.html','<md-input-container style="width: 100%;"><textarea ng-readonly="true" ng-model="TextareaView.formItem.value" placeholder="{{TextareaView.formItem.config.placeholder}}" ng-required="TextareaView.formItem.config.required"></textarea><div ng-messages="TextareaView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | tanslate }]</div></div></md-input-container>');
$templateCache.put('app/directives/radio-button-item/radio-button-item.html','<div layout-padding="" flex="" class="sortable-container" layout="column" sv-root="" sv-part="RadioButton.item.options"><md-switch ng-model="RadioButton.item.config.direction" ng-true-value="\'horizontal\'" ng-false-value="\'vertical\'">{{\'LAYOUT_DIRECTION\' | translate}} ({{RadioButton.item.config.direction == \'horizontal\' ? \'Horizontal\' : \'Vertical\'}})</md-switch><div class="option-item" layout="row" ng-repeat="option in RadioButton.item.options track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container><label>{{\'OPTION\' | translate}} {{$index + 1}}</label> <input ng-model="option.value"></md-input-container><md-button class="md-button" ng-click="RadioButton.deleteOption($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" ng-click="RadioButton.addOption()"><ng-md-icon class="icon-bar" icon="add" style="fill:#4D4D4D"></ng-md-icon></md-button></div></div>');
$templateCache.put('app/directives/radio-button-item/radio-button-view.html','<md-input-container style="width: 100%;"><md-radio-group name="formItemInput" ng-required="RadioButtonView.formItem.config.required" ng-model="RadioButtonView.formItem.value" layout="{{RadioButtonView.formItem.config.direction == \'horizontal\' ? \'column\' : \'row\'}}" required=""><md-radio-button style="color: black !important;" disabled="" ng-repeat="option in RadioButtonView.formItem.options track by $index" value="{{option.value}}" aria-label="...">{{option.value}}</md-radio-button></md-radio-group><div ng-messages="RadioButtonView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate }}</div></div></md-input-container>');}]);