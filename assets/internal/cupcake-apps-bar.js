//= require_self
//= require ./config
//= require ./nav
//= require ./run

(function (global) {

	global.AppBar = {
		Views: {},

		run: function () {
			var el = document.getElementById("apps-bar");
			React.renderComponent(
				this.Views.Nav({
					items: this.config.navItems
				}),
				el
			);
		}
	};

})(this);
