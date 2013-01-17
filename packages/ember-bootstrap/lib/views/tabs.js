var Bootstrap = window.Bootstrap;

Bootstrap.TabContainerView = Ember.View.extend({
});

Bootstrap.TabView = Ember.View.extend({
  tagName: 'li',
  classNameBindings: ['isActive:active'],

  tabsContainer: Ember.computed(function () {
    return this.nearestInstanceOf(Bootstrap.TabContainerView);
  }).property().volatile(),

  mouseUp: function () {
    setPath(this, 'tabsContainer.currentView', get(this, 'value'));
  },

  isActive: function() {
    return this.get('value') === this.get('tabsContainer.currentView');
  }.property('tabsContainer.currentView').cacheable()
});

Bootstrap.TabPaneView = Ember.View.extend({
  tabsContainer: Ember.computed(function () {
    return this.nearestOfType(Ember.TabContainerView);
  }).property().volatile(),

  isVisible: Ember.computed(function () {
    return get(this, 'viewName') === get(this, 'tabsContainer.currentView');
  }).property('tabsContainer.currentView').volatile()
});



Bootstrap.Tabs = Ember.CollectionView.extend({
  classNames: ['nav', 'nav-tabs'],
  classNameBindings: ['isStacked:nav-stacked'],
  tagName: 'ul',
  itemViewClass: Bootstrap.PillItem,
  selection: null
});

Bootstrap.TabItem = Ember.View.extend({
    tagName: 'li',
    classNameBindings: ['isActive:active'],
    
    isActive: function() {
        return this.get('item') === this.get('controller.selectedTab');
    }.property('item', 'controller.selectedTab').cacheable()
});
