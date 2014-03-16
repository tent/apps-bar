/** @jsx React.DOM */

(function () {

	AppBar.Views.Nav = React.createClass({
		displayName: "AppBar.Views.Nav",

		getInitialState: function () {
			return {
				selectedURL: null
			};
		},

		getDefaultProps: function () {
			return {
				items: []
			};
		},

		componentWillMount: function () {
			this.__calcSelectedItem(this.props.items);
		},

		componentWillReceiveProps: function (props) {
			if (props.items && props.items !== this.props.items) {
				this.__calcSelectedItem(props.items);
			}
		},

		__calcSelectedItem: function (items) {
			var selectedURL = null;
			items.forEach(function (item) {
				if (document.referrer.match(new RegExp("^"+ item.url))) {
					if (selectedURL === null || item.url.length > selectedURL.length) {
						selectedURL = item.url;
					}
				}
			});
			this.setState({
				selectedURL: selectedURL
			});
		},

		render: function () {
			var listItems = this.props.items.map(function (item) {
				var selected;
				if (item.hasOwnProperty('selected')) {
					selected = item.selected;
				} else {
					selected = item.url && (item.url === this.state.selectedURL);
				}

				return (
					<NavItem
						key={item.iconName}
						iconName={item.iconName}
						title={item.title}
						url={item.url}
						onClick={item.onClick}
						selected={selected} />
				);
			}.bind(this));

			return (
				<nav>
					<ul>
						{listItems}
					</ul>
				</nav>
			);
		}
	});

	var NavItem = React.createClass({
		displayName: "NavItem (AppBar.Views.Nav)",

		handleClick: function (e) {
			e.preventDefault();

			if (this.props.onClick) {
				this.props.onClick();
			} else {
				window.parent.location.href = this.props.url;
			}
		},

		render: function () {
			return (
				<li className={this.props.iconName + (this.props.selected ? " active" : "")}>
					<a href={this.props.url} title={this.props.title} onClick={this.handleClick}>
						<span>{this.props.title}</span>
					</a>
				</li>
			);
		}
	});

})();
