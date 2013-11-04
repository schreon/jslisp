var a, b, c;

describe("Parser", function(){

  it('is initialized correctly', function() {
    var input = "(cons 1 2)";
    var parser = new Lisp.Parser(input);
  });

  it('parses True', function(){
    var input = " true  ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.True).toEqual(true);

    var input = "  #t    ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.True).toEqual(true);
  });

  it('parses False', function(){
    var input = " false  ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.False).toEqual(true);

    var input = "  #f    ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.False).toEqual(true);
  });

  it('parses Nil', function(){
    var input = " nil  ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.Nil).toEqual(true);
  });

  it('reads Strings', function(){
    var input = "  \"Guten Tag!\"  ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.String).toEqual(true);
    expect(parsed.value).toEqual("Guten Tag!");
  });

  it('reads a List', function(){
    var input = "  (a 1 2)  ";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();

    expect(parsed instanceof Lisp.List).toEqual(true);
    expect(parsed.first() instanceof Lisp.Atom).toEqual(true);
    expect(parsed.rest() instanceof Lisp.List).toEqual(true);
    expect(parsed.rest().first() instanceof Lisp.Number).toEqual(true);
    expect(parsed.rest().rest() instanceof Lisp.Number).toEqual(true);
  });

  it('reads Quoted Atom', function(){
    var input = "'  test";
    var parser = new Lisp.Parser(input);
    var parsed = parser.read();
    expect(parsed instanceof Lisp.Quoted).toEqual(true);
    expect(parsed.value instanceof Lisp.Symbol).toEqual(true);
    expect("" + parsed.value).toEqual("test");
    expect("" + parsed).toEqual("test");
  });

  // it('reads Quoted List', function(){
  //   var input = "'  ( Guten Tag  )";
  //   var parser = new Lisp.Parser(input);
  //   var parsed = parser.read();
  //   expect(parsed instanceof Lisp.Quoted).toEqual(true);
  //   expect(parsed.value instanceof Lisp.List).toEqual(true);
  //   expect("" + parsed.value).toEqual("(Guten Tag)");
  //   expect("" + parsed).toEqual("(Guten Tag)");
  // });

  // it('should parse False', function(){
  //   var parsed = Lisp.parser.read(['false']);
  //   expect(parsed instanceof Lisp.False).toEqual(true);
  // });

  // it('should parse Integer as Number', function(){
  //   var parsed = Lisp.parser.read(['1']);
  //   expect(parsed.value).toEqual(1);
  //   expect(parsed.toString()).toEqual("1");
  // });

  // it('should parse Floats as Number', function(){
  //   var parsed = Lisp.parser.read(['3.14159265359']);
  //   expect(parsed.value).toEqual(3.14159265359);
  //   expect(parsed.toString()).toEqual("3.14159265359");
  // });
});


