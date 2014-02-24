lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require 'bundler'
Bundler.require

$stdout.sync = true

require 'cupcake-apps-sidebar/compiler'

ENV['ASSET_ROOT'] = "/assets"

sprockets = CupcakeAppsSidebar::Compiler.sprockets_environment

map '/' do
  run lambda { |env|
    new_env = env.clone
    if env['REQUEST_PATH'] =~ %r{\A/assets}
      new_env["PATH_INFO"] = env["REQUEST_PATH"].sub(%r{\A/assets}, '')
    else
      new_env["PATH_INFO"] = "cupcake-apps-bar.html"
    end
    sprockets.call(new_env)
  }
end
