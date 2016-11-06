import React from 'react';
import ReactDOM from 'react-dom';

import Statistics from './../services/Statistics';
import StatsSummary from './StatsSummary';

let LineChart = require("react-chartjs").Line;
let BarChart = require("react-chartjs").Bar;

const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
const CHART_COLOR = 'rgba(255, 255, 255, 0.4)';

let stats = Statistics();

let brewByMonth = stats.brewByMonth();
let monthlyChart = {
    labels: MONTHS,
    datasets: [{
        backgroundColor: CHART_COLOR,
        borderColor: CHART_COLOR,
        data: _.values(brewByMonth)
    }]
};

let brewByStyle = stats.brewByStyle();
let styleChart = {
    labels: _.keys(brewByStyle),
    datasets: [{
        backgroundColor: CHART_COLOR,
        borderColor: CHART_COLOR,
        borderWidth: 1,
        hoverBackgroundColor: CHART_COLOR,
        hoverBorderColor: CHART_COLOR,
        data: _.values(brewByStyle)
    }]
};

let topGrains = stats.topGrains();
let maltChart = {
    labels: _.keys(topGrains),
    datasets: [{
        backgroundColor: CHART_COLOR,
        borderColor: CHART_COLOR,
        borderWidth: 1,
        hoverBackgroundColor: CHART_COLOR,
        hoverBorderColor: CHART_COLOR,
        data: _.values(topGrains)
    }]
};

let topHops = stats.topHops();
let hopChart = {
    labels: _.keys(topHops),
    datasets: [{
        backgroundColor: CHART_COLOR,
        borderColor: CHART_COLOR,
        borderWidth: 1,
        hoverBackgroundColor: CHART_COLOR,
        hoverBorderColor: CHART_COLOR,
        data: _.values(topHops)
    }]
};

class Stats extends React.Component {
    constructor(props) {
		super(props);
    }

    render() {
        let { width, height } = this.props;

        let bestBlg = stats.bestBlg();
        let bestAlk = stats.bestAlk();
        let bestIBU = stats.bestIBU();

        if(width > 0) {
            return (
                <div>
                    <div className="row m-b-40">
                        <StatsSummary title="Uwarzonych litrów" unit="L" value={stats.totalLitres()} />
                        <StatsSummary title="Użytych słodów" unit="kg" value={Math.round(stats.totalGrains())} />
                        <StatsSummary title="Użytych chmieli" unit="kg" value={stats.totalHops()/1000} />
                    </div>

                    <div className="row m-b-40">
                        <StatsSummary title="Największe Blg" unit="Blg" name={bestBlg.name} value={Math.round(bestBlg.blg)} />
                        <StatsSummary title="Najmocniejsze piwo" unit="%" name={bestAlk.name} value={parseFloat(bestAlk.alk).toFixed(2)} />
                        <StatsSummary title="Największe IBU" unit="IBU" name={bestIBU.name} value={bestIBU.ibu} />
                    </div>

                    <div className="row">
                        <div className="col-xs-12 m-t-40">
                            <div className="text-center f24">Ilość warek w miesiącu</div>
                            <LineChart redraw={true} data={monthlyChart} width={width} height={height} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 m-t-40">
                            <div className="text-center f24">Uwarzone style</div>
                            <BarChart redraw={true} data={styleChart} width={width} height={height} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 m-t-40">
                            <div className="text-center f24">Najpopularniejsze słody <span className="text-grey f20">[kg]</span></div>
                            <BarChart redraw={true} data={maltChart} width={width} height={height} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 m-t-40">
                            <div className="text-center f24">Najpopularniejsze chmiele <span className="text-grey f20">[g]</span></div>
                            <BarChart redraw={true} data={hopChart} width={width} height={height} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default Stats;
