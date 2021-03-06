var a, b, c;

describe("Types", function(){

  // Everything is of type Atom
  afterEach(function(){
    expect(a instanceof Lisp.Atom).toEqual(true);
  });

  describe("Atom", function(){
    it("is initialized correctly", function(){
      a = new Lisp.Atom();
    })
  });

  describe("Number", function(){
    it("is initialized correctly", function() {
      a = new Lisp.Number(4);  
      b = new Lisp.Number(-2.3);
      c = new Lisp.Number();
      expect(a.value).toEqual(4);
      expect(b.value).toEqual(-2.3);
      expect(c.value).toEqual(undefined);
    });

    it("is converted to string correctly", function() {
      expect("" + a).toEqual("4");
      expect("" + b).toEqual("-2.3");
      expect("" + c).toEqual("NaN");
    });

    it("is of type Number", function() {
      expect(a instanceof Lisp.Number).toEqual(true);
    });
  });

  describe("Nil", function(){

    it("is initialized correctly", function() {
      a = new Lisp.Nil();    
    });

    it("is converted to string correctly", function() {
      expect("" + a).toEqual("()");   
    });

    it("is of type Nil", function() {
      expect(a instanceof Lisp.Nil).toEqual(true);
    });
  });

  describe("True", function(){
    it("is initialized correctly", function() {
      a = new Lisp.True(); 
    });

    it("is converted to string correctly", function() {
      expect("" + a).toEqual("#t");   
    });

    it("is of type True", function() {
      expect(a instanceof Lisp.True).toEqual(true);
    });
  });

  describe("False", function(){

    it("is initialized correctly", function() {
      a = new Lisp.False(); 
    });

    it("is converted to string correctly", function() {
      expect("" + a).toEqual("#f");   
    });

    it("is of type False", function() {
      expect(a instanceof Lisp.False).toEqual(true);
    });
  });

  describe("Symbol", function(){

    it("is initialized correctly", function() {
      a = new Lisp.Symbol("abc"); 
      expect(a.value).toEqual("abc");
    });

    it("is converted to string correctly", function() {
      expect("" + a).toEqual("abc");   
    });

    it("is of type Symbol", function() {
      expect(a instanceof Lisp.Symbol).toEqual(true);
    });

    it("creates only one identical instance of a Symbol", function() {
      var a = new Lisp.Symbol("abc"); 
      var b = new Lisp.Symbol("abc"); 

      expect(a).toBe(b);
    });
  });

  describe("String", function(){

    it("is initialized correctly", function() {
      a = new Lisp.String("(test ( a ) string)"); 
      expect(a.value).toEqual("(test ( a ) string)");
    });

    it("is converted to string correctly", function() {
      expect("" + a).toEqual("(test ( a ) string)");   
    });

    it("is of type String", function() {
      expect(a instanceof Lisp.String).toEqual(true);
    });
  });

  describe("Procedure", function(){
    var plus, minus, mul, div;

    it("is initialized correctly", function() {
      plus = new Lisp.Procedure("+", Lisp.Number, function(args){
        return args[0].value + args[1].value;
      }); 
      minus = new Lisp.Procedure("-", Lisp.Number, function(args){
        return args[0].value - args[1].value;
      }); 
    });

    it("is of type Procedure", function() {      
      expect(plus instanceof Lisp.Procedure).toEqual(true);
    });

    it("is converted to string correctly", function() {
      expect("" + plus).toEqual("#<procedure:+>");   
      expect("" + minus).toEqual("#<procedure:->");
    });

    it("is executed correctly", function() {
      a = new Lisp.Number(1);
      b = new Lisp.Number(2);
      c = new Lisp.Number(3);
      var res = plus.call([a,b]);
      expect(res.value).toEqual(c.value);   
      expect(minus.call([a,b]).value).toEqual(new Lisp.Number(-1).value);   
    });
  });

  describe("List", function(){
    var l, a, b;

    it("is initialized correctly", function() {
      a = new Lisp.Number(1);
      b = new Lisp.Number(2);

      l = new Lisp.List(a, b); 

      expect(l.first()).toBe(a);
      expect(l.rest()).toBe(b);
    });

    it("is converted to string correctly", function() {
      a = new Lisp.Number(1);
      b = new Lisp.Number(2);
      c = new Lisp.Number(3);
      d = new Lisp.Number(4);

      // (cons 1 2)
      l = new Lisp.List(a, b); 

      // (cons 3 4)
      m = new Lisp.List(c, d); 

      // (cons (cons 1 2) (cons 3 4))
      n = new Lisp.List(l, m);

      // (cons 1 (cons 2 (cons 3 4)))
      o = new Lisp.List(a, new Lisp.List(b, new Lisp.List(c, d)));

      expect("" + l).toEqual("(1 . 2)");  

      expect("" + m).toEqual("(3 . 4)");

      expect("" + n).toEqual("((1 . 2) 3 . 4)");

      expect("" + o).toEqual("(1 2 3 . 4)")
    });
  });

});