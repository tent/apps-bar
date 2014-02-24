require "cupcake-apps-bar/version"

module CupcakeAppsBar
  def self.expand_path(path)
    File.expand_path(File.join('..', '..', path), __FILE__)
  end

  def self.external_asset_dirs
    %w(
      assets/external
    ).map { |path| self.expand_path(path) }
  end

  def self.internal_assets_dirs
    %w(
      assets/internal
      vendor/assets
    ).map { |path| self.expand_path(path) }
  end

  module Sprockets
    def self.setup(environment)
      CupcakeAppsBar.external_asset_dirs.each do |dir|
        environment.append_path(dir)
      end
    end

    def self.setup_internal(environment)
      CupcakeAppsBar.internal_assets_dirs.each do |dir|
        environment.append_path(dir)
      end
    end
  end
end
