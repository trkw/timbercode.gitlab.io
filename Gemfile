source "https://rubygems.org"
ruby RUBY_VERSION

# Fix for error in tests:
#   htmlproofer 3.4.0 | Error:  invalid byte sequence in US-ASCII
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

gem "jekyll", "3.3.1"

group :jekyll_plugins do
  gem "jekyll-admin", "0.2.0"
  gem "jekyll-seo-tag", "2.1.0"
  # TODO Needed? Used?
  gem "jekyll-paginate", "1.1.0"
end

gem "html-proofer", "3.4.0"
