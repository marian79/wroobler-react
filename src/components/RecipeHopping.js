import React from 'react';
import ReactDOM from 'react-dom';

class RecipeHopping extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { hopping, cookingTime } = this.props;
        return (
            <div>
                <div className="fullwidth pull-left process-title">Chmielenie</div>
                <div className="fullwidth pull-left underlined p-b-20 p-t-10">
                    <div className="start-element pull-left f25 p-l-20">Czas gotowania</div>
                    <ul className="ingredients-list">
                        <li className="underlined cooking-time"><span className="f25 amount text-grey">{cookingTime}'</span></li>
                        {hopping.map(function(cook, i) {
                            return (<li key={i}><span className="f25 amount text-grey">{cook.time}'</span><span className="f30 amount m-l-20">{cook.amount}</span><span className="f20 unit text-grey">g</span> <span className="f25 ingredient-name m-l-10">{cook.name}</span></li>);
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default RecipeHopping;
