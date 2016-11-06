import React from 'react';
import ReactDOM from 'react-dom';

class RecipeNotes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { notes } = this.props;
        return (
            <div>
                <div className="fullwidth pull-left process-title">Notatki</div>
                <div className="fullwidth pull-left underlined p-b-20 p-t-10">
                    {notes.map(function(note, i) {
                        return (<div className="pull-left f25 p-l-20" key={i}><span className="f25">{note}</span></div>);
                    })}
                </div>
            </div>
        );
    }
}

export default RecipeNotes;
