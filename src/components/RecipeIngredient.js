import React from 'react';
import ReactDOM from 'react-dom';

class RecipeIngredient extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { image, title, unit, ingredients } = this.props;
        if(ingredients.length > 0) {
            return (
                <div className="fullwidth pull-left underlined p-b-20">
                    <img className="pull-left" src={image} title={title} />
                    <ul className="ingredients-list">
                        {ingredients.map(function(ingredient, i) {
                            return (
                                <li key={i}>
                                    <span className="f30 amount">{ingredient.weight}</span>
                                    <span className="f20 text-grey unit">{unit}</span>
                                    <span className="f25 ingredient-name m-l-10">{ingredient.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default RecipeIngredient;
