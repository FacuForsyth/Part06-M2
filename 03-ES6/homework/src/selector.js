var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  //startEl salta los primeros elem del arbol : htlm y head . empieza por el .body

  // TU CÓDIGO AQUÍ
  if(matchFunc(startEl)) resultSet.push(startEl);

  for (let i=0; i < startEl.children.length; i++) {
    let element = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...element];

  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag
/* 
selectorTypeMarcher(selector: '#primero') -- id
selectorTypeMarcher(selector: '.segundo') -- class
selectorTypeMarcher(selector: 'div') -- tag
selectorTypeMarcher(selector: 'div.tercero') -- tag.class
*/
var selectorTypeMatcher = function(selector) {
  // tu código aquí
  if(selector[0] === '#') return 'id';
  if(selector[0] === '.') return 'class';
  if(selector.split('.').length > 1) return 'tag.class';
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
   matchFunction = (el)=> {return '#' + el.id === selector;}

  } else if (selectorType === "class") {
    matchFunction = (el)=> {
      let clases = el.classList;  // un array con la lista de clases
      for (let i = 0; i < clases.length; i++) {
        if(`.${clases[i]}` === selector) return true;
      }
      return false;

      /*clases.forEach(element => {
        if(`.${element}` === selector) return true;
      });
      return false*/
    }
  } else if (selectorType === "tag.class") {
    matchFunction = (el)=> {
      var [tagBuscado, classBuscada] = selector.split('.');  //['p', 'small']
      return el.classList.contains(classBuscada) && el.tagName.toLowerCase() === tagBuscado.toLowerCase();
      //return matchFunctionMaker(tagBuscado)(el) && matchFunctionMaker(selector `.${classBuscada}`)(el); //selector : 
    }

  } else if (selectorType === "tag") {
    matchFunction = (el)=> {
      //el.tagName = 'DIV'  en mayusculas
      //el.tagName.toLowerCase() = 'div' minusculas
      return el.tagName.toLowerCase() === selector;
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
