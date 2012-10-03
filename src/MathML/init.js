// ## <a id="MathML"></a>MathML
// The MathML implementation of MathLib parses and creates content MathML.


prototypes.MathML = {};
MathLib.MathML = function (MathMLString) {
  var tokenizer = new DOMParser(),
      MathMLdoc,
      MathML;

  if (typeof MathMLString !== 'string') {
    MathMLString = MathMLString.toContentMathML();
  }


  // Remove the Linebreaks ...
  MathMLString = MathMLString.replace(/\n/g, ''); 

  // ... and the unnecessary whitespace
  MathMLString = MathMLString.replace(/((?!cs)[^>]{2})>(\s)*</g, '$1><');

  // Replace &InvisibleTimes; etc. before parsing
  MathMLString = MathMLString.replace(/&(\w*);/g, '#$1;');
    
  // Gives an error in Firefox
  /* MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml'); */
  MathMLdoc = tokenizer.parseFromString(MathMLString, 'application/xml');

  var createToken,
      curToken = null,
      tokenStack = [];


  createToken = function (t) {
    var attributes = {}, i, ii;
    if(t.attributes) {
      for (i=0, ii=t.attributes.length; i<ii; i++) {
        attributes[t.attributes[i].name] =  t.attributes[i].value;
      }
    }
    
    //var newToken = Object.create(tokenPrototype, {
    var newToken = Object.create({}, {
      attributes: {value: attributes},
      nodeName:   {value: t.nodeName},
      parentNode: {value: tokenStack[tokenStack.length-1]},
      prevNode:   {value: curToken}
    });


    if(curToken) {
      curToken.nextNode = newToken;
    }
    curToken = newToken;

    tokenStack.push(newToken);
    newToken.childNodes = Array.prototype.slice.call(t.childNodes).map(createToken);
    tokenStack.pop();

    var attributesString = function (x) {
      var str = '', attr;
      for (attr in x.attributes) {
        if (x.attributes.hasOwnProperty(attr)){
          str += ' ' + attr + '="' + x.attributes[attr] + '"'; 
        }
      }
      return str;
    };

    if (newToken.childNodes.length !== 0) {
      newToken.innerMathML = newToken.childNodes.reduce(function(prev, cur, index, array){return prev + cur.outerMathML;}, '');
    }
    else {
      newToken.innerMathML = '';
    }

    if (newToken.childNodes.length === 0) {
      if (newToken.nodeName === '#text') {
        // Restore &InvisibleTimes; etc.
        newToken.outerMathML = t.textContent.replace(/#(\w*);/g, '&$1;')
      }
      else {
        newToken.outerMathML = '<' + newToken.nodeName + attributesString(newToken) + '/>';
      }
    }
    else {
      newToken.outerMathML = '<' + newToken.nodeName + attributesString(newToken) + '>' + newToken.innerMathML + '</' + newToken.nodeName + '>';
    }

    if (newToken.nodeName === 'lambda') {
      newToken.bvars = [];
      for (i=0, ii=newToken.childNodes.length; i<ii; i++) {
        if (newToken.childNodes[i].nodeName === 'bvar') {
          newToken.bvars.push(newToken.childNodes[i].childNodes[0].innerMathML);
        }
        else if (newToken.childNodes[i].nodeName === 'domainofapplication') {
          newToken.domainofapplication = newToken.childNodes[i];
        }
        else if (newToken.childNodes[i].nodeName === 'apply') {
          newToken.apply = newToken.childNodes[i];
        }
      }
    }

    return newToken;
  };

  MathML = createToken(MathMLdoc.childNodes[0]);


  MathML[proto] = prototypes.MathML;
  var res = Object.create(prototypes.MathML, {
      attributes:  {value: MathML.attributes},
      childNodes:  {value: MathML.childNodes},
      innerMathML: {value: MathML.innerMathML},
      outerMathML: {value: MathML.outerMathML},
      nodeName:    {value: MathML.nodeName},
      nextNode:    {value: MathML.nextNode},
      parentNode:  {value: null},
      prevNode:    {value: null}
  });
  return res;
};


// Setting the .constructor property to MathLib.MathML  
MathLib.extendPrototype('MathML', 'constructor', MathLib.MathML);


// Setting the .type property to 'MathML'
MathLib.extendPrototype('MathML', 'type', 'MathML');


/*
var tokenPrototype = {
  toString: function () {
      var handlers = {
      apply: function (n) {
        var f = n.childNodes[0],
            args = n.childNodes.slice(1).map(function(x) {
              return x.toString();
            }),
            str = '';

        if (f.nodeName === 'plus') {
          str = args.join('+');
        }
        else if (f.nodeName === 'times') {
          str = args.join('*');
        }
        else if (f.nodeName === 'power') {
          str = args[0] + '^' + args[1];
        }
        else {
          str = f.nodeName + '(' + args.join(', ') + ')';
        }
        return str;
      },
      bvar: function () {return '';},
      ci: function (n) {return n.innerMathML;},
      cn: function (n) {return n.innerMathML;},
      cs: function (n) {return n.innerMathML;},
      domainofapplication: function () {return '';},
      lambda: function (n) {
        return n.childNodes.reduce(function(old, cur) {
          return old + cur.toString();
        });
      }, 
      '#text': function (n) {return n.innerMathML;}
    };
    return handlers[this.nodeName](this); 
  }

};
*/

