(function(window) {
    "use strict";
    var io = window.io;
    var $ = window.$;

    // see http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
    function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    var socket = io.connect('/');
    socket.on('post', function (data) {
        var row = $('<div class="row"></div>');
        var highlight = $('<div class="highlight"></div>');
        var code = $('<code class=""></code>');
        var pre = $('<pre></pre>');
        var jsonString = JSON.stringify(data, null, " ");
        $(pre).append(syntaxHighlight(jsonString));
        $(code).append(pre);
        $(highlight).append(code);
        $(row).append(highlight);
        $(row).dblclick(function() {
            $(this).remove();
        });
        $('.content').prepend(row);
    });
})(window);
