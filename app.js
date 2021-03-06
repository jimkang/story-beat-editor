var RouteState = require('route-state');
var handleError = require('handle-error-web');
var initListeners = require('./dom/init-listeners');
var loadBeatFlow = require('./flows/load-beat-flow');
var saveBeatFlow = require('./flows/save-beat-flow');

var routeState = RouteState({
  followRoute,
  windowObject: window
});

(function go() {
  window.onerror = reportTopLevelError;
  routeState.routeFromHash();
})();

function reportTopLevelError(msg, url, lineNo, columnNo, error) {
  handleError(error);
}

function followRoute({ storyId, beatSeq }) {
  initListeners({ addToRoute: routeState.addToRoute, saveBeatFlow });

  if (storyId && beatSeq) {
    loadBeatFlow({ storyId, beatSeq });
  }
}
