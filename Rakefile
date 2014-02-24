require 'bundler/setup'
require 'bundler/gem_tasks'

namespace :fontcustom do
  task :build do
    sh "bundle exec fontcustom compile"
  end
end

task :compile => "fontcustom:build" do
  require 'cupcake-apps-bar/compiler'
  sh "rm -rf #{CupcakeAppsBar::Compiler.output_dir}"
  CupcakeAppsBar::Compiler.gzip_assets
end
