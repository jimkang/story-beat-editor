function renderBeat(beat) {
  console.log(beat);
  renderValue('', beat);
}

function renderValue(path, value) {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      renderArray(path, value);
    } else {
      renderObject(path, value);
    }
  } else {
    let element = document.querySelector(`[data-of="${path}"]`);
    if (!element) {
      console.log('Could not find element for', path);
    } else {
      setElementValue(element, value);
    }
  }
}

function setElementValue(element, value) {
  if (element.tagName === 'INPUT') {
    element.value = value;
  } else {
    element.textContent = value;
  }
}

// Assumes the elements already exist.
function renderObject(path, object) {
  for (var key in object) {
    let value = object[key];
    let nextPath = path;
    if (nextPath) {
      nextPath += '/';
    }
    nextPath += key;
    renderValue(nextPath, value);
  }
}

// Assumes that the parent of the elements that will
// hold the array values already exits.
// Assumes that arrays contain only values, not objects
// or other arrays.
function renderArray(path, array) {
  var rootElement = document.querySelector(`[data-ofroot="${path}"]`);
  var oldChildren = rootElement.querySelectorAll(`[data-of="${path}"]`);
  for (var i = oldChildren.length - 1; i >= 0; --i) {
    oldChildren[i].remove();
  }
  var template = document.querySelector(`[data-oftemplate="${path}"`);
  for (var j = 0; j < array.length; ++j) {
    let clone = document.importNode(template.content, true);
    rootElement.appendChild(clone);
  }

  // Setting the child values on separate pass because
  // you can't use querySelector on imported templates.

  // The template may contain extra elements supplementary
  // to the element that should receive the value.
  // So, these selected elements may not correspond to
  // the templates.
  var newChildren = rootElement.querySelectorAll(`[data-of="${path}"]`);
  for (var k = 0; k < newChildren.length; ++k) {
    setElementValue(newChildren[k], array[k]);
  }
}

module.exports = renderBeat;
