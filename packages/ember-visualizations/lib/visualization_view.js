/*globals d3*/

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

  VisualizationView provides a base visualization class for rendering
  graph axes, performing axis and label formatting, and displaying
  gridlines.

  In any of your views, simply override xFormatter, and yFormatter to
  provide custom axis formatting.

  VisualizationView is also responsible for redrawing the element on the
  page when the content changes.

**/
Ember.VisualizationView = Ember.View.extend(
/** @scope Ember.VisualizationView.prototype */ {

  tagName: 'svg',

  attributeBindings: ['width',
                      'height',
                      'viewBox',
                      'preserveAspectRatio'],

  xMargin: 0,

  yMargin: 0,

  xScale: function() {
    return d3.scale.linear();
  }.property('content'),

  yScale: function() {
    return d3.scale.linear();
  }.property('content'),

  xFormatter: function(x) {
    return x;
  },

  yFormatter: function(y) {
    return y;
  },

  redraw: function() {
    this.rerender();
  }.observes('content'),

  didInsertElement: function() {
    var self       = this,
        id         = this.$().attr('id'),
        xScale     = this.get('xScale'),
        yScale     = this.get('yScale'),
        xMargin    = this.get('xMargin'),
        yMargin    = this.get('yMargin'),
        width      = this.get('width'),
        height     = this.get('height'),
        xFormatter = this.get('xFormatter'),
        yFormatter = this.get('yFormatter'),
        xAxis,
        yAxis,
        svg;

    svg = d3.select("#" + id);

    xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickFormat(xFormatter);

    yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(yFormatter);

    svg.append("g").attr("class", "x axis").
      attr("transform", "translate(0," + (height - yMargin) + ")").call(xAxis);

    svg.append("g").attr("class", "y axis").
      attr("transform", "translate(" + xMargin + ", 0)").call(yAxis);

    svg.insert("g", ":first-child").attr("class", "x grid").
        attr("transform", "translate(0," + (height - yMargin) + ")").
          call(xAxis.tickSize(-height + (yMargin * 2), 0, 0).tickFormat(""));

    svg.insert("g", ":first-child").attr("class", "y grid").
        attr("transform", "translate(" + xMargin + ", 0)").
          call(yAxis.tickSize(-width + (xMargin * 2), 0, 0).tickFormat(""));
  }

});
