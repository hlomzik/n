function lineEq ([ x1, y1 ], [ x2, y2 ]) {
    const a = (y2 - y1) / (x2 - x1)
    const b = y1 - a * x1
    return [ a, b ]
}

function isOpposite([ from, to ], center, dot) {
    const [ a, b ] = lineEq(from, to)
    const d1 = center[1] - (a * center[0] + b)
    const d2 = dot[1] - (a * dot[0] + b)
    return d1 * d2 <= 0
}

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