//= require_self
//= require ./config
//= require ./nav
//= require ./run

(function (global) {

	var __referrerHost = document.referrer.replace(/^(https?:\/\/[^\/]+).*$/, '$1');

	var AppBar = global.AppBar = {
		Views: {},

		run: function () {
			this.postMessage({
				action: "init"
			});

			var el = document.getElementById("apps-bar");
			this.__navItems = this.config.navItems;
			this.__navItems.forEach(function (item, i) {
				if ( !item.url ) {
					item.onClick = this.__createNavItemClickHandler(item);
				}
			}.bind(this));

			this.nav = React.renderComponent(
				this.Views.Nav({
					items: this.__navItems
				}),
				el
			);
		},

		postMessage: function (message) {
			if (__referrerHost === "") {
				return;
			}
			window.parent.postMessage(message, __referrerHost);
		},

		onMessage: function (e) {
			// only accept messages from parent window
			if (e.origin !== __referrerHost) {
				return;
			}

			switch (e.data.action) {
				case 'handlerRegistered':
					this.itemHandlerRegistered(e.data.name, e.data.url);
					this.nav.setProps({
						items: this.__navItems
					});
				break;

				case 'setTitle':
					this.setItemTitle(e.data.name, e.data.title);
					this.nav.setProps({
						items: this.__navItems
					});
				break;

				case 'setSelected':
					this.setItemSelected(e.data.name, e.data.selected);
					this.nav.setProps({
						items: this.__navItems
					});
				break;

				default:
					console.warn("CupcakeAppsBar (inner): Unknown action "+ JSON.stringify(e.data));
			}
		},

		itemHandlerRegistered: function (name, url) {
			for (var i = 0, ref = this.__navItems, len = ref.length; i < len; i++) {
				if (ref[i].name === name) {
					// ensure item has a click handler
					ref[i].onClick = ref[i].onClick || this.__createNavItemClickHandler(ref[i]);

					// allow overriding item URL
					if (url) {
						ref[i].url = url;
					}

					break;
				}
			}
		},

		setItemTitle: function (name, title) {
			for (var i = 0, ref = this.__navItems, len = ref.length; i < len; i++) {
				if (ref[i].name === name) {
					ref[i].title = title;
					break;
				}
			}
		},

		__createNavItemClickHandler: function (item) {
			return function () {
				this.postMessage({
					action: 'handleNavItemClick',
					name: item.name
				});
			}.bind(this);
		}
	};

	window.addEventListener('message', AppBar.onMessage.bind(AppBar), false);

})(this);
