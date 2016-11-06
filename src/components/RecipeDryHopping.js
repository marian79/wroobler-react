import React from 'react';
import ReactDOM from 'react-dom';

class RecipeDryHopping extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { fermentation } = this.props;
        if(fermentation.length > 0) {
            return (
                <div>
                    <div className="fullwidth pull-left process-title">Fermentacja</div>
                    <div className="fullwidth pull-left underlined p-b-20 p-t-10">
                        {fermentation.map(function(ferment, i) {
                            return (<div className="pull-left f25 p-l-20" key={i}><span className="f25">{ferment}</span></div>);
                        })}
                    </div>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default RecipeDryHopping;
