import React, { Component, PropTypes } from 'react'
import {DraggableCore} from 'react-draggable';



export default class Lyric extends React.Component {

  
  constructor() {
    super();
    this.drag = this.drag.bind(this);
    this.dragStop = this.dragStop.bind(this);
    this.dragStart = this.dragStart.bind(this);
  }

  _drag (event, ui, isUndoWaypoint) {
    const { region, position, xScale, onMove } = this.props
    const newStart = xScale.invert(xScale(region.start) + ui.position.deltaX)
    //onMove(region.id, newStart, isUndoWaypoint)
    region.start = newStart
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
        <text 
          className="lyric"
          x={xScale(region.start)}
          y={(position + 0.5) * 50}
        >
        {region.text}
        </text>
      </DraggableCore>
    )
  }
}

Lyric.propTypes = {
  region: PropTypes.object.isRequired,
  xScale: PropTypes.func.isRequired,
  //onMove: PropTypes.func.isRequired
}
