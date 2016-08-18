(function() {
    'use-strict';
    app.directive('barChart', function() {
        var chart = d3.custom.barChart();
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="chart"></div>',
            scope: {
                height: '=height',
                data: '=data',
                hovered: '&hovered'
            },
            link: function(scope, element, attrs) {

                var chartEl = d3.select(element[0]);

                chart.on('customHover', function(d, i) {
                    scope.hovered({ args: d });
                });

                scope.$watch('data', function(newVal, oldVal) {
                    chartEl.datum(newVal).call(chart);
                });
            }
        }
    });
})();
