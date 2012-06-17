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

module('Ember.TimeSeriesView', {
  setup: function() {
    view = Ember.TimeSeriesView.create({
      width: 10,
      height: 10,
      content: [{ x: 100, y: 100 }, { x: 800, y: 800 }]
    });
  },

  teardown: function() {
    if(view) {
      view.destroy();
    }
  }
});

test('returns max y value', function() {

  expect(1);

  equal(view.get('yMax'), 800, 'should return the max y-coordinate');

});

test('is scaled correctly', function() {

  expect(3);

  equal(view.get('yScale')(0),   10,   'should scale y correctly');

  equal(view.get('yScale')(100), 8.75, 'should scale y correctly');

  equal(view.get('yScale')(800), 0,    'should scale y correctly');

});

test('is rendered', function() {

  expect(1);

  Ember.run(function() {
    view.append();
  });

  equal(view.$().find('path.series').length, 1, 'should contain 1 path');

});
