var get = Ember.get;

var modalPaneTemplate = '\
{{#if heading}} \
  <div class="modal-header"> \
	<a href="#" class="close" rel="close">×</a> \
	{{view headerViewClass}} \
  </div> \
{{/if}} \
<div class="modal-body">{{view bodyViewClass}}</div> \
<div class="modal-footer"> \
  {{#if primary}} \
  	{{#view Bootstrap.Button type="primary" classBinding="parentView.isErroneous:disabled" disabledBinding="isErroneous" rel="primary"}} \
  	  {{#if parentView.primaryIcon}}{{view parentView.primaryIconViewClass}}{{/if}} \
  	  {{parentView.primary}} \
  	{{/view}} \
  {{/if}} \
  {{#if secondary}} \
  	{{#view Bootstrap.Button type="secondary" rel="secondary"}} \
  	  {{#if parentView.secondaryIcon}}{{view parentView.secondaryIconViewClass}}{{/if}} \
  	  {{parentView.secondary}} \
  	{{/view}} \
  {{/if}} \
</div>';
var modalPaneBackdrop = '<div class="modal-backdrop"></div>';

Bootstrap.ModalPane = Ember.View.extend({
  classNames: 'modal',
  template: Ember.Handlebars.compile(modalPaneTemplate),
  heading: null,
  message: null,
  primary: null,
  secondary: null,
  showBackdrop: true,
  closeOnEscape: true,
  headerViewClass: Ember.View.extend({
    tagName: 'h3',
    template: Ember.Handlebars.compile('{{parentView.heading}}')
  }),
  bodyViewClass: Ember.View.extend({
    tagName: 'p',
    template: Ember.Handlebars.compile('{{{parentView.message}}}')
  }),

  item: null, 
  
  isErroneous: function() {
    var hasNoErrors = this.getPath('item.errors.isEmpty');
    return !hasNoErrors;       
  }.property('item.errors.isEmpty'), 

  primaryIcon: null,
  primaryIconViewClass: function() {
	var icon = this.get('primaryIcon');
	return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('primaryIcon'),
  secondaryIcon: null,
  secondaryIconViewClass: function() {
	var icon = this.get('secondaryIcon');
    return Bootstrap.Icon.extend({ classNames:  icon});
  }.property('secondaryIcon'),	

  didInsertElement: function() {
    if (get(this, 'showBackdrop')) this._appendBackdrop();
    this._setupDocumentKeyHandler();
  },

  willDestroyElement: function() {
    if (this._backdrop) this._backdrop.remove();
    this._removeDocumentKeyHandler();
  },

  keyPress: function(event) {
    if (get(this, 'closeOnEscape') && event.keyCode === 27) {
      this._triggerCallbackAndDestroy({ close: true }, event);
    }
  },

  click: function(event) {
    var target = $(event.target),
        targetRel = target.attr('rel');
    if (targetRel === 'close') {
      this._triggerCallbackAndDestroy({ close: true }, event);
    } else if (targetRel == 'primary' && !this.get('isErroneous')) {
      this._triggerCallbackAndDestroy({ primary: true }, event);
    } else if (targetRel == 'secondary') {
      this._triggerCallbackAndDestroy({ secondary: true }, event);
    }
  },

  _appendBackdrop: function() {
    var parentLayer = this.$().parent();
    this._backdrop = $(modalPaneBackdrop).appendTo(parentLayer);
  },

  _setupDocumentKeyHandler: function() {
    var cc = this,
        handler = function(event) {
          cc.keyPress(event);
        };
    jQuery(window.document).bind('keyup', handler);
    this._keyUpHandler = handler;
  },

  _removeDocumentKeyHandler: function() {
    jQuery(window.document).unbind('keyup', this._keyUpHandler);
  },

  _triggerCallbackAndDestroy: function(options, event) {
    if (this.callback) this.callback(options, event);
    if(!options.cancel) this.destroy();
  }
});

Bootstrap.ModalPane.reopenClass({
  popup: function(options) {
    var modalPane;
    if (!options) options = {}
    modalPane = this.create(options);
    modalPane.append();
    return modalPane;
  }
});
