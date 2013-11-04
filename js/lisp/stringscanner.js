(function(window){
"use strict";

var WHITESPACE = [' ', '\n', '\t'];

var Stringscanner = function(string) {
    var cursor = 0;

    // Return the character at the given position relative to the current cursor
    function peek(offset) {
        return string.charAt(cursor + (offset || 0));
    }

    // Return character at current position and move cursor by 1
    function next() {
        if (cursor < string.length) return string.charAt(cursor++);
    }

    // If the given searchstring matches the current position, return true
    function matches(search) {
      if (typeof search === "string") search = [search];

      var searchstring;
      for (var i=0; i < search.length; i++) {
        searchstring = search[i];
        if (string.substring(cursor, cursor+searchstring.length) === searchstring)
          return true;
      }

      return false;
    }

    // Indicates whether the cursor has reached the end of the string
    function end() {
      if (cursor < string.length)
        return false;
      return true;
    }

    // Move cursor to the next non-whitespace character
    function skipWhitespace() {      
      while (matches(WHITESPACE)) { cursor += 1 };      
    }

    // Skip comment until linebreak
    function skipComment() {
      if (peek() === ';') {
        while (!matches("\n")) { cursor += 1 }
      }
    }

    // Seeks until it matches one of search
    function until(search) {
      while (!matches(search) && cursor < string.length) cursor++;
    }

    // Consumes the expected string, else throws an error
    function consume(consumestring) {
      while (!matches(consumestring))
        throw "Unexpected: " + peek() +" - Expected: " + consumestring;

      cursor += consumestring.length;
    }

    // Return object with public functions
    return {
      peek : peek,
      next : next,
      matches : matches,
      end : end,
      skipWhitespace : skipWhitespace,
      skipComment : skipComment,
      until : until,
      consume : consume,
      print : function() {
        console.log(string.substring(cursor, string.length));
      }
    }
}

if (!window.Lisp) window.Lisp = {};
window.Lisp.Stringscanner = Stringscanner;

})(window);
