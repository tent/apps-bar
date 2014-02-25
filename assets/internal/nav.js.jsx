/** @jsx React.DOM */

(function () {

	AppBar.Views.Nav = React.createClass({
		displayName: "AppBar.Views.Nav",

		getDefaultProps: function () {
			return {
				items: []
			};
		},

		render: function () {
			var listItems = this.props.items.map(function (item) {
				return (
					<NavItem
						key={item.iconName}
						iconName={item.iconName}
						title={item.title}
						url={item.url}
						selected={item.selected} />
				);
			});

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
			window.parent.location.href = this.props.url;
		},

		render: function () {
			return (
				<li className={this.props.iconName + (this.props.selected ? " active" : "")}>
					<a href={this.props.url} title={this.props.title} onClick={this.handleClick}>
						<span>{this.props.title}</span>
					</a>
				</li>
			);
		},
	});

})();
