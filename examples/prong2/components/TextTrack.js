import React, { Component, PropTypes } from 'react'
import Lyric from './Lyric'


const TextTrack = ({ track, position, xScale, onTrackEdit }) => (
  <g>
    
    <rect 
        className="clickDetector"
        x={xScale.range()[0]}
        width={xScale.range()[1] - xScale.range()[0]}
        height="50"
        y={(position) * 50}
        onDoubleClick={ (event) => {
          const time = xScale.invert(event.clientX - event.target.getBoundingClientRect().left)
          track.regions.push({
            id : tracks.reduce((maxId, lyric) => Math.max(lyric.id, maxId), -1) + 1,
            start : time,
            text : 'hello'
          })
        }}
      />

    <text x="0" y={position * 50 + 20} width="100" height="50">
      {track.name}
    </text>

    {(track.regions || []).map((region) => 
      <Lyric 
        key={region.id}
        region={region} 
        position={position} 
        track={track}
        xScale={xScale}
        onMove={(id, newStart, isUndoWaypoint) => {
          const edit = {
            type : 'MOVE_REGION',
            id,
            newStart
          }
          onTrackEdit(track.id, edit, isUndoWaypoint)
        }}
      />
    )}
  </g>
)

TextTrack.propTypes = {
  region: PropTypes.shape({
    id: PropTypes.number.isRequired
  })
}

export default TextTrack
