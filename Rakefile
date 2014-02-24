require 'bundler/setup'
require 'bundler/gem_tasks'

namespace :fontcustom do
  task :build do
    sh "bundle exec fontcustom compile"
  end
end

task :compile => "fontcustom:build" do
  require 'cupcake-apps-sidebar/compiler'
  sh "rm -rf #{CupcakeAppsSidebar::Compiler.output_dir}"
  CupcakeAppsSidebar::Compiler.gzip_assets
end
