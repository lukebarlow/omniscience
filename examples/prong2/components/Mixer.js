import React, { Component, PropTypes } from 'react'
import ChannelStrip from './ChannelStrip'


const Mixer = ({ tracks}) => {
  
  // we make a distinction between the 'mute' parameter, which is explicitly
  // set by the user, and the 'muted' parameter, which is worked out, based
  // on the state of solo and mute across all the tracks
  const setTrackMuted = () => {
    const soloedIds = tracks.filter(t => t.solo).map(t => t.id)
    for (let track of tracks){
      if (soloedIds.length == 0){
        track.muted = track.mute
      }else{
        if (soloedIds.includes(track.id)){
          track.muted = track.mute
        }else{
          track.muted = true
        }
      }
    }
  }

  const onSolo = (track, solo) => {
    track.solo = solo
    setTrackMuted()
  }

  const onMute = (track, mute) => {
    track.mute = mute
    setTrackMuted()
  }

  return <section>
    {tracks.filter((track) => track.type == 'audio').map(track =>
      <ChannelStrip
        key={track.id}
        track={track}
        onSolo={onSolo}
        onMute={onMute}
      />
    )}
  </section>
}


Mixer.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Mixer
