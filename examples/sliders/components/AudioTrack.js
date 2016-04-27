import React, { Component, PropTypes } from 'react'
import Region from './Region'


const AudioTrack = ({ track, position, xScale, onTrackEdit }) => (
  <g>
    <text x="0" y={position * 50 + 20} width="100" height="50">
      {track.name}
    </text>
    {(track.regions || []).map((region) => 
      <Region 
        key={region.id}
        region={region} 
        position={position} 
        track={track}
        xScale={xScale}
        onMove={(id, newStart, isUndoWaypoint) => {
          console.log('going to move')
          // TODO : move to actions
          // const edit = {
          //   type : 'MOVE_REGION',
          //   id,
          //   newStart
          // }
          // onTrackEdit(track.id, edit, isUndoWaypoint)
        }}
      />
    )}
  </g>
)

AudioTrack.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
}

export default AudioTrack
