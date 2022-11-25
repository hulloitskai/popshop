# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `rack-proxy` gem.
# Please instead update this file by running `bin/tapioca gem rack-proxy`.

# source://rack-proxy//lib/net_http_hacked.rb#19
class Net::HTTP < ::Net::Protocol
  # Original #request with block semantics.
  #
  # def request(req, body = nil, &block)
  #   unless started?
  #     start {
  #       req['connection'] ||= 'close'
  #       return request(req, body, &block)
  #     }
  #   end
  #   if proxy_user()
  #     unless use_ssl?
  #       req.proxy_basic_auth proxy_user(), proxy_pass()
  #     end
  #   end
  #
  #   req.set_body_internal body
  #   begin_transport req
  #     req.exec @socket, @curr_http_version, edit_path(req.path)
  #     begin
  #       res = HTTPResponse.read_new(@socket)
  #     end while res.kind_of?(HTTPContinue)
  #     res.reading_body(@socket, req.response_body_permitted?) {
  #       yield res if block_given?
  #     }
  #   end_transport req, res
  #
  #   res
  # end
  #
  # source://rack-proxy//lib/net_http_hacked.rb#49
  def begin_request_hacked(req); end

  # source://rack-proxy//lib/net_http_hacked.rb#60
  def end_request_hacked; end
end

# source://net-http/0.2.0/net/http.rb#1186
Net::HTTP::ENVIRONMENT_VARIABLE_IS_MULTIUSER_SAFE = T.let(T.unsafe(nil), TrueClass)

# source://net-http/0.2.0/net/http/backward.rb#7
Net::HTTP::ProxyMod = Net::HTTP::ProxyDelta

# source://net-http/0.2.0/net/http.rb#399
Net::HTTP::VERSION = T.let(T.unsafe(nil), String)

# source://rack-proxy//lib/net_http_hacked.rb#67
class Net::HTTPResponse
  # Original #reading_body with block semantics
  #
  #   @socket = sock
  #   @body_exist = reqmethodallowbody && self.class.body_permitted?
  #   begin
  #     yield
  #     self.body   # ensure to read body
  #   ensure
  #     @socket = nil
  #   end
  # end
  #
  # source://rack-proxy//lib/net_http_hacked.rb#81
  def begin_reading_body_hacked(sock, reqmethodallowbody); end

  # source://rack-proxy//lib/net_http_hacked.rb#86
  def end_reading_body_hacked; end
end

# source://rack-proxy//lib/rack/http_streaming_response.rb#4
module Rack
  class << self
    # source://rack/2.2.4/lib/rack/version.rb#26
    def release; end

    # source://rack/2.2.4/lib/rack/version.rb#19
    def version; end
  end
end

# source://rack/2.2.4/lib/rack.rb#29
Rack::CACHE_CONTROL = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#31
Rack::CONTENT_LENGTH = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#32
Rack::CONTENT_TYPE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#43
Rack::DELETE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#36
Rack::ETAG = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#30
Rack::EXPIRES = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack/file.rb#6
Rack::File = Rack::Files

# source://rack/2.2.4/lib/rack.rb#39
Rack::GET = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#44
Rack::HEAD = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#20
Rack::HTTPS = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#35
Rack::HTTP_COOKIE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#17
Rack::HTTP_HOST = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#18
Rack::HTTP_PORT = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#19
Rack::HTTP_VERSION = T.let(T.unsafe(nil), String)

# Wraps the hacked net/http in a Rack way.
#
# source://rack-proxy//lib/rack/http_streaming_response.rb#6
class Rack::HttpStreamingResponse
  # @return [HttpStreamingResponse] a new instance of HttpStreamingResponse
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#15
  def initialize(request, host, port = T.unsafe(nil)); end

  # source://rack-proxy//lib/rack/http_streaming_response.rb#19
  def body; end

  # source://rack-proxy//lib/rack/http_streaming_response.rb#23
  def code; end

  # Can be called only once!
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#38
  def each(&block); end

  # source://rack-proxy//lib/rack/http_streaming_response.rb#31
  def headers; end

  # Returns the value of attribute read_timeout.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def read_timeout; end

  # Sets the attribute read_timeout
  #
  # @param value the value to set the attribute read_timeout to.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def read_timeout=(_arg0); end

  # Returns the value of attribute ssl_version.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def ssl_version; end

  # Sets the attribute ssl_version
  #
  # @param value the value to set the attribute ssl_version to.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def ssl_version=(_arg0); end

  # #status is deprecated
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#23
  def status; end

  # source://rack-proxy//lib/rack/http_streaming_response.rb#46
  def to_s; end

  # Returns the value of attribute use_ssl.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def use_ssl; end

  # Sets the attribute use_ssl
  #
  # @param value the value to set the attribute use_ssl to.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def use_ssl=(_arg0); end

  # Returns the value of attribute verify_mode.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def verify_mode; end

  # Sets the attribute verify_mode
  #
  # @param value the value to set the attribute verify_mode to.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#13
  def verify_mode=(_arg0); end

  protected

  # Net::HTTPResponse
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#53
  def response; end

  # Net::HTTP
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#58
  def session; end

  private

  # source://rack-proxy//lib/rack/http_streaming_response.rb#74
  def close_connection; end

  # Returns the value of attribute connection_closed.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#72
  def connection_closed; end

  # Sets the attribute connection_closed
  #
  # @param value the value to set the attribute connection_closed to.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#72
  def connection_closed=(_arg0); end

  # Returns the value of attribute host.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#70
  def host; end

  # Returns the value of attribute port.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#70
  def port; end

  # Returns the value of attribute request.
  #
  # source://rack-proxy//lib/rack/http_streaming_response.rb#70
  def request; end
end

# source://rack-proxy//lib/rack/http_streaming_response.rb#7
Rack::HttpStreamingResponse::STATUSES_WITH_NO_ENTITY_BODY = T.let(T.unsafe(nil), Hash)

# source://rack/2.2.4/lib/rack.rb#46
Rack::LINK = T.let(T.unsafe(nil), String)

# source://rack-test/2.0.2/lib/rack/test.rb#413
Rack::MockSession = Rack::Test::Session

# source://rack/2.2.4/lib/rack.rb#45
Rack::OPTIONS = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#42
Rack::PATCH = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#21
Rack::PATH_INFO = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#40
Rack::POST = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#41
Rack::PUT = T.let(T.unsafe(nil), String)

# Subclass and bring your own #rewrite_request and #rewrite_response
#
# source://rack-proxy//lib/rack/proxy.rb#7
class Rack::Proxy
  # @option opts
  # @param opts [Hash] a customizable set of options
  # @return [Proxy] a new instance of Proxy
  #
  # source://rack-proxy//lib/rack/proxy.rb#57
  def initialize(app = T.unsafe(nil), opts = T.unsafe(nil)); end

  # source://rack-proxy//lib/rack/proxy.rb#77
  def call(env); end

  # Return modified env
  #
  # source://rack-proxy//lib/rack/proxy.rb#82
  def rewrite_env(env); end

  # Return a rack triplet [status, headers, body]
  #
  # source://rack-proxy//lib/rack/proxy.rb#87
  def rewrite_response(triplet); end

  protected

  # source://rack-proxy//lib/rack/proxy.rb#93
  def perform_request(env); end

  class << self
    # source://rack-proxy//lib/rack/proxy.rb#22
    def extract_http_request_headers(env); end

    # source://rack-proxy//lib/rack/proxy.rb#38
    def normalize_headers(headers); end

    protected

    # source://rack-proxy//lib/rack/proxy.rb#47
    def reconstruct_header_name(name); end

    # source://rack-proxy//lib/rack/proxy.rb#51
    def titleize(str); end
  end
end

# source://rack-proxy//lib/rack/proxy.rb#10
Rack::Proxy::HOP_BY_HOP_HEADERS = T.let(T.unsafe(nil), Hash)

# source://rack-proxy//lib/rack/proxy.rb#8
Rack::Proxy::VERSION = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#25
Rack::QUERY_STRING = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#53
Rack::RACK_ERRORS = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#63
Rack::RACK_HIJACK = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#65
Rack::RACK_HIJACK_IO = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#55
Rack::RACK_INPUT = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#64
Rack::RACK_IS_HIJACK = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#54
Rack::RACK_LOGGER = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#76
Rack::RACK_METHODOVERRIDE_ORIGINAL_METHOD = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#67
Rack::RACK_MULTIPART_BUFFER_SIZE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#68
Rack::RACK_MULTIPART_TEMPFILE_FACTORY = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#60
Rack::RACK_MULTIPROCESS = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#59
Rack::RACK_MULTITHREAD = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#66
Rack::RACK_RECURSIVE_INCLUDE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#72
Rack::RACK_REQUEST_COOKIE_HASH = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#73
Rack::RACK_REQUEST_COOKIE_STRING = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#70
Rack::RACK_REQUEST_FORM_HASH = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#69
Rack::RACK_REQUEST_FORM_INPUT = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#71
Rack::RACK_REQUEST_FORM_VARS = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#74
Rack::RACK_REQUEST_QUERY_HASH = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#75
Rack::RACK_REQUEST_QUERY_STRING = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#61
Rack::RACK_RUNONCE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#56
Rack::RACK_SESSION = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#57
Rack::RACK_SESSION_OPTIONS = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#77
Rack::RACK_SESSION_UNPACKED_COOKIE_DATA = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#58
Rack::RACK_SHOWSTATUS_DETAIL = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#52
Rack::RACK_TEMPFILES = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#62
Rack::RACK_URL_SCHEME = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#51
Rack::RACK_VERSION = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack/version.rb#23
Rack::RELEASE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#22
Rack::REQUEST_METHOD = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#23
Rack::REQUEST_PATH = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#24
Rack::SCRIPT_NAME = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#27
Rack::SERVER_NAME = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#28
Rack::SERVER_PORT = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#26
Rack::SERVER_PROTOCOL = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#33
Rack::SET_COOKIE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#48
Rack::TRACE = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#34
Rack::TRANSFER_ENCODING = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack.rb#47
Rack::UNLINK = T.let(T.unsafe(nil), String)

# source://rack/2.2.4/lib/rack/version.rb#16
Rack::VERSION = T.let(T.unsafe(nil), Array)
