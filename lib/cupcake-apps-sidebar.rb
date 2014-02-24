require "cupcake-apps-sidebar/version"

module CupcakeAppsSidebar
  def self.assets_dir
    File.expand_path('../../assets/external', __FILE__)
  end

  module Sprockets
    def self.setup(environment, options = {})
      environment.append_path(CupcakeAppsSidebar.assets_dir)
    end
  end
end
