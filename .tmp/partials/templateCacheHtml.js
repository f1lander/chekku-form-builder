angular.module('angularMaterialFormBuilder').run(['$templateCache', function($templateCache) {$templateCache.put('app/directives/checkboxes-item/checkboxes-item.html','<div layout-padding="" class="sortable-container" layout="column" sv-root="" sv-part="Checkboxes.item.options"><md-switch ng-model="Checkboxes.item.config.direction" ng-true-value="\'horizontal\'" ng-false-value="\'vertical\'">{{\'LAYOUT_DIRECTION\' | translate}} ({{Checkboxes.item.config.direction == \'horizontal\' ? \'Horizontal\' : \'Vertical\'}})</md-switch><div class="option-item" layout="row" ng-repeat="option in Checkboxes.item.options track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container><label>{{\'OPTION\' | translate}} {{$index + 1}}</label> <input ng-model="option.value"></md-input-container><md-button class="md-button" ng-click="Checkboxes.deleteOption($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" ng-click="Checkboxes.addOption()">{{ \'ADD_OPTION\' | translate }}</md-button></div></div>');
$templateCache.put('app/directives/checkboxes-item/checkboxes-view.html','<md-input-container style="width: 100%;"><div layout="{{CheckboxesView.formItem.config.direction == \'horizontal\' ? \'column\' : \'row\'}}"><md-checkbox disabled="" style="color: black !important;" ng-repeat="option in CheckboxesView.formItem.options track by $index" ng-model="option.selected" ng-change="CheckboxesView.toggleSelectedOption(option)" ng-disabled="CheckboxesView.disableOptions && !option.selected" aria-label="...">{{option.value}}</md-checkbox></div><div ng-messages="CheckboxesView.form.$error"><div ng-message="minSelections">{{\'MUST_SELECT\' | translate}} {{CheckboxesView.formItem.maxSelections || 1}} {{ \'ITEMS\' | translate }}</div></div></md-input-container>');
$templateCache.put('app/directives/form-items-container/form-items-container.html','<div><form-item ng-repeat="item in container.form.items track by $index" type="{{item.type}}" item="item" index="$index" on-delete="container.delete(item, index)" on-up="container.up(item, index)" on-down="container.down(item, index)"></form-item></div>');
$templateCache.put('app/directives/form-view/form-view.html','<div class="formItem" ng-repeat="formItem in FormView.form.items track by $index" ng-switch="formItem.type" layout="column"><ng-form name="formItemForm"><div layout="column"><div class="formItem-title"><h5 ng-class="{\'md-title\': formItem.type === \'label\', \'md-subhead\': formItem.type !== \'label\' }">{{ formItem.type !== \'label\' ? (FormView.form.items.indexOf(formItem) + 1) + \'.\': \'\' }} {{ formItem.props.title}}</h5></div><checkboxes-view flex="100" form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="checkboxes"></checkboxes-view><radio-button-view flex="100" form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="radioGroup"></radio-button-view><input-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="input"></input-view><textarea-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="textarea"></textarea-view><label-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="label"></label-view><list-view flex="100" form-item="formItem" form="formItemForm" ng-switch-when="list"></list-view><matrix-view flex="100" form-item="formItem" is-preview="true" form="formItemForm" ng-switch-when="matrix"></matrix-view></div></ng-form></div>');
$templateCache.put('app/directives/input-item/input-item.html','<div layout-padding="" layout="column"><md-input-container flex=""><label>{{ \'TYPE\' | translate }}</label><md-select ng-model="Input.item.config.type"><md-option value="text">{{ \'TEXT\' | translate }}</md-option><md-option value="number">{{ \'NUMBER\' | translate }}</md-option><md-option value="date">{{ \'DATE\' | translate }}</md-option><md-option value="time">{{ \'TIME\' | translate }}</md-option></md-select></md-input-container></div>');
$templateCache.put('app/directives/input-item/input-view.html','<md-input-container style="width: 100%;"><input ng-readonly="true" ng-model="InputView.formItem.value" type="{{InputView.formItem.config.type}}" placeholder="{{InputView.formItem.config.placeholder}}" ng-required="InputView.formItem.config.required"><div ng-messages="InputView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate}}</div></div></md-input-container>');
$templateCache.put('app/directives/label-item/label-item.html','');
$templateCache.put('app/directives/label-item/label-view.html','<md-input-container style="width: 100%;"><div ng-messages="LabelView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | tanslate }]</div></div></md-input-container>');
$templateCache.put('app/directives/list-item/list-item.html','<div layout-padding="" layout="column"><md-input-container flex=""><label>{{ \'DATA_SRC\' | translate }}</label><md-select ng-model="List.item.dataSrcSelected"><md-option><em>{{\'NONE\' | translate}}</em></md-option><md-option ng-repeat="dtSrc in List.dataSource" ng-value="dtSrc">{{dtSrc.description}}</md-option></md-select></md-input-container></div>');
$templateCache.put('app/directives/list-item/list-view.html','<md-input-container style="width: 100%;"><input ng-readonly="true" type="text" placeholder="{{ListView.formItem.dataSrcSelected.description}}"></md-input-container>');
$templateCache.put('app/directives/matrix-item/matrix-item.html','<div class="sortable-container columnContainer" layout="column" sv-root="" sv-part="Matrix.item.config.columns"><div class="option-item" layout="row" ng-repeat="column in Matrix.item.config.columns track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container class="input-container"><label>{{ \'COLUMN\' | translate }} {{$index + 1}}</label> <input ng-model="column.value"></md-input-container><md-button class="md-button" md-no-ink="" aria-label="delete column item" ng-click="Matrix.deleteColumn($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon><md-tooltip md-autohide="true">{{\'DELETE\' | translate}}</md-tooltip></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" md-no-ink="" aria-label="add option item" ng-click="Matrix.addColumn()">Add Column</md-button></div></div><div class="sortable-container rowContainer" layout="column" sv-root="" sv-part="Matrix.item.config.rows"><div class="option-item" layout="row" ng-repeat="row in Matrix.item.config.rows track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder row item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container class="input-container"><label>{{\'ROW\' | translate}} {{$index + 1}}</label> <input ng-model="row.value"></md-input-container><md-button class="md-button" md-no-ink="" aria-label="delete row item" ng-click="Matrix.deleteRow($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon><md-tooltip md-autohide="true">{{\'DELETE\' | translate}}</md-tooltip></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" md-no-ink="" aria-label="add row item" ng-click="Matrix.addRow()">{{\'ADD_ROW\' | translate}}</md-button></div></div>');
$templateCache.put('app/directives/matrix-item/matrix-view.html','<md-input-container style="width: 100%;" class="matrix-container" layout="column"><div class="matrix"><div class="matrix-row" flex="" layout="row"><span class="matrix-cell" flex="20"></span> <span class="matrix-cell matrix-cell-header" flex="" ng-repeat="column in MatrixView.formItem.config.columns track by $index">{{column.value}}</span></div><div class="matrix-row" ng-repeat="row in MatrixView.formItem.config.rows track by $index" layout="row"><span class="matrix-cell" flex="20" layout="column" layout-align="center">{{row.value}}</span><md-radio-group ng-model="row.selected" ng-change="MatrixView._updateValidity()" flex="" layout="row"><span class="matrix-cell radio-button-cell" flex="" ng-repeat="column in MatrixView.formItem.config.columns track by $index"><md-radio-button value="{{column.value}}" aria-label="..."></md-radio-button></span></md-radio-group></div></div><div ng-messages="MatrixView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate }}</div></div></md-input-container>');
$templateCache.put('app/directives/radio-button-item/radio-button-item.html','<div layout-padding="" class="sortable-container" layout="column" sv-root="" sv-part="RadioButton.item.options"><md-switch ng-model="RadioButton.item.config.direction" ng-true-value="\'horizontal\'" ng-false-value="\'vertical\'">{{\'LAYOUT_DIRECTION\' | translate}} ({{RadioButton.item.config.direction == \'horizontal\' ? \'Horizontal\' : \'Vertical\'}})</md-switch><div class="option-item" layout="row" ng-repeat="option in RadioButton.item.options track by $index" sv-element=""><md-button class="md-button handle" md-no-ink="" aria-label="reorder option item" sv-handle=""><ng-md-icon class="icon-bar" icon="reorder" style="fill:#4D4D4D"></ng-md-icon></md-button><md-input-container><label>{{\'OPTION\' | translate}} {{$index + 1}}</label> <input ng-model="option.value"></md-input-container><md-button class="md-button" ng-click="RadioButton.deleteOption($index)"><ng-md-icon class="icon-bar" icon="delete" style="fill:#4D4D4D"></ng-md-icon></md-button></div><div layout="row" layout-align="start"><md-button class="md-primary add-option-button" ng-click="RadioButton.addOption()">{{ \'ADD_OPTION\' | translate }}</md-button></div></div>');
$templateCache.put('app/directives/radio-button-item/radio-button-view.html','<md-input-container style="width: 100%;"><md-radio-group name="formItemInput" ng-required="RadioButtonView.formItem.config.required" ng-model="RadioButtonView.formItem.value" layout="{{RadioButtonView.formItem.config.direction == \'horizontal\' ? \'column\' : \'row\'}}" required=""><md-radio-button style="color: black !important;" disabled="" ng-repeat="option in RadioButtonView.formItem.options track by $index" value="{{option.value}}" aria-label="...">{{option.value}}</md-radio-button></md-radio-group><div ng-messages="RadioButtonView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | translate }}</div></div></md-input-container>');
$templateCache.put('app/directives/textarea-item/textarea-item.html','<div layout-padding="" layout="column"><md-input-container flex="100" class="input-container"><label>{{ \'PLACEHOLDER\' | translate}}</label> <input type="text" ng-model="Textarea.item.config.placeholder"></md-input-container></div>');
$templateCache.put('app/directives/textarea-item/textarea-view.html','<md-input-container style="width: 100%;"><textarea ng-readonly="true" ng-model="TextareaView.formItem.value" placeholder="{{TextareaView.formItem.config.placeholder}}" ng-required="TextareaView.formItem.config.required"></textarea><div ng-messages="TextareaView.form.$error"><div ng-message="required">{{ \'REQUIRED\' | tanslate }]</div></div></md-input-container>');}]);