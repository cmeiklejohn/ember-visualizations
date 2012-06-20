App = Ember.Application.create();

App.histogramController = Ember.ArrayController.create({
  content: [],

  xFormatter: function(x) {
    return x.toFixed(2);
  },

  init: function() {
    var s;

    for (var i = 0; i < 10000; i++) {
      for (var s = 0, j = 0; j < 10; j++) {
        s += Math.random();
      }
      this.content.pushObject(s);
    }
  }
});

App.timeSeriesController = Ember.ArrayController.create({
  content: [],

  xFormatter: function(x) {
    return d3.time.format("%m-%d")(x);
  },

  init: function() {
    var y, currentDate;

    for (var i = 1; i < 30; i++) {
      currentDate = new Date("12/" + i + "/2011");
      this.content.pushObject({ x: currentDate, y: (Math.random() * 100) / 10 });
    }
  }
});
