
function renderBeat(beat) {
  console.log(beat);
  for (var key in beat) {
    let value = beat[key];
    if (typeof value === 'object') {
      // TODO
    } else {
      let element = document.querySelector(`[data-of=${key}]`);
      if (!element) {
        console.log('Could not find element for', key);
      } else {
        if (element.tagName === 'INPUT') {
          element.value = value;
        } else {
          element.textContent = value;
        }
      }
    }
  }
}

module.exports = renderBeat;
