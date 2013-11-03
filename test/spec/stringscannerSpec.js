describe("Stringscanner", function(){

  it('does create a new stringscanner', function(){
    var string = "";
    var stringscanner = new Lisp.Stringscanner(string);
  });

  it('does peek correctly', function(){
    var string = "dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string);
    for (var i = 0; i < string.length; i++) {
      expect(stringscanner.peek(i)).toEqual(string[i]);
    }
  });

  it('does traverse the string using the next method', function(){
    var string = "dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string);
    for (var i = 0; i < string.length; i++) {
      expect(stringscanner.next()).toEqual(string[i]);
    }
  });

  it('matches searched substrings correctly', function(){
    var string = "dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string);
    expect(stringscanner.matches("dies")).toEqual(true);
    expect(stringscanner.matches("das")).toEqual(false);
  });

  it('matches one of multiple searchstrings correctly', function(){
    var string = "dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string);
    expect(stringscanner.matches(["das", "ist", "Test"])).toEqual(false);
    expect(stringscanner.matches(["das", "ist", "dies"])).toEqual(true);
  })

  it('reaches the end', function(){
    var string = "dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string);
    for (var i = 0; i < string.length; i++) {
      expect(stringscanner.end()).toEqual(false);
      stringscanner.next();
    }
    expect(stringscanner.end()).toEqual(true);
    // another call to next should still be at end
    stringscanner.next();
    expect(stringscanner.end()).toEqual(true);
  });

  it('skips whitespace', function(){
    var string = "   dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string); 

    expect(stringscanner.matches("dies")).toEqual(false);

    stringscanner.skipWhitespace();

    expect(stringscanner.matches("dies")).toEqual(true);
  });

  it('seeks until the next match is found', function() {
    var string = "   dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string); 

    expect(stringscanner.matches("ist")).toEqual(false);

    stringscanner.until(["ein", "ist"]);

    expect(stringscanner.matches("ist")).toEqual(true);

    stringscanner.until(["gibtsnicht"]);
  });

  it('consumes substrings', function(){
    var string = "dies ist \n  ein Test";
    var stringscanner = new Lisp.Stringscanner(string);  
    
    expect(function() { stringscanner.consume("wurst"); }).toThrow("Unexpected: d - Expected: wurst");

    expect(stringscanner.matches("dies")).toEqual(true);

    stringscanner.consume("dies");

    expect(stringscanner.matches("dies")).toEqual(false);

    stringscanner.skipWhitespace();

    expect(stringscanner.matches("ist")).toEqual(true);

    stringscanner.consume("i");

    expect(stringscanner.matches("st")).toEqual(true);
  });
});