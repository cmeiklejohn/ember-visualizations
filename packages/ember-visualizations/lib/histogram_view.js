/*globals d3*/

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

/**
  @class

  HistogramView provides a visualization class for rendering a histogram with axes, margins and gridlines.

  To use, simply instantiate the view with a content binding either pointing to an array of values which
  the histogram will be dervied from, or an array of objects with an x and y attribute for pre-binned
  histograms.

  For example:

      {{view Ember.HistogramView contentBinding="App.irwinHallController.content"}}

**/
Ember.HistogramView = Ember.VisualizationView.extend(
/** @scope Ember.HistogramView.prototype */ {

  histogram: function() {
    var content      = this.get('content'),
        firstElement = content[0];

    if(firstElement.x && firstElement.y) {
      return content;
    } else {
      return d3.layout.histogram()(this.getPath('content'));
    }
  }.property('content').cacheable(),

  xScale: function() {
    var histogram = this.get('histogram'),
        width     = this.get('width'),
        xMargin   = this.get('xMargin');

    Ember.assert("You need to provide a width for the histogram view.", width !== undefined);

    return d3.scale.ordinal().domain(histogram.map(function(d) { return d.x; })).rangeRoundBands([0 + xMargin, width - xMargin]);
  }.property('histogram').cacheable(),

  yScale: function() {
    var histogram = this.get('histogram'),
        height    = this.get('height'),
        yMargin   = this.get('yMargin');

    Ember.assert("You need to provide a height for the histogram view.", height !== undefined);

    return d3.scale.linear().domain([0, d3.max(histogram.map(function(d) { return d.y; }))]).range([height - yMargin, 0 + yMargin]);
  }.property('histogram').cacheable(),

  didInsertElement: function() {
    var self       = this,
        histogram  = this.get('histogram'),
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

    svg.selectAll("rect")
        .data(histogram)
      .enter().append("rect")
        .attr("class", "sample")
        .attr("width", xScale.rangeBand())
        .attr("x", function(d) { return xScale(d.x); })
        .attr("y", function(d) { return yScale(d.y); })
        .attr("height", function(d) { return height - yMargin - yScale(d.y); });

    this._super();
  }

});
