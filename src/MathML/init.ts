// ## <a id="MathML"></a>MathML
// The MathML implementation of MathLib parses and creates content MathML.

export class MathML {

  type = 'MathML';

  constructor(MathMLString: string) {
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
    //* MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml'); *
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
          newToken.outerMathML = t.textContent.replace(/#(\w*);/g, '&$1;');
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



    this.attributes = MathML.attributes;
    this.childNodes = MathML.childNodes;
    this.innerMathML = MathML.innerMathML;
    this.outerMathML = MathML.outerMathML;
    this.nodeName = MathML.nodeName;
    this.nextNode = MathML.nextNode;
    this.parentNode = null;
    this.prevNode = null;
   
  }