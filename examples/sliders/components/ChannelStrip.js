import React, { Component, PropTypes } from 'react'
import Slider from './Slider'


const ChannelStrip = ({ track, onSolo, onMute }) => (
  <section style={{ 
    display: 'inline-block', 
    'textAlign' : 'center',
    'paddingRight' : '20px',
    'opacity' : track.muted ? 0.5 : 1 }}
    >
    S:<input 
      value={track.solo || false}
      type="checkbox"
      onChange={(event) => {
        onSolo(track, event.target.checked)
      }}
    />&nbsp;M:<input 
      value={track.mute || false}
      type="checkbox"
      onChange={(event) => {
        onMute(track, event.target.checked)
      }}
    />
    <br />
    <Slider 
      value={track.pan}
      orient="horizontal"
      width="60"
      onChange={(event, isUndoWaypoint) => {
        track.pan = parseFloat(event.target.value)
      }}
    />
    <br />
    <Slider 
      value={track.volume}
      width="30"
      onChange={(event, isUndoWaypoint) => {
        track.volume = parseFloat(event.target.value)
      }}
    />
  </section>
)

ChannelStrip.propTypes = {
  onSolo: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  track: PropTypes.shape({
    id: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    pan: PropTypes.number.isRequired
  })
}



export default ChannelStrip
