var get = Ember.get;

Bootstrap.TextSupport = Ember.Mixin.create({
  valueBinding: 'parentView.value',
  placeholderBinding: 'parentView.placeholder',
  disabledBinding: 'parentView.disabled',
  maxlengthBinding: 'parentView.maxlength',
  classNameBindings: 'parentView.inputClassNames',
  attributeBindings: ['name', 'readonly', 'placeholder'],
  
  name: Ember.computed(function() {
    return get(this, 'parentView.name') || get(this, 'parentView.label');
  }).property('parentView.name', 'parentView.label').cacheable(),
  
  didInsertElement: function() {
    this._super();
    Ember.run.schedule('actions', this, function() {
      //this.$().placeholder();
    });
  }
});
