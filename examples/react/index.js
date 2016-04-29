import React from 'react'
import { render } from 'react-dom'
import Item from './Item'
import { watch } from 'omniscience'

let tracks = [
 {volume : 1, pan : -50},
 {volume : 5, pan : 10},
 {volume : 8, pan : 40}
]

window.init = function(){
	
    window.tracks = watch(tracks)

    function draw(){
        render(
            <Item o={tracks} name=""/>,
            document.getElementById('main')
        )
    }
    draw()
    tracks.on('change', draw)
}