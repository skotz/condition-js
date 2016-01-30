//
// Condition-JS for jQuery by Scott Clayton
// https://github.com/skotz/condition-js
//
(function($) {
    $.fn.condition = function(condition, action, options) {
        var scope = this;
        var settings = $.extend({
            onlyOnce: false,
            pollFrequency: 10
        }, options);
        
        this.each(function() {
            var method = function() {
                var conditionMet = condition.call(scope);
                if (conditionMet) {
                    action.call(scope);
                }
                if (!conditionMet || !settings.onlyOnce) {
                    setTimeout(method, settings.pollFrequency);
                }
            };
            method();
        });
 
        return this;
    }; 
}(jQuery));