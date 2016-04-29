try {
  Proxy
} catch (e) {
  throw `Omniscience requires a browser or node.js version which 
    supports the Proxy object. This came into node in version 6.0.0`
}

import watch from './watch'
export default { watch : watch }
export { watch }