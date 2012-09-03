require("ember-bootstrap/forms/field");
require("ember-bootstrap/views/date_picker");

var Bootstrap = window.Bootstrap;

Bootstrap.Forms.DatePicker = Bootstrap.Forms.Field.extend({
  format: 'dd-mm-yyyy',
  language: 'nl',

  inputField: Bootstrap.DatePicker.extend({
    nameBinding: 'parentView.label',
    formatBinding: 'parentView.format',
	languageBinding: 'parentView.language',
    classNameBindings: ['parentView.inputFieldClassNames'],
  	dataBinding: 'parentView.value'	
  })
});


