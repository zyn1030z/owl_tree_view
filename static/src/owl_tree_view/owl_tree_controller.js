odoo.define("owl_tutorial_views.OWLTreeController", function (require) {
  "use strict";

  var AbstractController = require("web.AbstractController");

  var OWLTreeController = AbstractController.extend({
    custom_events: _.extend({}, AbstractController.prototype.custom_events, {
      tree_item_clicked: "_onTreeItemClicked",
    }),

    /**
     * @override
     * @param parent
     * @param model
     * @param renderer
     * @param {Object} params
     * @param {String} params.title The title used in schedule activity dialog
     */
    init: function (parent, model, renderer, params) {
      this._super.apply(this, arguments);
      this.title = params.title;
    },

    _onTreeItemClicked: async function (ev) {
      ev.stopPropagation();
      await this.model.expandChildrenOf(
        ev.data.data.id,
        ev.data.data.parent_path
      );
      this.update({}, { reload: false });
    },
  });

  return OWLTreeController;
});
