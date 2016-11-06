import React from 'react';
import ReactDOM from 'react-dom';

let _ = require('lodash');

class StatsSummary extends React.Component {
    constructor(props) {
		super(props);
    }

    render() {
        let { title, unit, value, name } = this.props;

        if(!_.isEmpty(name)) {
            return (
                <div className="col-xs-4 col-md-12 m-b-40">
                    <div className="f24 text-grey">{title}</div>
                    <div className="f36">{value}
                        <span className="text-grey f28">{unit}</span>
                    </div>
                    <div className="f20">{name}</div>
                </div>
            );
        } else {
            return (
                <div className="col-xs-4 col-md-12 m-b-20">
                    <div className="f24 text-grey">{title}</div>
                    <div className="f36">{value}
                        <span className="text-grey f28">{unit}</span>
                    </div>
                </div>
            );
        }
    }
}

export default StatsSummary;
