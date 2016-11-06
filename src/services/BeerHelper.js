import BeerCalculator from './BeerCalculator';

let bc = BeerCalculator();
let g = require('./../data/grains');
let h = require('./../data/hops');

let GRAINS = g.GRAINS;
let HOPS = h.HOPS;

const STYLE_COLOR_MAPPER = {
    'AIPA': {bg: '#00ca00', text: '#fff'},
    'Ale': {bg: '#eadd6d', text: '#333'},
    'Bock': {bg: '#8c0d0d', text: '#fff'},
    'Witbier': {bg: '#c6b94c', text: '#fff'},
    'Saison': {bg: '#fd980d', text: '#fff'},
    'Stout': {bg: '#000', text: '#fff'},
    'Porter': {bg: '#0e0b01', text: '#fff'},
    'Smoked': {bg: '#6b2713', text: '#fff'},
    'Fruit': {bg: '#e42020', text: '#fff'},
    'Ginger': {bg: '#fffc9f', text: '#000'},
    'Dunkelweizen': {bg: '#525130', text: '#fff'},
    'IPA': {bg: '#8e4f02', text: '#fff'},
    'Session IPA': {bg: '#e89c0d', text: '#fff'},
    'Tripel': {bg: '#e0d51a', text: '#fff'},
}

const BeerHelper = function() {
    return {
        getStyleColorMapper(style) {
            return STYLE_COLOR_MAPPER[style] || '#ddd';
        },

        getGrains(beer) {
            let grains = [];
            _.each(beer.recipe.grains, function(grain) {
                let foundGrain = _.find(GRAINS, {name: grain.name});
                if(foundGrain) {
                    grains.push({
                        name: grain.name,
                        amount: grain.weight,
                        unit: 'kg',
                        color: foundGrain.srm
                    });
                }
            });
            return grains;
        },

        getHops(beer) {
            let hops = [];
            _.each(beer.recipe.cooking.hopping, function(hop) {
                let foundHop = _.find(HOPS, {name: hop.name});
                if(foundHop) {
                    hops.push({
                        name: hop.name,
                        amount: hop.amount,
                        unit: 'g',
                        alpha: foundHop.alpha_acid_low,
                        use: 1,
                        time: hop.time
                    });
                }
            });
            return hops;
        },

        getColor(beer, grains) {
    		let hex = '';
    		let color = bc.calculateColor(beer.litres.batch, 'L', grains) || 0;
            hex = bc.colorHexCode(color);
    		return hex;
    	},

        getIBU(beer, hops) {
            let og = bc.blgToOg(beer.blg.start);
            return Math.floor(bc.calculateIBU(beer.litres.batch, 'L', hops, beer.litres.preboil, og));
    	},

    	getAlk(beer) {
    		return parseFloat(bc.calculateABV(beer.blg.start, beer.blg.end)).toFixed(2);
    	},

        getEfficiency(beer, grains) {
    		return bc.calculateEfficiency(grains, beer.litres.batch, beer.blg.start);
    	},

        prepareBeerData(beer) {
            let grains = this.getGrains(beer);
            let hops = this.getHops(beer);
            let color = this.getColor(beer, grains);
            let styleColor = this.getStyleColorMapper(beer.category);
            let ibu = this.getIBU(beer, hops);
            let alk = this.getAlk(beer);
            let efficiency = this.getEfficiency(beer, grains);

            return {
                grains,
                hops,
                color,
                styleColor,
                ibu,
                alk,
                efficiency
            };
        }
    }
};

export default BeerHelper;
