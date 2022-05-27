
class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }

    static createPerformanceCalculator(aPerformance, aPlay) {
        switch (aPlay.type) {
            case 'tragedy':
                return new TragedyCalculator(aPerformance, aPlay);
            case 'comedy':
                return new ComedyCalculator(aPerformance, aPlay);
            case 'satire':
                return new SatireCalculator(aPerformance, aPlay);
            default:
                throw new Error(`unknown type: ${aPlay.type}`);
        }
    }

    get amount() {
        throw new Error(`unknown type: ${this.play.type}`);
    }
    get volumeCredits() {
        return this._baseCredits();
    }
    _baseCredits() {
       return Math.max(this.performance.audience - 30, 0);
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;
        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        return result;
    }

    get volumeCredits() {
        let result = super.volumeCredits;
        result += Math.floor(this.performance.audience / 5);
        return result;
    }
}

class SatireCalculator extends ComedyCalculator {

    get volumeCredits() {
        let result = this._baseCredits();
        result += Math.floor(this.performance.audience / 10);
        return result;
    }
}

export function createStatementData(invoice, plays) {
    const result = {
        customer: invoice.customer,
        performances: invoice.performances.map(p => enrichPerformance(p)),
    }
    result.totalAmount = totalAmount(result.performances)
    result.totalVolumeCredits = totalVolumeCredits(result.performances)

    return result;

    function enrichPerformance(aPerformance) {
        const calculator = PerformanceCalculator.createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    function totalAmount(performances) {
        return performances.reduce((total, p) => total + p.amount, 0)
    }

    function totalVolumeCredits(performances) {
        return performances.reduce((total, p) => total + p.volumeCredits, 0)
    }
}
