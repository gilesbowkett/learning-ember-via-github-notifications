mocha.setup('bdd')

onload = function(){
  var runner = mocha.run();
};

var expect = chai.expect;

describe("Notifications", function() {
  client = setupTesting();

  describe("index", function() {
    beforeEach(function() {
      this.notifications = client.$(".notifications > li");
    });

    client.startAtRoute("index");

    it("has 20 notifications", function() {
      expect(this.notifications.length).to.equal(20);
    });

    it("assigns CSS classes for pull requests", function() {
      expect(this.notifications[0].className).to.equal("PullRequest");
    });

    it("assigns CSS classes for issues", function() {
      expect(this.notifications[4].className).to.equal("Issue");
    });

    describe("viewing a specific notification", function() {
      beforeEach(function() {
        client.$(".notifications > li > a").first().click()
      });

      it("shows the notification's base data immediately", function() {
        pullRequestTitle = 'Include useful exception when accessing DS without ember-data'
        expect(client.$("#right-side-view > p:first").text()).to.equal(pullRequestTitle);
      });

      it("brings in all the other data from GitHub asynchronously", function() {
        pullRequestBody = 'I\'ve stumbled upon several SO questions similar to "What does ' +
                          'DS is not defined mean?". This throws an exception explaining ' +
                          'to the user that they need to include Ember Data and to download ' +
                          'it from http://s3.amazonaws.com/builds.emberjs.com/ember-data-latest.js' +
                          ' I thought it could improve the getting started experience.'
        setTimeout(function() {
          expect(client.$("#right-side-view > p")[4].text()).to.equal(pullRequestBody);
        }, 2000);
      });
    });

  });
  
});

