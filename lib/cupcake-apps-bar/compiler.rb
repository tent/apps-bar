require 'cupcake-apps-bar'
require 'react-jsx-sprockets'
require 'sass'
require 'sprockets-sass'

module CupcakeAppsBar::Compiler
  extend self

  ASSET_NAMES = CupcakeAppsBar.internal_assets_dirs.inject([]) { |memo, path|
    memo + Dir["#{path}/**/*"]
  }.freeze

  def sprockets_environment(options = {})
    environment = Sprockets::Environment.new do |env|
      env.logger = Logger.new(options[:logfile] || STDOUT)
    end
    environment.context_class.class_eval do
      def asset_path(name, options = {})
        name = name.sub(/[?#].+\Z/, '')
        asset = environment.find_asset(name)
        raise StandardError.new("#{name.inspect} does not exist within #{environment.paths.inspect}!") unless asset
        path = asset.digest_path
        if ENV['ASSET_ROOT']
          "#{ENV['ASSET_ROOT'].sub(/\/\Z/, '')}/#{path}"
        else
          "./"+ path
        end
      end
    end

    CupcakeAppsBar.internal_assets_dirs.each do |path|
      environment.append_path(path)
    end

    Sprockets::Sass.options[:load_paths] = environment.paths

    if options[:compress]
      # Setup asset compression
      require 'uglifier'
      require 'sprockets-rainpress'
      environment.js_compressor = Uglifier.new
      environment.css_compressor = Sprockets::Rainpress
    end

    environment
  end

  def output_dir
    @output_dir ||= ENV['ASSETS_DIR'] || CupcakeAppsBar.expand_path("build")
  end

  def compile_assets(options = {})
    environment = sprockets_environment(options)

    manifest = Sprockets::Manifest.new(
      environment,
      output_dir,
      File.join(output_dir, "manifest.json")
    )

    manifest.compile(ASSET_NAMES)

    Dir["#{output_dir}/*.html*"].each do |html_path|
      path_without_digest = html_path.sub(/([^\/]+)-[^-]+\.html(\..+)?/, '\1.html\2')
      system "mv #{html_path} #{path_without_digest}"
    end
  end

  def compress_assets
    compile_assets(:compress => true)
  end

  def gzip_assets
    compress_assets

    Dir["#{output_dir}/**/*.*"].reject { |f| f =~ /\.gz\z/ }.each do |f|
      system "gzip -c #{f} > #{f}.gz" unless File.exist?("#{f}.gz")
    end
  end
end
