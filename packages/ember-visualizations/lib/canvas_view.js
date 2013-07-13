/*globals $*/

/**
  Copyright 2012 Christopher Meiklejohn and Basho Technologies, Inc.

  Licensed under the Apache License, Version 2.0 (the "License"); you
  may not use this file except in compliance with the License.  You may
  obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
  implied.  See the License for the specific language governing
  permissions and limitations under the License.

  All of the files in this project are under the project-wide license
  unless they are otherwise marked.
**/

/**
  @class

  CanvasView provides a responsive container for containing your SVG
  elements.

  A CanvasView containing a SVG ensure that the visualization scales up
  at a particular aspect ratio, and scales down properly at a minimum
  width.

  To use, wrap around your graph like so:

      {{#view Ember.CanvasView}}
        {{view Ember.HistogramView ...}}
      {{/view}}

  CanvasView provides sane defaults, but you may override the
  presentation using the following attributes: containerWidth,
  containerHeight, xMargin, yMargin, and aspectRatio.

**/
Ember.CanvasView = Ember.View.extend(
/** @scope Ember.CanvasView.prototype */ {

  xMargin: 70,

  yMargin: 20,

  containerWidth: 980,

  containerHeight: 300,

  aspectRatio: 980 / 300,

  viewBox: function() {
    var containerWidth  = this.get('containerWidth'),
        containerHeight = this.get('containerHeight');

    return "0 0 " + containerWidth + " " + containerHeight;
  }.property('containerWidth').cacheable(),

  preserveAspectRatio: function() {
    return "xMinYMid";
  }.property('containerWidth').cacheable(),

  width: function() {
    return this.get('containerWidth');
  }.property('containerWidth').cacheable(),

  height: function() {
    return this.get('containerWidth') / this.get('aspectRatio');
  }.property('containerWidth').cacheable(),

  didInsertElement: function() {
    var self = this,
        elem = this.$();

    Ember.run.next(function() {
      self.set('containerWidth', elem.width());

      $(window).resize(function(){
        self.set('containerWidth', elem.width());
      });
    });

    this._super();
  }

});
