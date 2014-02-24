cupcake-apps-sidebar
====================

Icon font is generated with [FontCustom](https://github.com/FontCustom/fontcustom).

## Usage

```ruby
# Gemfile
gem "cupcake-apps-sidebar", :git => "git://github.com/cupcake/cupcake-apps-sidebar.git"
```

```ruby
require "cupcake-apps-sidebar"
CupcakeAppsSidebar::Sprockets.setup(sprockets_environment)
```

```erb
<!DOCTYPE>
<html lang="en">

<head>
  <link href="<%= asset_path("cupcake-apps-sidebar") %>" media="screen" rel="stylesheet" type="text/css">
</head>

<body>
  <iframe id="apps-sidebar" src="https://url/to/cupcake-apps-sidebar.html"></iframe>

  <script type="application/javascript" src="<%= asset_path("cupcake-apps-sidebar") %>"></script>
</body>

</html>
```

## Contributing

1. Add new icon svgs to `./src`, or manipulate existing ones.
2. Compile assets

  ```shell
  bundle
  bundle exec rake compile
  ```
3. Commit and push changes
