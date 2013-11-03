(function(){
  /*********************************************
    Takes a string x and splits it into tokens.
  **********************************************/
  function tokenize(x) {
      // Replace comments and linebreaks with a single space each
      x = x.replace(/;+.+\n|\n|\t|\r/g, ' ');

      // Add space around parentheses and the outer side of quotation marks
      // so we can just split by spaces
      x = x.replace(/"(.*?)"/g, ' "$1" ');
      x = x.replace(/\(/g, ' ( ');
      x = x.replace(/\)/g, ' ) ');

      // Split by spaces but not if they are inside quotation marks
      tokens = x.split(/("[^"]+"|[^"\s]+)/g);

      // Only return tokens which are not empty
      not_empty = [];
      for (t in tokens) {      
        if ( !/^\s*$/.test(tokens[t])) {
          not_empty.push(tokens[t]);
        }
      }
      return not_empty;
  }

  function read(tokens) {
    if (tokens.length == 0) {
      throw "Unexpected EOF while reading!";
    }

    token = tokens.shift();
    if (token == '(') {    
      var L = [];
      while (tokens[0] != ')') {
        L.push(read(tokens));
      }
      tokens.shift() // Throw away the closing parenthesis    
      return L;
    }

    if (token == ')') {
      throw "Unexpected )";
    }

    // Else, it must be an atom
    return atom(token);
  }

  function atom(token) {
     // Boolean?
     if (token == 'true') return Lisp.True;
     if (token == 'false') return Lisp.False;

     // Nil ? 
     if (token == 'nil') return new Lisp.Nil();

     // Number?
     var val = parseFloat(token);
     if (!isNaN(val)) return new Lisp.Number(val);

     // Else it is a symbol
     return new Lisp.Symbol(token);
  }

  function parseLine(s) {
    return read(tokenize(s));
  }

  if (!window.Lisp) window.Lisp = {};
  window.Lisp.parser = {};
  window.Lisp.parser.tokenize = tokenize;
  window.Lisp.parser.read = read;
  window.Lisp.parser.atom = atom;
  window.Lisp.parser.parseLine = parseLine;

})(window);
