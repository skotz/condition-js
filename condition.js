//
// Condition-JS by Scott Clayton
// https://github.com/skotz/condition-js
//
var condition = {
    // Raise a callback when a condition is met
    //  > condition     - a method that should return true when a condition is met
    //  > action        - a method to run when the condition is met
    //  > onlyOnce      - whether to execute the action every time the condition is met, or just the first time
    //  > pollFrequency - number of milliseconds between checking whether the condition is met
    on: function(condition, action, onlyOnce, pollFrequency) {
        pollFrequency = pollFrequency || 10;
        onlyOnce = onlyOnce || false;
        var method = function() {
            var conditionMet = condition();
            if (conditionMet) {
                action();
            }
            if (!conditionMet || !onlyOnce) {
                setTimeout(method, pollFrequency);
            }
        };
        method();
    },
    // Raise one of two callbacks depending on whether a condition is met
    // Only fires when the condition changes 
    //  > condition     - a method that should return true when a condition is met
    //  > trueAction    - a method to run when the condition is met
    //  > falseAction   - a method to run when the condition is NOT met
    //  > pollFrequency - number of milliseconds between checking whether the condition is met
    pick: function(condition, trueAction, falseAction, pollFrequency) {
        pollFrequency = pollFrequency || 10;
        var lastValue = 'x';
        var method = function() {
            var conditionMet = condition();
            if (lastValue != conditionMet) {
                lastValue = conditionMet;
                if (conditionMet) {
                    trueAction();
                } else {
                    falseAction();
                }
            }
            setTimeout(method, pollFrequency);
        };
        method();
    },
    // Repeat an action until it returns true
    until: function(action, pollFrequency) {
        pollFrequency = pollFrequency || 10;
        var method = function() {
            if (!action()) {
                setTimeout(method, pollFrequency);
            }
        };
        method();
    },
    // Repeat an action until it doesn't throw an exception
    force: function(action, logInConsole, pollFrequency) {
        pollFrequency = pollFrequency || 10;
        logInConsole = logInConsole || false;
        var method = function() {
            try {
                action();
            } catch (ex) {
                if (logInConsole) {
                    console.warn(ex);
                }
                setTimeout(method, pollFrequency);
            }
        };
        method();
    }
};