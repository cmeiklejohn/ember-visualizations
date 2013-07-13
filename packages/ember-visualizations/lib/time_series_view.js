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

  TimeSeriesView provides a visualization class for rendering a
  single-line time series graph, with axes, and gridlines.

  To use, simply instantiate the view with a content binding either
  pointing to an array of objects, each containing an x and y attribute.

  For example:

      {{view Ember.TimeSeriesView contentBinding="content"}}

**/
Ember.TimeSeriesView = Ember.VisualizationView.extend(
/** @scope Ember.TimeSeriesView.prototype */ {

  path: function() {
    var content = this.get('content'),
        xScale  = this.get('xScale'),
        yScale  = this.get('yScale');

    return d3.svg.line().
      interpolate("linear").
      x(function(d) { return xScale(d.x); }).
      y(function(d, i) { return yScale(d.y); })(content);
  }.property('content'),

  xScale: function() {
    var content       = this.get('content'),
        width         = this.get('width'),
        xMargin       = this.get('xMargin'),
        first_sample  = content[0],
        last_sample   = content[content.length-1];

    if(first_sample && last_sample) {
      return d3.time.scale().
        domain([first_sample.x, last_sample.x]).
        range([0 + xMargin, width - xMargin]);
    }
  }.property('content'),

  yScale: function() {
    var content = this.get('content'),
        height  = this.get('height'),
        yMax    = this.get('yMax'),
        yMargin = this.get('yMargin');

    return d3.scale.linear().domain([0, yMax]).range([height - yMargin, 0 + yMargin]);
  }.property('content').cacheable(),

  yMax: function() {
    var content = this.get('content');

    return d3.max(content.map(function(el) { return parseFloat(el.y); }));
  }.property('samples').cacheable(),

  didInsertElement: function() {
    var self       = this,
        path       = this.get('path'),
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

    svg.append("g").append("path").
      attr("class", "series").attr("d", path);

    this._super();
  }

});

