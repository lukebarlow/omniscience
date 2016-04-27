/* Inspired and copied from d3.scale, this class provides a mapping from
time in seconds to position in pixels on a page

The domain property is the [min, max] in terms of time shown, and
the range is [min, max] for pixels
 */

import makeClassCallable from './makeClassCallable'

function interpolateNumber(a, b) {
    a = +a, b = +b;
    return function(t) { return a * (1 - t) + b * t; };
}

function uninterpolateNumber(a, b) {
    b = (b -= a = +a) || 1 / b;
    return function(x) { return (x - a) / b; };
}

function scaleBilinear(domain, range) {
    let u = uninterpolateNumber(domain[0], domain[1])
    let i = interpolateNumber(range[0], range[1])
    return function(x) {
        return i(u(x))
    }
}


class Scale {

    constructor () {
        this._domain = [0, 1]
        this._range = [0, 1]
        this._rescale()
    }

    _rescale(){
        this._scale = scaleBilinear(this._domain, this._range)
        this._inverseScale = scaleBilinear(this._range, this._domain)
    }

    domain (domain) {
        if (!arguments.length) return this._domain
        this._domain = domain
        this._rescale()
        return this
    }

    range (range) {
        if (!arguments.length) return this._range
        this._range = range
        this._rescale()
        return this
    }

    __call__ (x) {
        return this._scale(x)
    }

    invert (x) {
        return this._inverseScale(x)
    }

}

export default makeClassCallable(Scale)

