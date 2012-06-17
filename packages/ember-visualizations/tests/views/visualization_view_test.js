/**
  Copyright 2012 Christopher Meiklejohn and Basho Technologies, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

  All of the files in this project are under the project-wide license
  unless they are otherwise marked.
**/

var view;

module('Ember.VisualizationView', {
  setup: function() {
    view = Ember.VisualizationView.create({
      width: 10,
      height: 10
    });
  },

  teardown: function() {
    if(view) {
      view.destroy();
    }
  }
});

test('returns the x value formatted', function() {
  expect(1);

  equal(view.get('xFormatter')(2), 2, 'should format the x value');
});

test('returns the y value formatted', function() {
  expect(1);

  equal(view.get('yFormatter')(2), 2, 'should format the y value');
});

test('is rendered', function() {
  expect(1);

  Ember.run(function() {
    view.append();
  });

  equal(view.$().find('.axis').length, 2, 'should contain two axis');
});

test('renders axes', function() {
  expect(1);

  Ember.run(function() {
    view.append();
  });

  equal(view.$().find('.axis').length, 2, 'should contain two axis');
});

test('renders gridlines', function() {
  expect(2);

  Ember.run(function() {
    view.append();
  });

  equal(view.$().find('.x.grid').length, 1, 'should contain x-axis gridline grouping');

  equal(view.$().find('.y.grid').length, 1, 'should contain y-axis gridline grouping');
});
