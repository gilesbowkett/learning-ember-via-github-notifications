mocha.setup('bdd')

onload = function(){
  var runner = mocha.run();
};

var assert = chai.assert;
describe("Notifications", function() {
  client = setupTesting();

  describe("index", function() {
    beforeEach(function() {
      this.notifications = client.$(".notifications > li");
    });

    client.startAtRoute("index");

    it("has 20 notifications", function() {
      assert.equal(this.notifications.length, 20);
    });

    it("assigns CSS classes for pull requests", function() {
      assert.equal(this.notifications[0].className, "PullRequest");
    });

    it("assigns CSS classes for issues", function() {
      assert.equal(this.notifications[4].className, "Issue");
    });

  });
  
});

