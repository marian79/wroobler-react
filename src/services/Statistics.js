import BeerCalculator from './BeerCalculator';
import BeerHelper from './BeerHelper';
let _ = require('lodash');

const json = require('json!./../data/beers.json');
const BEERS = json.beers;

let bc = BeerCalculator();
let bh = BeerHelper();

const Statistics = function() {
    return {
        /* converters */
        brewByMonth: function() {
            let months = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0};
            _.each(BEERS, function(beer) {
                let date = new Date(beer.brew_date);
                months[date.getMonth()+1] += 1;
            });
            return months;
        },

        brewByStyle: function() {
            return _.countBy(BEERS, 'category');
        },

        bestAlk: function() {
            let best = {alk: 0, name: ''};
            _.each(BEERS, function(beer) {
                let beerAlk = parseFloat(bc.calculateABV(beer.blg.start, beer.blg.end)).toFixed(2);
                if(best.alk < beerAlk) {
                    best = {alk: beerAlk, name: beer.name};
                }
            });
            return best;
        },

        bestBlg: function() {
            let best = {blg: 0, name: ''};
            _.each(BEERS, function(beer) {
                let beerBlg = beer.blg.start;
                if(best.blg < beerBlg) {
                    best = {blg: beerBlg, name: beer.name};
                }
            });
            return best;
        },

        bestEfficiency: function() {
            let best = {efficiency: 0, name: ''};
            _.each(BEERS, function(beer) {
                let grains = bh.getGrains(beer);
        		let beerEfficiency = bc.calculateEfficiency(grains, beer.litres.batch, beer.blg.start);
                if(best.efficiency < beerEfficiency) {
                    best = {efficiency: beerEfficiency, name: beer.name};
                }
            });
            return best;
        },

        bestIBU: function() {
            let best = {ibu: 0, name: ''};
            _.each(BEERS, function(beer) {
                let hops = bh.getHops(beer);
        		let og = bc.blgToOg(beer.blg.start);
        		let beerIBU = Math.floor(bc.calculateIBU(beer.litres.batch, 'L', hops, beer.litres.preboil, og));
                if(best.ibu < beerIBU) {
                    best = {ibu: beerIBU, name: beer.name};
                }
            });
            return best;
        },

        avgAlk: function() {
            let totalAlk = 0;
            _.each(BEERS, function(beer) {
                totalAlk += bc.calculateABV(beer.blg.start, beer.blg.end);
            });
            return parseFloat(totalAlk/BEERS.length).toFixed(2);
        },

        avgBlg: function() {
            let totalBlg = 0;
            _.each(BEERS, function(beer) {
                totalBlg += beer.blg.start;
            });
            return parseInt(totalBlg/BEERS.length);
        },

        totalLitres: function() {
            let litres = 0;
            _.each(BEERS, function(beer) {
                litres += beer.litres.batch;
            });
            return litres;
        },

        totalGrains: function() {
            let grains = 0;
            _.each(BEERS, function(beer) {
                _.each(beer.recipe.grains, function(grain) {
                    grains += grain.weight;
                });
            });
            return grains;
        },

        totalHops: function() {
            let hops = 0;
            _.each(BEERS, function(beer) {
                _.each(beer.recipe.hops, function(hop) {
                    hops += hop.weight;
                });
            });
            return hops;
        },

        topGrains: function() {
            let top = {};
            _.each(BEERS, function(beer) {
                _.each(beer.recipe.grains, function(grain) {
                    let obj = {name: grain.name, value: grain.weight};
                    if(top.hasOwnProperty(grain.name)) {
                        top[grain.name] += Math.ceil(grain.weight);
                    } else {
                        top[grain.name] = Math.ceil(grain.weight);
                    }
                });
            });
            return this.sortObject(top, 10);
        },

        topHops: function() {
            let top = {};
            _.each(BEERS, function(beer) {
                _.each(beer.recipe.hops, function(hop) {
                    let obj = {name: hop.name, value: hop.weight};
                    if(top.hasOwnProperty(hop.name)) {
                        top[hop.name] += Math.ceil(hop.weight);
                    } else {
                        top[hop.name] = Math.ceil(hop.weight);
                    }
                });
            });
            return this.sortObject(top, 10);
        },

        sortObject(obj, sliceValue) {
            let arr = [];
            let prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr.push({
                        'key': prop,
                        'value': obj[prop]
                    });
                }
            }
            arr.sort(function(a, b) {
                return a.value - b.value;
            });
            let arrReversed = arr.reverse();
            if(sliceValue !== undefined) {
                arrReversed = arrReversed.slice(0, 10);
            }
            let newObj = {};
            for(let i = 0; i < arrReversed.length; i++) {
                newObj[arrReversed[i].key] = arrReversed[i].value;
            }
            return newObj;
        }
    }
};

export default Statistics;
