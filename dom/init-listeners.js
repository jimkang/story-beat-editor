var d3 = require('d3-selection');

var listenersInit = false;

function initListeners({ addToRoute }) {
  if (listenersInit) {
    return;
  }
  listenersInit = true;

  d3.select('#load-beat-button').on('click', onLoadBeat);

  function onLoadBeat() {
    addToRoute(getValueDict(['storyId', 'beatSeq']));
  }
}

function getValueDict(keys) {
  var dict = {};
  keys.forEach(addEntryForKey);
  return dict;

  function addEntryForKey(key) {
    dict[key] = document.querySelector(`input[data-of=${key}]`).value;
  }
}

module.exports = initListeners;
