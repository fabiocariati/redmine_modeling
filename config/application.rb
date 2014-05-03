require File.expand_path('../boot', __FILE__)

require 'nokogiri'
require 'htmlentities'

files = Dir.new('plugins/modeling/assets/javascripts/editor/templates').select {|file| file if file.include? '.jst' }

exclude_strings = Dir.new('plugins/modeling/assets/javascripts/editor/templates/lib').select {|file|
  file.include? '.js'
}
exclude_strings = exclude_strings.map{|s| s.sub('.js', '')}

final = ''
contents = "templates = {\n"
files.each{|f|
  file = File.open("plugins/modeling/assets/javascripts/editor/templates/" + f.to_s)

  names = /(\w)*\.(jst\.html)/.match(file.path.to_s).to_s.split('.')

  path = file.path
  path[names.join('.')] = ''
  file.each{|l|
    node = Nokogiri::XML(l).children
    if node.empty? || (node.attr('class').to_s != 'jst-template' && node.attr('class').to_s != 'item')
      if l == "    </div>\n"
        contents << "        ),\n"
      elsif l == "</div>\n"
        contents << "    },\n"
      else
        unless l.to_s.gsub(/\s+/, "").empty?
          test = exclude_strings.select{|str| str if l.to_s.include?(str + '.')  }
          if test[0].to_s.empty?
            contents << "    \'#{l.gsub(/\n/, "")}\' +\n"
          else
            contents << "    #{l.gsub(/\n/, "")} +\n"
          end
        end
      end
    else
      if node.attr('class').to_s == 'jst-template'
        contents << "    #{node.attr('name')}: {\n"
      elsif node.attr('class').to_s == 'item'
        contents << "        #{node.attr('name')}: _.template(\n"
      end
    end
    unless contents[/(\+)(\s)*\n        \)/].nil?
      contents[/(\+)(\s)*\n        \)/] = "\n        )"
    end
    clear = lambda{ |str|
      unless str['\'    '].nil?
        str['\'    '] = '    \''
        clear.call(str)
      end
    }
    clear.call(contents)

    contents["\n    \'</div>\' +"] = "\n    }" unless contents["\n    \'</div>\' +"].nil?

    contents[/,(\s)*\n    }/] = "\n    }" unless contents[/,(\s)*\n    }/].nil?
  }
  contents["}\n"] = "},\n" unless contents["}\n"].nil?
}

contents[-1] = "\n}"

aFile = File.new("plugins/modeling/assets/javascripts/editor/templates/templates.js", "w")
aFile.write(contents)
aFile.close

require 'rails/all'

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

module RedmineApp
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Custom directories with classes and modules you want to be autoloadable.
    config.autoload_paths += %W(#{config.root}/lib)

    # Only load the plugins named here, in the order given (default is alphabetical).
    # :all can be used as a placeholder for all plugins not explicitly named.
    # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

    config.active_record.store_full_sti_class = true
    config.active_record.default_timezone = :local

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    I18n.enforce_available_locales = false

    # Configure the default encoding used in templates for Ruby 1.9.
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]

    # Enable the asset pipeline
    config.assets.enabled = false

    # Version of your assets, change this if you want to expire all your assets
    config.assets.version = '1.0'

    config.action_mailer.perform_deliveries = false

    # Do not include all helpers
    config.action_controller.include_all_helpers = false

    config.session_store :cookie_store, :key => '_redmine_session'

    if File.exists?(File.join(File.dirname(__FILE__), 'additional_environment.rb'))
      instance_eval File.read(File.join(File.dirname(__FILE__), 'additional_environment.rb'))
    end
  end
end
