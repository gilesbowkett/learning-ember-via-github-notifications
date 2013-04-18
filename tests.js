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

      it("brings in all the other data from GitHub");
    });

  });
  
});

