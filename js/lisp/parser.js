(function(window){
  "use strict";
  var Lisp = window.Lisp;
  var Stringscanner = Lisp.Stringscanner;
  
  var WHITESPACE = [" ", "\n", "\t"];

  var Parser = function(input) {
    var scanner = new Stringscanner(input);

    function read() {
      // Skip whitespace
      scanner.skipWhitespace();

      scanner.print();
      
      if(scanner.matches("true")) {
        scanner.consume("true");
        return new Lisp.True();
      }
    }
    // Return Object with public functions
    return {
      read : read
    }
  }

  if (!window.Lisp) window.Lisp = {};
  window.Lisp.Parser = Parser;

})(window);
