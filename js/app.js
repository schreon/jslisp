//app.js
var app = angular.module("jslisp",['ngResource','ngSanitize'])
   .config(['$routeProvider',function($routeProvider, $httpProvider, $scope){
        $routeProvider.when('/home',{templateUrl:'partials/home.html'})
        $routeProvider.otherwise({redirectTo:'/home'})

        // TODO - complete
    }]);

app.directive("repl", function() {
    return {
        restrict : 'A',
        scope: {
            repl: '='
        },
        link : function(scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    REPL.newline(element.val(scope.repl));
                    element.val("");
                    event.preventDefault();
                }
            })
        }
    }
});


/*****************************
    LISP types
 *****************************/

var LISP = {};

LISP.Number = function(val) {
  this.type = "Number";
  this.value = parseFloat(val);
  var self = this;
  this.toString = function() {
    return self.value.toString();
  }
  return this;
}

LISP.Boolean = function(val) {
  this.type = "Boolean";
  this.value = val;
  var self = this;
  this.toString = function() {
    if (self.value) {
      return "#t";
    } else {
      return "#f";
    }
  }
  return this;
}

LISP.Nil = function() {
  this.type = "Nil";
  this.value = null
  this.toString = function() {
    return "\'()";
  }
  return this;
}

LISP.String = function(val) {
  this.type = "String";
  this.value = val;
  var self = this;
  this.toString = function() {
    return self.value;
  }
  return this;
}

LISP.Symbol = function(val) {
  this.type = "Symbol";
  this.value = val;
  var self = this;
  this.toString = function() {
    return self.value.toString();
  }
  return this;
}

// TODO:
// Cons, Quoted, Procedure

/*********************************************
  Takes a string x and splits it into tokens.
**********************************************/
function tokenize(x) {
    // Replace comments and linebreaks with a single space each
    x = x.replace(/;+.+\n|\n|\t|\r/g, ' ');

    // Add space around parentheses and quotation marks
    // so we can just split by spaces
    x = x.replace(/"/g, ' " ');
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
   if (token == 'true') return new LISP.Boolean(true);
   if (token == 'false') return new LISP.Boolean(false);

   // Nil ? 
   if (token == 'nil') return new LISP.Nil();

   // Number?
   var val = parseFloat(token);
   if (!isNaN(val)) return new LISP.Number(val);


   // Else it is a symbol
   return new LISP.Symbol(token);
}

function parseLine(s) {
  return read(tokenize(s));
}

var REPL = {};
REPL.history = ["empty"]
REPL.newline = function(line) {
    this.history.push(line);

    console.log(line);
    console.log(tokenize(line));
    console.log(parseLine(line));
}