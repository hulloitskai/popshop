# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `silencer` gem.
# Please instead update this file by running `bin/tapioca gem silencer`.

# source://silencer//lib/silencer/hush.rb#3
module Silencer; end

# source://silencer//lib/silencer/rails/environment.rb#4
module Silencer::Environment
  private

  # source://silencer//lib/silencer/rails/environment.rb#20
  def rails4?; end

  # source://silencer//lib/silencer/rails/environment.rb#24
  def rails5?; end

  # source://silencer//lib/silencer/rails/environment.rb#10
  def rails?; end

  # source://silencer//lib/silencer/rails/environment.rb#14
  def rails_version; end

  # source://silencer//lib/silencer/rails/environment.rb#28
  def tagged_logger?; end

  class << self
    # @return [Boolean]
    #
    # source://silencer//lib/silencer/rails/environment.rb#20
    def rails4?; end

    # @return [Boolean]
    #
    # source://silencer//lib/silencer/rails/environment.rb#24
    def rails5?; end

    # @return [Boolean]
    #
    # source://silencer//lib/silencer/rails/environment.rb#10
    def rails?; end

    # source://silencer//lib/silencer/rails/environment.rb#14
    def rails_version; end

    # @return [Boolean]
    #
    # source://silencer//lib/silencer/rails/environment.rb#28
    def tagged_logger?; end
  end
end

# source://silencer//lib/silencer/rails/environment.rb#5
Silencer::Environment::RAILS_4 = T.let(T.unsafe(nil), Regexp)

# source://silencer//lib/silencer/rails/environment.rb#6
Silencer::Environment::RAILS_5 = T.let(T.unsafe(nil), Regexp)

# source://silencer//lib/silencer/hush.rb#4
module Silencer::Hush
  private

  # @return [Boolean]
  #
  # source://silencer//lib/silencer/hush.rb#7
  def silence_request?(env, enable_header: T.unsafe(nil)); end

  # @return [Boolean]
  #
  # source://silencer//lib/silencer/hush.rb#11
  def silent_header?(env); end

  # @return [Boolean]
  #
  # source://silencer//lib/silencer/hush.rb#15
  def silent_path?(env); end
end

# source://silencer//lib/silencer/rails/logger.rb#77
Silencer::Logger = Silencer::Rails::Logger

# source://silencer//lib/silencer/methods.rb#4
module Silencer::Methods
  # source://silencer//lib/silencer/methods.rb#7
  def define_routes(silence_paths, opts); end
end

# source://silencer//lib/silencer/methods.rb#5
Silencer::Methods::METHODS = T.let(T.unsafe(nil), Array)

# source://silencer//lib/silencer/rails/logger.rb#10
module Silencer::Rails; end

# source://silencer//lib/silencer/rails/logger.rb#11
class Silencer::Rails::Logger < ::Rails::Rack::Logger
  include ::Silencer::Hush
  include ::Silencer::Methods
  include ::Silencer::Util

  # @return [Logger] a new instance of Logger
  #
  # source://silencer//lib/silencer/rails/logger.rb#16
  def initialize(app, *args); end

  # source://silencer//lib/silencer/rails/logger.rb#31
  def call(env); end

  private

  # source://silencer//lib/silencer/rails/logger.rb#67
  def normalize(args); end

  # source://silencer//lib/silencer/rails/logger.rb#43
  def quiet(&block); end

  # This is not threadsafe
  #
  # source://silencer//lib/silencer/rails/logger.rb#57
  def quiet_with_log_level; end

  # This is threadsafe in Rails 4.2.6+
  #
  # source://silencer//lib/silencer/rails/logger.rb#52
  def quiet_with_silence(&block); end
end

# source://silencer//lib/silencer/util.rb#4
module Silencer::Util
  private

  # source://silencer//lib/silencer/util.rb#15
  def extract_options!(args); end

  # source://silencer//lib/silencer/util.rb#5
  def wrap(object); end

  class << self
    # source://silencer//lib/silencer/util.rb#15
    def extract_options!(args); end

    # source://silencer//lib/silencer/util.rb#5
    def wrap(object); end
  end
end
