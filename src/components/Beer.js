import React from 'react';
import ReactDOM from 'react-dom';
import BeerHelper from './../services/BeerHelper';

let _ = require('lodash');
let bh = BeerHelper();

class Beer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let { beer, showRecipe } = this.props;
        let beerData = bh.prepareBeerData(beer);

		let styleColor = {
			backgroundColor: beerData.styleColor.bg,
			color: beerData.styleColor.text
		};

        let beerColor = {
            backgroundColor: beerData.color
        };

		return (
			<div className="beer" onClick={() => showRecipe(beer) }>
				<div className="glass-container border-circle white">
					<div className="glass-inner border-circle white">
						<img src="images/glass_small2.png" style={beerColor} />
					</div>
				</div>
				<div className="description white">
					<div className="style f20" style={styleColor}><span className="pull-right">{beer.style}</span></div>
					<div className="beer-date m-l-30 p-t-5 p-l-20 f12 text-grey">{beer.brew_date}</div>
					<div className="beer-title m-l-30 p-l-20 f30">{beer.name}</div>
					<div className="characteristics alk f20">{beerData.alk}<span className="f14 text-grey">%</span></div>
					<div className="characteristics blg f20">{beer.blg.start}<span className="f14 text-grey">Blg</span></div>
					<div className="characteristics ibu f20">{beerData.ibu}<span className="f14 text-grey">IBU</span></div>
				</div>

			</div>
		);
    }
}

export default Beer;
