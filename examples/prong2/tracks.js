export default [
  { 
    id : 1,
    type : 'audio',
    name : 'tuba',
    volume : 60,
    pan : 0,
    regions : [
      { 
        'id' : 1,
        'start' : 2,
        'end' : 4
      },
      { 
        'id' : 2,
        'start' : 6,
        'end' : 12
      }
    ]
  },
  { 
    id : 2,
    type : 'audio',
    volume : 25,
    pan : 40,
    name : 'piccolo',
    regions : [
      { 
        'id' : 1,
        'start' : 1,
        'end' : 5
      },
      { 
        'id' : 2,
        'start' : 6,
        'end' : 10
      }
    ]
  },
  { 
    id : 3,
    type : 'text',
    name : 'chords',
    regions : [
      { 
        'id' : 1,
        'start' : 4,
        'text' : 'first text'
      },
      { 
        'id' : 2,
        'start' : 7,
        'text' : 'second bit of text'
      }
    ]
  }
]