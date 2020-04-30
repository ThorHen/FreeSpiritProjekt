const assert = require("chai").assert
const chai = require("chai")
const chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised)
const expect = require("chai").expect
const { getUserNames } = require("../Controllers/getUsers")

describe("Test of getting users from DB", () => {
    it("Should return P1", async () => {
        let result = await getUserNames();
        console.log("result: " + result);

        assert.equal(result, "Person1");
    })

})