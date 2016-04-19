import React from 'react'

import TracksContainer from '../containers/TracksContainer'
import MixerContainer from '../containers/MixerContainer'
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <UndoRedo />
    <TracksContainer />
    <MixerContainer />
    <TracksContainer />
    <MixerContainer />
  </div>
)

export default App
