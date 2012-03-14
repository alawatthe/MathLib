// ## MathML
// The MathML implementation parses Content MathML.
prototypes.MathML = {};
MathLib.MathML = function (MathMLString) {
  var tokenizer = new DOMParser(),
      MathML;

  // Remove the Linebreaks ...
  MathMLString = MathMLString.replace(/\n/g, ''); 

  // and the unnecessary whitespace
  MathMLString = MathMLString.replace(/>\s*<(\w)/g, '><$1'); 
  MathMLString = MathMLString.replace(/<\/(\w+)>\s*<\/(\w)/g, '</$1></$2'); 

  // Gives an error in Firefox
  /* MathML = tokenizer.parseFromString(MathMLString, 'application/mathml+xml'); */
  MathML = tokenizer.parseFromString(MathMLString, 'application/xml');

  MathML[proto] = prototypes.MathML;
  Object.defineProperties(MathML, {
    // Setting the constructor this way fails in Safari
    constructor: {
      value: MathLib.MathML
    }
  });
  return MathML;
};


// Setting the .constructor property to MathLib.MathML  
// Setting it this way fails in all browsers except Chrome
/* MathLib.extendPrototype('MathML', 'constructor', MathLib.MathML); */

// Setting the .type property to 'MathML'
MathLib.extendPrototype('MathML', 'type', 'MathML');


// ### MathML.prototype.parse()
// Parses the MathML.
//
// *@return{number|a MathLib object}*  The result of the parsing
MathLib.extendPrototype('MathML', 'parse', function (math) {
  var createTreeWalker, apply, matrixrow, matrix, number, parser, set, vector;

  createTreeWalker = function (node) {
    return document.createTreeWalker(
      node,
      NodeFilter.SHOW_ELEMENT,
      { acceptNode: function(node) {return NodeFilter.FILTER_ACCEPT; } },
      false
    );
  };

  parser = function (start) {
    var treeWalker = createTreeWalker(start);
     
    do {
      var node = treeWalker.currentNode,
          name = node.nodeName;

      if (name === 'cn') {
        return number(node);
      }
      else if (name === 'apply') {
        return apply(node);
      }
      else if (name === 'cs') {
        return node.textContent;
      }
      else if (name === 'matrix') {
        return matrix(node);
      }
      else if (name === 'set') {
        return set(node);
      }
      else if (name === 'vector') {
        return vector(node);
      }
      // For the first node
      else if (name === '#document') {
        if (node.childNodes.length === 1) {
          return parser(node.childNodes[0]);
        }
        else {
          return Array.prototype.slice.call(node.childNodes).map(parser);
        }
      }
    }
    while (treeWalker.nextNode() !== null);
  };

  apply = function (node) {
    var children = Array.prototype.slice.call(node.childNodes),
        funcName = children.shift().nodeName,
        names = {
          rem: 'mod',
          union: 'or',
          intersection: 'and',
          setdifference: 'without' 
        };

    if (funcName in names) {
      funcName = names[funcName];
    }

    if(funcName in MathLib) {
      if (children.length === 1) {
        return MathLib[funcName](parser(children[0]));
      }
      else {
        return MathLib[funcName](children.map(parser));
      }
    }
    else {
      var child = parser(children.shift());
      if (children.length === 1) {
        return child[funcName](parser(children[0]));
      }
      else {
        return child[funcName](children.map(parser));
      }
    }
  };

  matrix = function (node) {
    return MathLib.matrix(Array.prototype.slice.call(node.childNodes).map(matrixrow));
  };

  matrixrow = function (node) {
    return Array.prototype.slice.call(node.childNodes).map(parser);
  };

  number = function (node) {
    var type = node.getAttribute('type') !== null ? node.getAttribute('type') : 'number';

    if(type === 'number') {
      /* TODO: base conversions
      var base = node.getAttribute('base') !== null ? node.getAttributes('base') : '10'; */
      return +node.textContent;
    }
    else if (type === 'complex-cartesian') {
      return MathLib.complex([+node.childNodes[0].textContent, +node.childNodes[2].textContent]);
    }
    else if (type === 'complex-polar') {
      return MathLib.complex(+node.childNodes[0].textContent, +node.childNodes[2].textContent);
    }
  };

  set = function (node) {
    var type = node.getAttribute('type') !== null && node.getAttribute('type') === 'multiset' ? true : false;
    return MathLib.set(Array.prototype.slice.call(node.childNodes).map(parser), type);
  };

  vector = function (node) {
    return MathLib.vector(Array.prototype.slice.apply(node.childNodes).map(parser));
  };

  return parser(this);
});


// ### MathML.isSupported()
// Checks if MathML is supported by the browser.  
// Code stolen from Modernizr (http://www.modernizr.com/)
//
// *@return {boolean}*
MathLib.extend('MathML', 'isSupported', function () {
  var hasMathML = false,
      ns, div, mfrac;
  if ( document.createElementNS ) {
    ns = 'http://www.w3.org/1998/Math/MathML';
    div = document.createElement('div');
    div.style.position = 'absolute';
    mfrac = div.appendChild(document.createElementNS(ns,'math'))
                 .appendChild(document.createElementNS(ns,'mfrac'));
    mfrac.appendChild(document.createElementNS(ns,'mi'))
         .appendChild(document.createTextNode('xx'));
    mfrac.appendChild(document.createElementNS(ns,'mi'))
         .appendChild(document.createTextNode('yy'));
    document.body.appendChild(div);
    hasMathML = div.offsetHeight > div.offsetWidth;
    document.body.removeChild(div);
  }
  return hasMathML;
});


// ### MathML.loadMathJax()
// Loads MathJax dynamically.
//
// *@param{string}* [config] Optional config options
MathLib.extend('MathML', 'loadMathJax', function (config) {
  var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src  = 'http://cdn.mathjax.org/mathjax/latest/MathJax.js';

    config = config || 'MathJax.Hub.Config({' +
                         'config: ["MMLorHTML.js"],' +
                         'jax: ["input/TeX","input/MathML","output/HTML-CSS","output/NativeMML"],' +
                         'extensions: ["tex2jax.js","mml2jax.js","MathMenu.js","MathZoom.js"],' +
                         'TeX: {' +
                           'extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]' +
                         '}' +
                       '});';

    if (window.opera) {
      script.innerHTML = config;
    }
    else {
      script.text = config;
    }

    document.getElementsByTagName('head')[0].appendChild(script);
});


// ### MathML.write()
// Writes MathML to an element.
//
// *@param{id}* The id of the element in which the MathML should be inserted.  
// *@param{math}* The MathML to be inserted.
MathLib.extend('MathML', 'write', function (id, math) {
  document.getElementById(id).innerHTML = '<math>' + math + '</math>';
  if (typeof MathJax !== 'undefined') {
    formula = MathJax.Hub.getAllJax(id)[0];
    MathJax.Hub.Queue(['Typeset', MathJax.Hub, id]);
  }
});
