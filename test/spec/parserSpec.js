var a, b, c;

describe("Tokenizer", function(){
  it('should ignore comments', function(){
    var tokenized = Lisp.parser.tokenize('(if (eq? 1 1)\n true\n ;else\n false)')
    var expected = Lisp.parser.tokenize('(if (eq? 1 1) true false)')
    expect(tokenized).toEqual(expected)
  });

  it('should deal with missing space before and after opening brackets', function(){
    var tokenized = Lisp.parser.tokenize(' ( + 2 3 (* 4 5))');
    var expected = ['(', '+', '2', '3', '(', '*', '4', '5', ')', ')'];
    expect(tokenized).toEqual(expected)
  });

  it('should deal with missing space before and after closing brackets', function(){
    var tokenized = Lisp.parser.tokenize('(+ 2 3(* 4 5 ) ) ');
    var expected = ['(', '+', '2', '3', '(', '*', '4', '5', ')', ')'];
    expect(tokenized).toEqual(expected)
  });

  it('should remove lots of extra whitespace', function(){
    var tokenized = Lisp.parser.tokenize(' (  +   2 \n 3 (* 4 \n 5 ) ) ');
    var expected = ['(', '+', '2', '3', '(', '*', '4', '5', ')', ')'];
    expect(tokenized).toEqual(expected)
  });

  it('should deal with quotes', function(){
    var tokenized = Lisp.parser.tokenize('\'(x y z)');
    var expected = ["\'", "(", "x",  "y",  "z", ")"];
    expect(tokenized).toEqual(expected);
  });

  it('should deal with strings', function(){
    var tokenized = Lisp.parser.tokenize('"  this is a string, Hello! "');
    var expected = ['"  this is a string, Hello! "'];
    expect(tokenized).toEqual(expected);

    var tokenized = Lisp.parser.tokenize('("  this is a string, Hello! ")');
    var expected = ['(', '"  this is a string, Hello! "', ')'];
    expect(tokenized).toEqual(expected);
  });

});

describe("Reader", function(){
  it('should parse True', function(){
    var parsed = Lisp.parser.read(['true']);
    expect(parsed).toBe(Lisp.True);
  });

  it('should parse False', function(){
    var parsed = Lisp.parser.read(['false']);
    expect(parsed).toBe(Lisp.False);
  });

  it('should parse Integer as Number', function(){
    var parsed = Lisp.parser.read(['1']);
    expect(parsed.value).toEqual(1);
    expect(parsed.toString()).toEqual("1");
  });

  it('should parse Floats as Number', function(){
    var parsed = Lisp.parser.read(['3.14159265359']);
    expect(parsed.value).toEqual(3.14159265359);
    expect(parsed.toString()).toEqual("3.14159265359");
  });

  // TODO: quoted
});