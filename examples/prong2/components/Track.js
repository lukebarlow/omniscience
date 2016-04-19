import React, { Component, PropTypes } from 'react'
import AudioTrack from './AudioTrack'
import TextTrack from './TextTrack'

const tracksByType = {
  'audio' : AudioTrack,
  'text' : TextTrack
}

const Track = ({ track, xScale, position}) => (
  React.createElement(
    tracksByType[track.type],
    {
      key : track.id,
      track,
      xScale,
      position
    }
  )
)


Track.propTypes = {
  track: PropTypes.object.isRequired
}

export default Track
