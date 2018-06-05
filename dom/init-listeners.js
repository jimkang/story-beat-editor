var d3 = require('d3-selection');
var of = require('object-form');

var listenersInit = false;
var objectFromDOM = of.ObjectFromDOM({});

function initListeners({ addToRoute, saveBeatFlow }) {
  if (listenersInit) {
    return;
  }
  listenersInit = true;

  d3.select('#load-beat-button').on('click', onLoadBeat);
  d3.select('#submit-beat-button').on('click', onSaveBeat);

  function onLoadBeat() {
    addToRoute(getValueDict(['storyId', 'beatSeq']));
  }

  function onSaveBeat() {
    saveBeatFlow({
      beat: objectFromDOM(window.document.getElementById('beat-form')),
      user: document.getElementById('user-field').value,
      email: document.getElementById('email-field').value
    });
  }
}

function getValueDict(keys) {
  var dict = {};
  keys.forEach(addEntryForKey);
  return dict;

  function addEntryForKey(key) {
    dict[key] = getValueForFormField(key);
  }
}

function getValueForFormField(formKey) {
  var field = d3.select(`input[data-of=${formKey}]`);
  return field.node().value || field.attr('value');
}

 
module.exports = initListeners;
