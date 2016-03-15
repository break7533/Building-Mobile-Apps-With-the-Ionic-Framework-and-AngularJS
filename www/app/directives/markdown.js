(function() {
    'use strict';

    angular.module('eliteApp').directive('markdown', [markdown]);
    
    function markdown() {
        // Usage:
        // <div data-markdown="{{vm.content}}"></div>

        var converter = new showdown.Converter();

        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('markdown', function (value) {
                var markup = converter.makeHtml(value);
                element.html(markup);
            });
        }
    }
})();