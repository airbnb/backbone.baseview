Backbone.BaseView = Backbone.View.extend({
  template: null,

  initialize: function (options) {
    this.bindings();
    this._postInitialize();
  },

  _postInitialize: function() {
    this.postInitialize();
    this.trigger('initialize');
  },

  getRenderData: function() {
    if (this.model) {
      return this.model.toJSON();
    } else {
      return {};
    }
  },

  getTemplate: function() {
    if (this.template && typeof JST !== 'undefined') {
      return JST[this.template];
    }
  },

  getHtml: function() {
    var template = this.getTemplate();
    if (template) {
      return template(this.getRenderData());
    } else {
      return "";
    }
  },

  render: function() {
    this.$el.html(this.getHtml());
    this.trigger('render');
    this.postRender();
    return this;
  },

  // NOOP will be overriden
  postInitialize: function() {},

  // NOOP will be overriden
  postRender: function() {},

  // Your bindings
  // NOOP will be overriden
  bindings: function() {},

  // To be called before view is thrown away.  Clean up intervals, events, etc.
  // NOOP will be overriden
  cleanup: function() {
    this.dispose();
    this.remove();
  },

  // Stole this method from Backbone v0.9.2 bleeding edge.
  // https://github.com/documentcloud/backbone/commit/3ae1af6df1b542bfb3e38f2fdfe7a471f2b830a0
  //
  // Clean up references to this view in order to prevent latent effects and
  // memory leaks.
  dispose: function() {
    this.undelegateEvents();
    if (this.model) this.model.off(null, null, this);
    if (this.collection) this.collection.off(null, null, this);
    return this;
  },

  // A way to grab elements from the DOM using data-attributes.
  // Caches els by default. Pass `true` for `fresh` to ignore cache.
  $get: function(key, fresh) {
    this._$getEls = this._$getEls || {};
    if (fresh || !this._$getEls[key]) {
      this._$getEls[key] = this.$('[data-'+key+']');
    }
    return this._$getEls[key];
  }

});

