import React from 'react';
import ReactDOM from 'react-dom';

import BeerHelper from './../services/BeerHelper';
import RecipeParameter from './RecipeParameter';
import RecipeIngredient from './RecipeIngredient';
import RecipeSimpleIngredient from './RecipeSimpleIngredient';
import RecipeMashing from './RecipeMashing';
import RecipeHopping from './RecipeHopping';
import RecipeDryHopping from './RecipeDryHopping';
import RecipeNotes from './RecipeNotes';

let bh = BeerHelper();

class Recipe extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { beer } = this.props;
        let beerData = bh.prepareBeerData(beer);

        let beerColor = {
            backgroundColor: beerData.color
        };

        return (
            <div className="container-fluid recipe">
                <div className="row header">
                    <div className="pull-right f18 text-grey">{beer.brew_date}</div>
                    <div className="name f36">{beer.name}</div>
                    <div className="style-name f18 text-grey">{beer.style}</div>
                </div>
                <div className="row body m-b-20">
                    <div className="glass-image p-t-10 p-r-10 pull-left">
                        <img className="glass" src="images/glass_small.png" style={beerColor} />
                        <div className="f30 p-t-10">{beer.litres.batch}<span className="f18 text-grey">L</span></div>
                    </div>
                    <div className="parameters p-l-20">
                        <RecipeParameter color={beerData.styleColor.bg} name="%" fullname="Alkohol" value={beerData.alk} min={0} max={10} />
                        <RecipeParameter color={beerData.styleColor.bg} name="Blg" fullname="Początkowe Blg" value={beer.blg.start} min={0} max={20} />
                        <RecipeParameter color={beerData.styleColor.bg} name="IBU" fullname="IBU" value={beerData.ibu} min={0} max={100} />
                        <RecipeParameter color={beerData.styleColor.bg} name="%" fullname="Wydajność" value={beerData.efficiency} min={0} max={100} />
                    </div>
                </div>
                <div className="row body p-t-20">
                    <RecipeIngredient image="images/malt.png" title="Słody" ingredients={beer.recipe.grains} unit="kg" />
                    <RecipeIngredient image="images/hops.png" title="Chmiele" ingredients={beer.recipe.hops} unit="g" />
                    <RecipeIngredient image="images/others.png" title="Inne dodatki" ingredients={beer.recipe.others} unit="g" />
                    <RecipeSimpleIngredient image="images/yeast.png" title="Drożdże" ingredient={beer.recipe.yeast.name} />
                </div>
                <div className="row body m-b-20">
                    <RecipeMashing mash={beer.recipe.mash} startLitres={beer.recipe.start.litres} startTemp={beer.recipe.start.temperature} />
                    <RecipeHopping hopping={beer.recipe.cooking.hopping} cookingTime={beer.recipe.cooking.time} />
                    <RecipeDryHopping fermentation={beer.recipe.fermentation} />
                    <RecipeNotes notes={beer.notes} />
                </div>
            </div>
        );
    }
}

export default Recipe;
