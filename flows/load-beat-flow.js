var request = require('basic-browser-request');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();
var renderBeat = require('../dom/render-beat');
const baseURL = 'https://smidgeo.com/story-beat-data';

function loadBeatFlow({ storyId, beatSeq }) {
  var reqOpts = {
    method: 'GET',
    url: `${baseURL}/${storyId}-${beatSeq}.json`,
    json: true
  };
  request(reqOpts, sb(lookAtBeat, handleError));
}

function lookAtBeat(res, beat) {
  if (res.statusCode > 199 && res.statusCode < 300) {
    renderBeat(beat);
  } else {
    renderBeat({});
    handleError(new Error('Could not load beat. Status code: ' + res.statusCode));
  }
}

module.exports = loadBeatFlow;
