(function (angular) {
  angular.module('angularMaterialFormBuilder')
    .directive('inputItem', InputItem);

  function InputItem() {
    'use strict';
    var directive = {
      restrict: 'E',
      link: init,
      templateUrl: 'app/directives/input-item/input-item.html',
      scope: {
        item: '=',
        formulaSources: '='
      },
      controller: InputItemCtrl,
      controllerAs: 'InputItem',
      bindToController: true
    };

    return directive;
  }

  function init(scope, elem, attrs, ctrl) {
    console.log("INIT2");
    console.log(scope, elem, attrs, ctrl);

  }

  /*@ngInject*/
  function InputItemCtrl(Utils, $element, CommonData, $scope) {
    this.Element = $element;

    var self = this;
    // the firs time combine arrays

    if (self.formulaSources.length > 0 && !CommonData.formulaSourcesFlag) {
      CommonData.formulaSources = CommonData.formulaSources.concat(self.formulaSources);
    }

    CommonData.formulaSourcesFlag = true;

    if (self.item)
      CommonData.items.push(this.item);

    // var _formulaSourcesProcessed = setFormulaSources(CommonData.items, _formulaSources);

    self.readonly = false;
    self.selectedItem = null;
    self.searchText = null;
    self.querySearch = querySearch;
    // self.formulaSources = loadSources(CommonData.formulaSources);
    self.formulaSources = loadSources(self.formulaSources);
    self.selectedFormulaSources = [];

    self.autocompleteDemoRequireMatch = function () {
      return isNaN(self.searchText);
    };

    self.inputTypeChanges = function () {


      // // add or for formula too avoiding the same formula field
      // if (self.item.config.type === 'number') {

      //   _formulaSourcesProcessed = setFormulaSources(CommonData.items, CommonData.formulaSources);

      //   self.formulaSources = loadSources(_formulaSourcesProcessed);

      // }

      // else if(self.item.config.type === 'number'){

      //   var _filtered = CommonData.items.filter(function (item) { return item.props.field === self.item.props.field });
      //   if (_filtered.length > 1) {
      //     CommonData.items.splice(_filtered[_filtered.length - 1], 1);
      //   }

      // }
    };

    self.transformChip = transformChip;

    function setFormulaSources(_items, _formulaSources) {
      var _new = [].concat(_formulaSources);
      // filter the fields are number type
      _items.filter(function (item) {
        return item.type === 'input' || item.type === 'list';
      }).forEach(function (item) {
        if (item.config.type == "number") {
          _new.push({ type: item.config.type, field: item.props.field || toCamelCase(item.props.title), name: item.props.title });
        } else if (item.config.type == "list") {
          item.dataSrcSelected.settings.customFields.forEach(function (item2) {
            if (item2.dataType == 'number')
              _new.push({ type: 'dataSrc', field: item.props.field || toCamelCase(item.props.title) + '.' + item2.field, name: item.props.title + '.' + item2.title, dataSrcSelected: JSON.stringify(item.dataSrcSelected) });
          });
        }
      });

      return _new;
    }

    // })
    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      var _uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

      if (angular.isObject(chip)) {
        if (this.item.config.formula.indexOf(chip) > -1) {

          return { name: chip.name, label: chip.name, field: chip.field, type: chip.type, _id: _uuid };
        }
        return chip;
      }
      return { name: chip, label: chip, field: chip, _id: _uuid };
    }

    /**
     * Search for sources.
     */
    function querySearch(query) {
      var results = query ? self.formulaSources.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(item) {
        return (item._lowername.indexOf(lowercaseQuery) === 0) ||
          (item._lowerlabel.indexOf(lowercaseQuery) === 0);
      };

    }

    function loadSources(list) {

      return list.map(function (item) {
        item._lowername = item.name.toLowerCase();
        item._lowertype = item.type ? item.type.toLowerCase() : '';
        item._lowerlabel = item.label ? item.label.toLowerCase() : '';
        return item;
      });
    }

    self.constructedFormula = function () {
      if (self.item.config.formula.length > 0) {
        var _constructedFormula = self.item.config.formula.reduce(function (pre, current, idx) {
          return idx == 0 ? current.field : pre + current.field;
        }, '');

        self.item.props.formula = _constructedFormula;
      }

    };

    Utils.extend(self.item, {
      config: {
        type: 'text',        
        formula: [],
      }
    });
  }

})(angular);
