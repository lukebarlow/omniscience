import React, { Component, PropTypes } from 'react'
import Track from './Track'
import Scale from '../scale/Scale'

const xScale = new Scale().domain([0, 20]).range([0, 500])


const Tracks = ({ tracks , onTrackEdit}) => (
  <svg style={{ width : 800, height : 200 }}>
    {tracks.map( (track, i) =>
      <Track
        position={i}
        key={track.id}
        track={track}
        xScale={xScale}
      />
    )}
  </svg>
)


Tracks.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Tracks
