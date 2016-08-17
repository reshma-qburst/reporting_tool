app.directive('stackbarchart', function() { // Angular Directive
    return {
        restrict: 'E', // Directive Scope is Element
        replace: true, // replace original markup with template 
        transclude: false, // not to copy original HTML DOM
        compile: function(elem, attrs) { // the compilation of DOM is done here.
            // It is responsible for produce HTML DOM or it returns a combined link function
            // Further Docuumentation on this - http://docs.angularjs.org/guide/directive
            return function($scope) {
                var html = "<div id='" + attrs.id + "' ></div>"; // the HTML to be produced
                var newElem = $(html);
                elem.replaceWith(newElem); // Replacement of the element.
                var ourGraph = new StackbarChart($scope.barchart);
                ourGraph.workOnElement('#' + attrs.id);
                // Work on particular element
                ourGraph.generateGraph(); // generate the actual bar graph
            }
        }
    }
});
