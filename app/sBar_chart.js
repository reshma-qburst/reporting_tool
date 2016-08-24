// properties are directly passed to `create` method
var StackbarChart = Class
    .create({
        initialize: function(data) {
            this.dataJSON = data;
        },
        workOnElement: function(element) {
            this.element = element;
        },
        generateGraph: function() {
            var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 680 - margin.left - margin.right,
                height = 460 - margin.top - margin.bottom;

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1);

            var y = d3.scale.linear()
                .rangeRound([height, 0]);

            var color = d3.scale.ordinal()
                .range(["#98abc5", "#8a89a6", "#7b6888"]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var svg = d3.select(this.element).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var data = this.dataJSON;
            color.domain(d3.keys(data[0]).filter(function(key) {
                return key !== "tripName";
            }));

            data.forEach(function(d) {
                var y0 = 0;
                var y1 = 0;
                d.ages = color.domain().map(function(name) {
                    return {
                        trip: d.tripName,
                        name: name,
                        y0: y0,
                        y1: y0 += d[name]
                    };
                });
                d.total = d.ages[d.ages.length - 1].y1;
            });


            data.sort(function(a, b) {
                return b.total - a.total;
            });


            x.domain(data.map(function(d) {
                return d.tripName;
            }));
            y.domain([0, d3.max(data, function(d) {
                return d.HB + d.RA + d.SC;
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
                .attr("dy", ".71em")
                .style("text-anchor", "end");

            var state = svg.selectAll(".state")
                .data(data)
                .enter().append("g")
                .attr("class", "g")
                .attr("transform", function(d) {
                    return "translate(" + x(d.tripName) + ",0)";
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
                })
                .on("mouseover", function() { tooltip.style("display", null); })
                .on("mouseout", function() { tooltip.style("display", "none"); })
                .on("mousemove", function(d) {

                    var xPosition = d3.event.x - 250;
                    var yPosition = d3.event.y - 150;

                    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                    tooltip.select("text").text(d.trip + ", " + d.name + " : " + (d.y1 - d.y0));
                });

            var legend = svg.selectAll(".legend")
                .data(color.domain().slice().reverse())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                    return "translate(0," + i * 20 + ")";
                });

            legend.append("rect")
                .attr("x", width + 10)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width + 10)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) {
                    return d;
                });

            // Prep the tooltip bits, initial display is hidden
            var tooltip = svg.append("g")
                .attr("class", "tooltip")
                .style("display", "none");

            tooltip.append("rect")
                .attr("width", 90)
                .attr("height", 20)
                .attr("fill", "white")
                .style("opacity", 0.5);

            tooltip.append("text")
                .attr("x", 45)
                .attr("dy", "1.2em")
                .style("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("font-weight", "bold");
        }
    });
