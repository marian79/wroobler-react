import React from 'react';
import ReactDOM from 'react-dom';

class RecipeSimpleIngredient extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { image, title, ingredient } = this.props;
        return (
            <div className="fullwidth pull-left p-b-20 p-t-10">
                <img className="pull-left" src={image} title={title} />
                <ul className="ingredients-list">
                    <li className="m-l-40"><span className="f25">{ingredient}</span></li>
                </ul>
            </div>
        );
    }
}

export default RecipeSimpleIngredient;
