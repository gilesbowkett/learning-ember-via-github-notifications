function setupTesting() {
  // Stop Ember from automatically scheduling run loops with setTimeout. It's
  // non-deterministic, which is bad for tests.
  Ember.testing = true;

  // Re-enable automatic run loops when testing is over, for easy debugging in
  // the console.
  after(function() { // after all tests have finished
    Ember.testing = false;
  });

  App.reopen({
    // Use a separate root element so we don't interfere with the test reporter.
    rootElement: '#test-app-container'
  });

  // Wait to initialize until we are done setting up.
  App.deferReadiness();

  before(function(done) { // before any tests have started
    // Now that the DOM is ready, add the root element.
    $('body').append('<div id="test-app-container"></div>');

    Ember.run(function() {
      // We are done setting up. The app can now initialize.
      App.advanceReadiness();

      // This `before` handler blocks the test suite until the callback (done)
      // is called. App.then fires when the app has finished initializing.
      App.then(function() {
        done();
      });
    });
  });


  // Reset the entire app before each test.
  beforeEach(function() {
    Ember.run(function() {
      App.reset();
    });
  });

  // Re-enable automatic run loops when testing is over, for easy debugging in
  // the console.
  after(function() { // after all tests have finished
    Ember.testing = false;
  });




  // Do not muck with the URL, or URL state will leak between tests.
  App.Router.reopen({
    location: 'none'
  });


  // TODO: better name! and make this OO?
  var client = {};

  client.transitionTo = function(a,b) {
    Ember.run(function() {
      b ? App.Router.router.transitionTo(a,b) : App.Router.router.transitionTo(a);
    })
  }

  client.startAtRoute = function(a,b) {
    beforeEach(function() {
      b;
      client.transitionTo(a,b);
    })
  }

  client.$ = function(selector) {
    return $("#test-app-container "+selector);
  }

  return client;
}

