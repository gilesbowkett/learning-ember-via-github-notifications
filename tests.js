mocha.setup('bdd')

onload = function(){
  var runner = mocha.run();
};

var assert = chai.assert;
describe("Notifications", function() {
  client = setupTesting();

  describe("index", function() {
    client.startAtRoute("index");

    it("has 20 notifications", function() {
      assert.equal(client.$(".notifications > li").length, 20);
    });

    it("shows a pull request first", function() {
      assert.equal(client.$(".notifications > li:first")[0].className, "PullRequest");
    });

  });
  
});
