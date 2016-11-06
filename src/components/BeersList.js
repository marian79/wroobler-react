import React from 'react';
import ReactDOM from 'react-dom';
import Beer from './Beer';

class BeersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: props.beers,
            showRecipe: props.showRecipe
        }
    }

    render() {
        let { beers, showRecipe } = this.state;
        return (
            <ul className="beer-list">
                {beers.map(function(beer, i) {
                    return (<li key={beer.id}><Beer beer={beer} showRecipe={showRecipe} /></li>);
                })}
            </ul>
        );
    }
}

export default BeersList;
