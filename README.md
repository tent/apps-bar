cupcake-apps-bar
====================

Icon font is generated with [FontCustom](https://github.com/FontCustom/fontcustom).

## Usage

```ruby
# Gemfile
gem "cupcake-apps-bar", :git => "git://github.com/cupcake/apps-bar.git"
```

```ruby
# app.rb
require "cupcake-apps-bar"
CupcakeAppsBar::Sprockets.setup(sprockets_environment)
```

```erb
<link href="<%= asset_path("cupcake-apps-bar.css") %>" media="screen" rel="stylesheet" type="text/css" />

<iframe id="apps-sidebar" src="https://url/to/cupcake-apps-bar.html"></iframe>
```

## Compiling

```shell
ASSETS_DIR=./build ASSET_ROOT=https://example.com/assets bundle exec rake compile
```

## Contributing

1. Add new icon svgs to `./src`, or manipulate existing ones.
2. Compile assets

  ```shell
  bundle
  bundle exec rake compile
  ```
3. Commit and push changes
