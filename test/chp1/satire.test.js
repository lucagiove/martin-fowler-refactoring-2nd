import {expect} from 'chai';
import {createStatementData} from '../../src/chp1/createStatementData';

describe("satire", () => {
    let playsJson =
        {
            "american-dream": {"name": "The American Dream", "type": "satire"},
            "as-like": {"name": "As You Like It", "type": "comedy"},
        }

    let invoicesJson =
        [
            {
                "customer": "BigCo",
                "performances": [
                    {
                        "playID": "as-like",
                        "audience": 55
                    },
                    {
                        "playID": "american-dream",
                        "audience": 55
                    }
                ]
            }
        ]

    it("should have the same amount of a comedy with the same audience", () => {
        const statement = createStatementData(invoicesJson[0], playsJson);

        const comedy = statement.performances.find(performance => performance.playID === "as-like");
        const satire = statement.performances.find(performance => performance.playID === "american-dream");

        expect(comedy.amount).to.equal(satire.amount);
    })


    it("should award to customer 1 credit every ten people in the audience plus the generic credits", () => {

        const statement = createStatementData(invoicesJson[0], playsJson);

        const satire = statement.performances.find(performance => performance.playID === "american-dream");
        expect(satire.volumeCredits).to.equal(5 + 25);
    })
})
