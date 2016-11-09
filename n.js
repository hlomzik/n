/**
 * GEOMETRIC PROBLEM
 * FIND VISIBLE N-GON VERTEXES
 * 
 * For given N-gon and point A outside it
 * Find
 * Vertexes which are visible from A.
 * Vertex X visible if line X-A doesn't cross any edge of N-gon.
 */

/** @typedef {[ number, number]} Point */
/** @typedef {[ Point, Point]} Line */

/**
 * Get parameters of line equation through the given points.
 * @param {Point} from
 * @param {Point} to
 * @return {[number, number]} parameters for `y=ax+b` equation
 */
function lineEq ([ x1, y1 ], [ x2, y2 ]) {
    const a = (y2 - y1) / (x2 - x1)
    const b = y1 - a * x1
    return [ a, b ]
}

/**
 * Detect if points `center` and `dot` lies on opposite sides
 * of given line.
 * @param {Line} line
 * @param {Point} center
 * @param {Point} dot
 * @return {boolean}
 */
function isOpposite([ from, to ], center, dot) {
    const [ a, b ] = lineEq(from, to)
    const d1 = center[1] - (a * center[0] + b)
    const d2 = dot[1] - (a * dot[0] + b)
    return d1 * d2 <= 0
}

/**
 * Get the vertexes of `n`-gon visible from point `a`.
 * @param {Point} a
 * @param {number} n number of vertexes
 * @param {Point[]} dots n-gon vertexes
 * @return {Point[]} visible vertexes
 */
function solve ({ a, n, dots }) {
    // to int
    dots = dots.map(([ x, y ]) => [ +x, +y ])
    const center = dots
        // sum coords of all the dots
        .reduce((c, d) => [ c[0] + d[0], c[1] + d[1] ])
        // and find the average
        .map(d => d / n)

    return dots
        // get lines from given dots
        .map((dot, i) => [
            // previous dot
            dots[(i || dots.length) - 1],
            dot
        ])
        // get only visible lines
        .filter(line => isOpposite(line, center, a))
        // get all dots from visible lines (without doubles)
        .reduce((dots, [ d1, d2 ]) => {
            !dots.includes(d1) && dots.push(d1)
            !dots.includes(d2) && dots.push(d2)
            return dots
        }, [])
}