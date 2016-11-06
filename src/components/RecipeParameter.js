import React from 'react';
import ReactDOM from 'react-dom';

import Slider from 'react-rangeslider';

let _ = require('lodash');

class RecipeParameter extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  setColor(color) {
      let sliders = document.getElementsByClassName('rangeslider__fill');
      _.each(sliders, (slider) => {
          slider.style.backgroundColor = color;
      })
  }

  componentDidMount() {
      this.setColor(this.props.color);
  }

  render() {
    let { name, fullname, value, min, max, color } = this.props;
    this.setColor(color);
    return (
        <div className="p-t-5">
            <div className="pull-left slider-name-value f25">{value} <span className="f16 text-grey" title={fullname}>{name}</span></div>
            <Slider
              min={min}
              max={max}
              value={Math.round(value)}
              orientation="horizontal"
              />
            <div className="slider-min pull-left">{min}</div>
            <div className="slider-max pull-right">{max}</div>
        </div>
    );
  }
}

export default RecipeParameter;
