
const COLOR_MAP = {
    1:'#FFE699',    2:'#FFD878',
    3:'#FFCA5A',    4:'#FFBF42',
    5:'#FBB123',    6:'#F8A600',
    7:'#F39C00',    8:'#EA8F00',
    9:'#E58500',    10:'#DE7C00',
    11:'#D77200',    12:'#CF6900',
    13:'#CB6200',    14:'#C35900',
    15:'#BB5100',    16:'#B54C00',
    17:'#B04500',    18:'#A63E00',
    19:'#A13700',    20:'#9B3200',
    21:'#952D00',    22:'#8E2900',
    23:'#882300',    24:'#821E00',
    25:'#7B1A00',    26:'#771900',
    27:'#701400',    28:'#6A0E00',
    29:'#660D00',    30:'#5E0B00',
    31:'#5A0A02',    32:'#600903',
    33:'#520907',    34:'#4C0505',
    35:'#470606',    36:'#440607',
    37:'#3F0708',    38:'#3B0607',
    39:'#3A070B',    40:'#36080A',
    'max':'#030403'
};

const CONVERTERS = {
    'kg2oz': 35.2739619,
    'g2oz': 0.0352739619,
    'kg2lbs': 2.20462262,
    'g2lbs': 0.00220462262,
    'l2gal': 0.264172052
};

const BeerCalculator = function() {
    return {
        /* converters */
        convertAmount: function(amount, unit, unitMap) {
            let factor = unitMap[unit] || 0.0;
            let result = 0.0;
            if(factor && amount) {
                result = factor*amount;
            }
            return result;
        },

        convertToPounds: function(amount, unit) {
            let CONVERSION_MAP = {'oz': 0.0625, 'g': 0.00220462262, 'lb': 1.0, 'kg': 2.20462262};
            return this.convertAmount(amount, unit, CONVERSION_MAP);
        },

        convertToOunces: function(amount, unit) {
            let CONVERSION_MAP = {'oz': 1.0, 'g': 0.0352739619, 'lb': 16.0, 'kg': 35.2739619};
            return this.convertAmount(amount, unit, CONVERSION_MAP);
        },

        convertToGallons: function(amount, unit) {
            let CONVERSION_MAP = {'gallon': 1.0, 'L': 0.264172052};
            return this.convertAmount(amount, unit, CONVERSION_MAP);
        },

        /* colors */
        maltColorUnits: function(amount, unit, color) {
            amount = this.convertToPounds(amount, unit);
            color = color || 0;
            return amount*color;
        },

        convertSRMtoEBC: function(srm) {
            return srm*1.97;
        },

        calculateColor: function(batchSize, batchUnits, grains) {
            let mcu = 0;
            for(let i = 0; i<grains.length; i++) {
                mcu += this.maltColorUnits(grains[i].amount, grains[i].unit, grains[i].color);
            }
            batchSize = this.convertToGallons(batchSize, batchUnits);

            let color = 0;
            if(mcu && batchSize) {
                color = 1.4922*Math.pow(mcu/batchSize, 0.6859);
            }
            return color;
        },

        colorHexCode: function(srm) {
            let color = Math.floor(srm);
            let hex = (color && color > 40) ? COLOR_MAP.max : COLOR_MAP[color];
            return hex || '';
        },

        /* ibu */
        calculateIBU: function(batchSize, batchUnits, hops, boilSize, originalGravity, wortGravity) {
            wortGravity = wortGravity || this.calculateWortGravity(batchSize, batchUnits, boilSize, originalGravity);
            let batch = this.convertToGallons(batchSize, batchUnits);
            let ibu = 0;
            for(let i = 0; i < hops.length; i++) {
                ibu += this.ibuContribution(hops[i].amount, hops[i].unit, hops[i].alpha, hops[i].use, hops[i].time, wortGravity);
            }
            if(ibu && batch) {
                ibu /= batch;
            }
            return ibu;
        },

        ibuContribution: function(amount, unit, alpha, use, time, wortGravity) {
            amount = this.convertToOunces(amount, unit);
            let utilization = 0;
            time = time || 0;
            if(time && (use == '1' || use == '3' || use == '4')) {
                if(wortGravity) {
                    utilization = 1.65*Math.pow(0.000125, (wortGravity-1.0));
                    utilization *= (1.0-Math.exp(-0.04*time))/4.15;
                } else {
                    utilization = ((18.11+13.86 * this.tanh((time-31.32)/18.27))/100.0);
                }
                if(use == '3')
                    utilization *= 0.2;
                if(use == '4')
                    utilization *= 1.1;
            }
            let contribution=0;
            if(amount && utilization && alpha) {
                if(wortGravity) {
                    contribution = (amount*utilization*alpha)*74.89;
                } else {
                    contribution = (amount*utilization*alpha)/0.01335;
                }
            }
            return contribution;
        },

        tanh: function(arg) {
            return(Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
        },

        /* gravity */
        calculateWortGravity: function(batchSize, batchUnits, boilSize, originalGravity) {
            let batch = this.convertToGallons(batchSize, batchUnits);
            let boil = this.convertToGallons(boilSize, batchUnits);
            let wortGravity = 0;
            let points = 0;
            let wortPoints = 0;
            if(batch && boil && originalGravity) {
                points = (originalGravity-1.0)*1000.0;
                wortPoints = points*batch/boil;
                wortGravity = 1.0 + wortPoints/1000.0;
            }
            return wortGravity;
        },

        calculateOriginalGravity: function(batchSize, batchUnits, grains, effeciency) {
            let points = 0;
            for(let i = 0; i < grains.length; i++) {
                points += this.gravityContribution(grains[i].amount, grains[i].unit, grains[i].fermYield, grains[i].fermType, effeciency);
            }
            batchSize = this.convertToGallons(batchSize, batchUnits);
            let gravity = 0.0;
            if(batchSize) {
                points /= (batchSize*1000);
                gravity = 1+points;
            }
            return gravity;
        },

        calculateFinalGravity: function(originalGravity, attenuation) {
            attenuation = attenuation || 75.0;
            let gravity = 0.0;
            if(originalGravity) {
                gravity = 1+((originalGravity-1)*(100-attenuation)/100);
            }
            return gravity;
        },

        gravityContribution(amount, unit, fermYield, fermType, effeciency) {
            let ppg = this.yieldToPPG(fermYield, fermType, effeciency);
            amount = this.convertToPounds(amount, unit);
            return ppg*amount;
        },

        yieldToPPG(fermYield, fermType, effeciency) {
            effeciency = effeciency || 85.0;
            fermYield = fermYield || 75.0;
            let ppg = 46*fermYield/100;
            if(!(fermType) || fermType == '1' || fermType == '5') {
                ppg *= effeciency/100.0;
            }
            return ppg;
        },

        calculateABV: function(originalPlato, finalPlato) {
            if(originalPlato && finalPlato && originalPlato > finalPlato) {
                return (originalPlato-finalPlato)/1.938;
            }
        },

        blgToOg: function(blg) {
            return 1 + (blg / (258.6-((blg/258.2)*227.1)));
        },

        calculateEfficiency: function(grains, batchSize, originalPlato) {
            let grainsWeight = 0;
            for(let g = 0; g < grains.length; g++) {
                grainsWeight += grains[g].amount;
            }
            let cw = 260 / (260 - originalPlato);
            let performance = parseInt(cw * batchSize * originalPlato / grainsWeight);
            return performance;
        }
    }
};

export default BeerCalculator;
