(function(window){
  "use strict";
  var Lisp = window.Lisp;
  var Stringscanner = Lisp.Stringscanner;
  
  var WHITESPACE = [" ", "\n", "\t"];
  var ATOMEND = WHITESPACE.concat(['(', ')']);



  var Parser = function(input) {
    var scanner = new Stringscanner(input);

    // Reads an atom and returns a new Lisp Object
    function readAtom() {
      var atom = scanner.until(ATOMEND);

      // True
      if((atom === 'true') || (atom === '#t')) {
        return new Lisp.True();
      }

      // False
      if((atom === 'false') || (atom === '#f')) {
        return new Lisp.False();
      }

      // Nil
      if(atom === 'nil') {
        return new Lisp.Nil();
      }

      // Number
      if(atom.match(/^[\+\-]?((\d+)|(\d+\.\d*)|(\d*\.\d+))$/))
        return new Lisp.Number(atom);

      // Symbol
      if(atom.match(/[^\s\(\)\,]+/))
        return new Lisp.Symbol(atom);

      else throw("Unexpected Atom: "+atom);
    }

    function readString() {
      scanner.consume("\"");
      var value = scanner.until("\"");
      scanner.consume("\"");
      return new Lisp.String(value);
    }

    function readList() {
      scanner.consume("(");

      var first = read();
      var second = read();
      var third = read();

      scanner.consume(")");

      var rest = new Lisp.List(second, third);

      return new Lisp.List(first, rest);
    }

    // Public read function
    function read() {
      // Skip whitespace
      scanner.skipWhitespace();

      if (scanner.matches("\"")) return readString();

      if (scanner.matches("(")) return readList();

      // If nothing else matches, read Atom
      return readAtom();
    }


    // Return Object with public functions
    return {
      read : read
    }
  }

  if (!window.Lisp) window.Lisp = {};
  window.Lisp.Parser = Parser;

})(window);
