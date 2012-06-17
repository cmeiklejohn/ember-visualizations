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

module('Ember.HistogramView', {
  setup: function() {
    view = Ember.HistogramView.create({
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

test('is generated from an array of values', function() {

  var values = [1, 2, 3, 4, 5];

  expect(4);

  view.set('content', values);

  view.get('histogram').map(function(i) { ok(i.x && i.y, 'should contain a coordinate pair'); });

});

test('is generated using pre-binned values', function() {

  var values = [{ x: 1, y: 1 }, { x: 2, y: 2 }];

  expect(1);

  view.set('content', values);

  equal(view.get('histogram'), values, 'should match the provided input');

});

test('is updated when content changes', function() {

  var previousValues = [1, 2, 3, 4, 5],
      currentValues  = [5, 6, 7, 8, 9],
      previousHistogram,
      currentHistogram;

  expect(1);

  view.set('content', previousValues);

  previousHistogram = view.get('histogram');

  view.set('content', currentValues);

  currentHistogram = view.get('histogram');

  notDeepEqual(currentHistogram, previousHistogram, 'should not be the same');

});

test('is scaled correctly', function() {

  var values = [{ x: 100, y: 100 }, { x: 800, y: 800 }];

  expect(3);

  view.set('content', values);

  view.set('width', 10);

  view.set('height', 10);

  equal(view.get('yScale')(0),   10,   'should scale y correctly');

  equal(view.get('yScale')(100), 8.75, 'should scale y correctly');

  equal(view.get('yScale')(800), 0,    'should scale y correctly');

});

test('is rendered', function() {

  var values = [{ x: 100, y: 100 }, { x: 800, y: 800 }];

  expect(1);

  view.set('content', values);

  Ember.run(function() {
    view.append();
  });

  equal(view.$().find('rect').length, 2, 'should contain 2 rects');

});
