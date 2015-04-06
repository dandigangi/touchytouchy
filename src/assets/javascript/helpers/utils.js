
var utils = (function() {

    var module = this;
    module.exports = {};

    module.exports.generateHexColor = function() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    module.exports.classNames = function() {
        var classes = '';
        var arg;

        for (var i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            if (!arg) {
                continue;
            }

            if ('string' === typeof arg || 'number' === typeof arg) {
                classes += ' ' + arg;
            } else if (Object.prototype.toString.call(arg) === '[object Array]') {
                classes += ' ' + classNames.apply(null, arg);
            } else if ('object' === typeof arg) {
                for (var key in arg) {
                    if (!arg.hasOwnProperty(key) || !arg[key]) {
                        continue;
                    }
                    classes += ' ' + key;
                }
            }
        }

        return classes.substr(1);
    }

    return module.exports;
})();
