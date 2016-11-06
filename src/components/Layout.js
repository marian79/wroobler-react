import React from 'react';
import {Motion, spring} from 'react-motion';
import BeersList from './BeersList';
import Recipe from './Recipe';
import Stats from './Stats';

let _ = require('lodash');

const json = require('json!./../data/beers.json');
const BEERS = json.beers.reverse();

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beers: BEERS,
            recipe: null,
            chartWidth: 0,
            chartHeight: 0
        }
        this.showRecipe = this.showRecipe.bind(this);
        this.setChartsDimensions = this.setChartsDimensions.bind(this);
        this.getLatestBeer = this.getLatestBeer.bind(this);
        this.render = this.render.bind(this);
    }

    getLatestBeer() {
        let latest = this.state.beers[0];
        return latest;
    }

    showRecipe(beer) {
        this.setState({recipe: beer});
        this.forceUpdate();
    }

    setHeights() {
        let leftColumn = document.getElementById('left-column');
        let centerColumn = document.getElementById('center-column');
        let rightColumn = document.getElementById('right-column');
        if(window.innerWidth < 1200 && window.innerWidth > 990) {
            let centerColumnHeight = centerColumn.offsetHeight || centerColumn.clientHeight;
            if(leftColumn.offsetHeight < centerColumnHeight) {
                leftColumn.style.height = `${centerColumnHeight}px`;
            }
        } else if(window.innerWidth >= 1200) {
            let rightColumnHeight = rightColumn.offsetHeight || rightColumn.clientHeight;
            if(leftColumn.offsetHeight < rightColumnHeight) {
                leftColumn.style.height = `${rightColumnHeight}px`;
            }
        }
    }

    setChartsDimensions() {
        let leftColumn = document.getElementById('left-column');
        let width = leftColumn.offsetWidth - 50;
        let height = Math.round(width/2);
        if(height >= 250) height = 250;
        this.setState({chartWidth: width, chartHeight: height});
        this.forceUpdate();
    }

    componentDidMount() {
        this.setHeights();
        this.setChartsDimensions();
        window.addEventListener("resize", () => {
            this.setHeights();
            this.setChartsDimensions();
        });
    }

    componentWillUnmount() {
        window.removeEventListener("resize", () => {
            this.setHeights();
            this.setChartsDimensions();
        });
    }

    render() {
        let { beers, recipe, chartWidth, chartHeight } = this.state;
        recipe = !_.isEmpty(recipe) ? recipe : this.getLatestBeer();
        window.scrollTo(0, 0);

        return (
          <div className="container-fluid">
            <div className="row">
                <div id="left-column" className="col-xs-12 col-sm-12 col-md-4 col-lg-3 statistics">
                    <div className="logo"><img src="images/logo.png" /></div>
                    <div className="wroobler f30 text-grey">Browar Wroobler</div>
                    <Stats width={chartWidth} height={chartHeight} />
                </div>
                <div id="center-column" className="col-xs-12 col-sm-12 col-md-8 col-lg-6"><Recipe beer={recipe} /></div>
                <div id="right-column" className="col-xs-12 col-sm-12 col-md-12 col-lg-3"><BeersList beers={beers} showRecipe={this.showRecipe} /></div>
            </div>
          </div>
        );
    }
}

export default Layout;
