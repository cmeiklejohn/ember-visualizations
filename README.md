# Ember Visualizations

Ember Visualizations provides basic integration between Ember.js and D3 for common
graphs and charts.

Ember Visualizations is currently under development.  Use at your own risk.  And, as
always, contributions are greatly appreciated!

## Usage

Currently, Ember Visualizations supports generation of responsive Time Series and Histogram visualizations.

View the full documentation [here](http://cmeiklejohn.github.com/ember-visualizations).

## Building Ember Visualizations.

1. Run `rake` to build.

## Testing

### Setup

1. Install Ruby 1.9.2+.

2. Install Bundler: `gem install bundler`

3. Run `bundle` inside the project root to install the gem dependencies.

### In Your Browser

1. To start the development server, run `bundle exec rackup`.

2. Then visit: `http://localhost:9292/tests/index.html?package=all`.

### From the CLI

1. Install phantomjs from http://phantomjs.org

2. Run `bundle exec rake test`.

3. (Mac OS X Only) Run `bundle exec rake autotest` to automatically re-run tests
   when any files are changed.

## Documentation

### Preview API documenation

* Run `bundle exec rake docs:preview`

* The `docs:preview` task will build the documentation and make it available at <http://localhost:9292/index.html>

### Build API documentation

* Run `bundle exec rake docs:build`

* HTML documentation is built in the `docs` directory
