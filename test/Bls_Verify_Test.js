const {loadFixture, time} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");



describe("Bls12381", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployOneYearBlsFixture() {
        // Contracts are deployed using the first signer/account by default
        const [owner, otherAccount] = await ethers.getSigners();

        const BLS = await ethers.getContractFactory("BLS");
        const blsL = await BLS.deploy();

        const Bls = await ethers.getContractFactory("Bls12381",{
            libraries: {
                BLS: blsL.address,
            }
        });
        const bls = await Bls.deploy();

        return { bls, owner, otherAccount };
    }

    describe("Verify true Test", function () {
        it("Should set the right unlockTime", async function () {
            const { bls} = await loadFixture(deployOneYearBlsFixture);
            let uncompressed_pubkeys =
                [
                    "0x0491d1b0ecd9bb917989f0e74f0dea0422eac4a873e5e2644f368dffb9a6e20fd6e10c1b77654d067c0618f6e5a7f79a17cd7061575d3e8034fcea62adaa1a3bc38dca4b50e4c5c01d04dd78037c9cee914e17944ea99e7ad84278e5d49f36c4",
                    "0x1301803f8b5ac4a1133581fc676dfedc60d891dd5fa99028805e5ea5b08d3491af75d0707adab3b70c6a6a580217bf810e4efa61b558d043cd3fed5c44ac75415de0d032586fecb22acbb67d508cde9f9536a7609d69c1d6e60450843e4ec59a"
                ]

            let message = "0x5656565656565656565656565656565656565656565656565656565656565656"

            let uncompressed_signature = "0x112c3615f69575407db9392eb21fee18fff797eeb2fbe1816366ca2a08ae574d8824dbfafb4c9eaa1cf61b63c6f9b69911f269b664c42947dd1b53ef1081926c1e82bb2a465f927124b08391a5249036146d6f3f1e17ff5f162f779746d830d106ae658caad0263c25dbef0fbbd19ebec6f8d3567c2e9dcb58308f52095b97ba5b16929eb71b5dfcf265139a9809f61e18d09aa25477ff3268f01688945527fedbd091337e7e8f72c37eb3879d349091147aa65680cc0ebc7f9b68132ae590df"

                let tag = await bls.bls_fast_aggregate_verify(uncompressed_pubkeys,message,uncompressed_signature);
            expect(tag).to.equal(true);
        });

        it("Verify false Test", async function () {
            const { bls } = await loadFixture(deployOneYearBlsFixture);

            let uncompressed_pubkeys =
                [
                    "0x0491d1b0ecd9bb917989f0e74f0dea0422eac4a873e5e2644f368dffb9a6e20fd6e10c1b77654d067c0618f6e5a7f79a17cd7061575d3e8034fcea62adaa1a3bc38dca4b50e4c5c01d04dd78037c9cee914e17944ea99e7ad84278e5d49f36c4",
                    "0x1301803f8b5ac4a1133581fc676dfedc60d891dd5fa99028805e5ea5b08d3491af75d0707adab3b70c6a6a580217bf810e4efa61b558d043cd3fed5c44ac75415de0d032586fecb22acbb67d508cde9f9536a7609d69c1d6e60450843e4ec59a"
                ]

            let message = "0x5656565656565656565656565656565656565656565656565656565656565656"

            let uncompressed_signature = "0x1712c3edd73a209c742b8250759db12549b3eaf43b5ca61376d9f30e2747dbcf842d8b2ac0901d2a093713e20284a7670fcf6954e9ab93de991bb9b313e664785a075fc285806fa5224c82bde146561b446ccfc706a64b8579513cfc4ff1d93005a551c4a6e65721d154c99c3beaba35157d7190a7196aea81bd8e938dc2d168dea810b0afcc616efca2ce597af95b8002b4a55393b3b606c07dab7258b8e03bc972cbda67753b3b5288bf8f4e69e672e593747b86188972a718359684b5dd4d"

            let tag = await bls.bls_fast_aggregate_verify(uncompressed_pubkeys,message,uncompressed_signature);
            expect(tag).to.equal(false);

        });

    });
});