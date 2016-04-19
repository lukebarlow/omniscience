import React, { Component, PropTypes } from 'react'
import {DraggableCore} from 'react-draggable';


export default class Region extends React.Component {

  
  constructor() {
    super();
    this.drag = this.drag.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  _drag (event, ui, isUndoWaypoint) {
    const { region, xScale, onMove } = this.props
    const newStart = xScale.invert(xScale(region.start) + ui.position.deltaX)
    const duration = region.end - region.start
    region.start = newStart
    region.end = newStart + duration
  }

  dragStart (event, ui) {
    this._drag(event, ui, true)
  }

  drag (event, ui) {
    this._drag(event, ui, false)
  }

  dragStop (event, ui) {}

  render() {
    const { region, position, xScale, track } = this.props
    return (
      <DraggableCore
        axis="x"
        onStart={this.dragStart}
        onDrag={this.drag} 
        onStop={this.dragStop}
        >
        <rect 
          className="region"
          x={xScale(region.start)}
          width={xScale(region.end) - xScale(region.start)}
          height={track.volume / 5}
          y={(position + 0.5) * 50 - track.volume / 5}
        />
      </DraggableCore>
    )
  }
}

Region.propTypes = {
  region: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired
}
