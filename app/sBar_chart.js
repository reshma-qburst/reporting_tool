// properties are directly passed to `create` method
var StackbarChart = Class
    .create({
        initialize: function(yaxisName, yaxisPos) {

            this.yaxisName = yaxisName;
            this.yaxisPos = yaxisPos;

        },
        workOnElement: function(element) {
            this.element = element;
        },
        generateGraph: function() {
            //d3 specific coding
            var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .rangeRound([height, 0]);

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickFormat(d3.format(".2s"));

            var svg = d3.select(this.element).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            /*d3.json(this.datajson, function(error, data) {*/

            var data = [{
                "State": "AL",
                "Under 5 Years": 10,
                "5 to 13 Years": 20,
                "14 to 17 Years": 30,
                "18 to 24 Years": 40,
                "25 to 44 Years": 50,
                "45 to 64 Years": 60,
                "65 Years and Over": 70
            }]
            color.domain(d3.keys(data[0]).filter(function(key) {
                return key !== "State";
            }));

            data.forEach(function(d) {
                var y0 = 0;
                d.ages = color.domain().map(function(name) {
                    return { name: name, y0: y0, y1: y0 += +d[name] };
                });
                d.total = d.ages[d.ages.length - 1].y1;
            });

            data.sort(function(a, b) {
                return b.total - a.total;
            });

            x.domain(data.map(function(d) {
                return d.State;
            }));
            y.domain([0, d3.max(data, function(d) {
                return d.total;
            })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", this.yaxisPos)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(this.yaxisName);

            var state = svg.selectAll(".state")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function(d) {
                    return "translate(" + x(d.State) + ",0)";
                });

            state.selectAll("rect")
                .data(function(d) {
                    return d.ages;
                })
                .enter().append("rect")
                .attr("width", x.rangeBand())
                .attr("y", function(d) {
                    return y(d.y1);
                })
                .attr("height", function(d) {
                    return y(d.y0) - y(d.y1);
                })
                .style("fill", function(d) {
                    return color(d.name);
                });

            var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) {
                    return d;
                });
            /*}.bind(this));
             */
        }
    });
