import React from 'react';
import ReactDOM from 'react-dom';

class RecipeMashing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { mash, startLitres, startTemp } = this.props;
        return (
            <div>
                <div className="fullwidth pull-left process-title">Zacieranie</div>
                <div className="fullwidth pull-left underlined p-b-20 p-t-10">
                    <div className="start-element pull-left f25 p-l-20">Zasyp</div>
                    <ul className="ingredients-list">
                        <li className="underlined"><span className="f25 amount text-grey">{startLitres}L</span><span className="f30 amount m-l-40">{startTemp}</span></li>
                        {mash.map(function(step, i) {
                            return (<li key={i}><span className="f25 amount text-grey">{step.time}'</span><span className="f30 amount m-l-40">{step.temperature}</span></li>);
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default RecipeMashing;
