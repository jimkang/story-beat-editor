var request = require('basic-browser-request');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();
var config = require('../config');
var renderMessage = require('../dom/render-message');

const apiServerBaseURL = 'https://smidgeo.com/story-beat-api/json';

function saveBeatFlow({ beat, user, email}) {
  var reqOpts = {
    method: 'PUT',
    url: `${apiServerBaseURL}?name=${user}&email=${email}&filename=${beat.storyId}-${beat.beatSeq}.json`,
    json: true,
    body: beat,
    headers: {
      Authorization: `Key ${config.secret}`
    }
  };
  request(reqOpts, sb(onSaved, handleError));

  function onSaved(res, body) {
    if (res.statusCode < 300 && res.statusCode > 199) {
      renderMessage({ message: `Saved beat ${beat.beatSeq} of ${beat.storyId}.`, messageType: 'save-message'});
    } else {
      handleError(new Error(`Could not save beat. ${res.statusCode}: ${body}`));
    }
  }
}

module.exports = saveBeatFlow;
