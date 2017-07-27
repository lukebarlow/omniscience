import React, { PropTypes } from 'react'

function objectValues (o) {
  return Object.keys(o).map((key) => o[key])
}

function objectItems (o) {
  var keys = Object.keys(o).filter((key) => !key.startsWith('_') && !(key === 'on') && !(key === 'observe'))
  return keys.map((key) => [key, o[key]])
}

const Item = ({o, name}) => {
  // console.log('rendering for ', o)

  switch (typeof (o)) {
    case 'string':
    case 'number':
      return <div className='item'>{name}:{o}</div>
      break
    default:
      return <div className='item'>
        {objectItems(o).map(([key, value], i) =>
          <Item
            o={value}
            key={key}
            name={key}
          />
        )}
      </div>
      break
  }
}

Item.propTypes = {
  o: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired
}

export default Item
