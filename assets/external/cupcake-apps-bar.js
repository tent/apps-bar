(function () {
	"use strict";

	var __iframe = document.getElementById('apps-bar');
	var __iframeHost = __iframe.attributes.src.value.replace(/^(https?:\/\/[^\/]+).*$/, '$1');
	var __handlers = {};
	var __queue = [];

	var CupcakeAppsBar = window.CupcakeAppsBar = {
		run: function () {
			this.__ready = true;
			for (var i = 0, len = __queue.length; i < len; i++) {
				this.postMessage(__queue[i]);
			}
		},

		postMessage: function (message, force) {
			if ( !this.__ready && !force ) {
				__queue.push(message);
				return;
			}
			__iframe.contentWindow.postMessage(message, __iframeHost);
		},

		onMessage: function (e) {
			// only accept messages from iframe
			if (e.origin !== __iframeHost) {
				return;
			}

			switch (e.data.action) {
				case "init":
					if ( !this.__ready ) {
						this.run();
					}
				break;

				case "handleNavItemClick":
					if (__handlers[e.data.name]) {
						__handlers[e.data.name]();
					} else {
						console.warn("No handler registered for "+ JSON.stringify(e.data));
					}
				break;

				default:
					console.warn("CupcakeAppsBar (outer): Unknown action "+ JSON.stringify(e.data));
			}
		},

		registerHandler: function (name, callback, url) {
			__handlers[name] = callback;
			this.postMessage({
				action: 'handlerRegistered',
				name: name,
				url: url
			});
		},

		setItemTitle: function (name, title) {
			this.postMessage({
				action: 'setTitle',
				name: name,
				title: title
			});
		},

		setItemSelected: function (name, selected) {
			this.postMessage({
				action: 'setSelected',
				name: name,
				selected: selected
			});
		}
	};

	window.addEventListener('message', CupcakeAppsBar.onMessage.bind(CupcakeAppsBar), false);
	CupcakeAppsBar.postMessage({
		action: "init"
	}, true);
})();
