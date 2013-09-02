abort "Please use Ruby 1.9 or 2.0 to build Ember.js!" if RUBY_VERSION !~ /^(1\.9|2.0)/

require "bundler/setup"
require "erb"
require "rake-pipeline"
require "ember_docs/cli"
require "colored"

def pipeline
  Rake::Pipeline::Project.new("Assetfile")
end

desc "Strip trailing whitespace for JavaScript files in packages"
task :strip_whitespace do
  Dir["packages/**/*.js"].each do |name|
    body = File.read(name)
    File.open(name, "w") do |file|
      file.write body.gsub(/ +\n/, "\n")
    end
  end
end

desc "Build ember-visualizations.js"
task :dist do
  puts "Building Ember Visualizations..."
  pipeline.invoke
  puts "Done"
end

desc "Clean build artifacts from previous builds"
task :clean do
  puts "Cleaning build..."
  pipeline.clean
  puts "Done"
end

desc "Run tests with phantomjs"
task :test, [:suite] => :dist do |t, args|
  unless system("which phantomjs > /dev/null 2>&1")
    abort "PhantomJS is not installed. Download from http://phantomjs.org"
  end

  suites = {
    :default => ["package=all"],
    :all => ["package=all",
              "package=all&jquery=1.6.4&nojshint=true",
              "package=all&extendprototypes=true&nojshint=true",
              "package=all&extendprototypes=true&jquery=1.6.4&nojshint=true",
              "package=all&dist=build&nojshint=true"]
  }

  if ENV['TEST']
    opts = [ENV['TEST']]
  else
    suite = args[:suite] || :default
    opts = suites[suite.to_sym]
  end

  unless opts
    abort "No suite named: #{suite}"
  end

  cmd = opts.map do |opt|
    "phantomjs tests/qunit/run-qunit.js \"file://localhost#{File.dirname(__FILE__)}/tests/index.html?#{opt}\""
  end.join(' && ')

  # Run the tests
  puts "Running: #{opts.join(", ")}"
  success = system(cmd)

  if success
    puts "Tests Passed".green
  else
    puts "Tests Failed".red
    exit(1)
  end
end

desc "Automatically run tests (Mac OS X only)"
task :autotest do
  system("kicker -e 'rake test' packages")
end

namespace :docs do
  def doc_args
    "#{Dir.glob("packages/ember-*").join(' ')} -E #{Dir.glob("packages/ember-*/tests").join(' ')} -t docs.emberjs.com"
  end

  desc "Preview Ember Docs (does not auto update)"
  task :preview do
    require "ember_docs/cli"
    EmberDocs::CLI.start("preview #{doc_args}".split(' '))
  end

  desc "Build Ember Docs"
  task :build do
    require "ember_docs/cli"
    EmberDocs::CLI.start("generate #{doc_args} -o docs".split(' '))
  end

  desc "Remove Ember Docs"
  task :clean do
    rm_r "docs"
  end
end

task :default => :dist
