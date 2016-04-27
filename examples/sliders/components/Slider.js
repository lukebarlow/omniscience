import React, { PropTypes } from 'react'

const Slider = ({onChange, value, width, orient = 'vertical'}) => {
  let style = {};

  if (orient == 'vertical'){
    style['WebkitAppearance'] = 'slider-vertical'
  }
  if (width){
    style['width'] = `${width}px`
  }

  return <input 
    value={value}
    onChange={(event) => onChange(event, false)}
    onMouseDown={(event) => onChange(event, true)}
    onKeyDown={(event) => onChange(event, true)}
    type="range" 
    min="0" 
    max="100" 
    step="1"
    style={style}
    orient={orient}
  />
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
}

export default Slider
