import React from 'react'
import { render } from 'react-dom'
import Tracks from './components/Tracks'
import Mixer from './components/Mixer'
import tracks from './tracks'
import { watch } from '../../src/index'


window.init = function(){
    window.tracks = watch(tracks)
    function draw(){
        render(
            <div>
              <Mixer tracks={tracks} />
              <Tracks tracks={tracks} />
              <Mixer tracks={tracks} />
              <Tracks tracks={tracks} />
            </div>,
            document.getElementById('main')
        )
    }
    draw()
    tracks.on('change', draw)
}