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

module('Ember.CanvasView', {
  setup: function() {
    view = Ember.CanvasView.create();
  },

  teardown: function() {
    if(view) {
      view.destroy();
    }
  }
});

test('returns a height at a correct aspect ratio', function() {
  expect(1);

  view.set('containerWidth', 1080);

  equal(view.get('height'), 330.6122448979592, 'should have a proportionate height');
});

test('returns a width based on its container', function() {
  expect(1);

  view.set('containerWidth', 1080);

  equal(view.get('width'), 1080, 'should have the correct width');
});
