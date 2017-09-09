// Copyright (C) 2017, Uri Shaked
// Rotates the given points around the point given by (cx, cy)
const cx = 50.8,
    cy = 41.91;

function convert(x, y, degrees = 120) {
    const dx = x - cx;
    const dy = y - cy;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan(dy / dx) + degrees * Math.PI / 180.0;
    return [cx + distance * Math.cos(angle), cy + distance * Math.sin(angle)]
}

function rotate(expr, degrees = 120) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(expr, 'text/xml');
    const elm = doc.firstChild;
    const [x1, y1] = convert(elm.getAttribute('x1'), elm.getAttribute('y1'), degrees);
    const [x2, y2] = convert(elm.getAttribute('x2'), elm.getAttribute('y2'), degrees);
    elm.setAttribute('x1', x1);
    elm.setAttribute('x2', x2);
    elm.setAttribute('y1', y1);
    elm.setAttribute('y2', y2);
    return new XMLSerializer().serializeToString(doc);
}

// Usage example:
rotate('<wire x1="89.1179125" y1="27.94" x2="97.79" y2="36.6120875" width="0" layer="20" curve="90"/>', 120);

/*
Another example:

const wires = `<wire x1="72.181890625" y1="27.94" x2="89.1179125" y2="27.94" width="0" layer="20"/>
<wire x1="89.1179125" y1="27.94" x2="97.79" y2="36.6120875" width="0" layer="20" curve="90"/>
<wire x1="97.79" y1="36.6120875" x2="97.79" y2="46.4006" width="0" layer="20"/>
<wire x1="97.79" y1="46.4006" x2="87.0406" y2="57.15" width="0" layer="20" curve="90"/>
<wire x1="87.0406" y1="57.15" x2="72.28305" y2="57.15" width="0" layer="20"/>
<wire x1="72.28305" y1="57.15" x2="52.207429578368604" y2="67.41226046219032" width="0" layer="20" curve="-60"/>`;

console.log(wires.split('\n').map(item => rotate(item, 120)).join('\n'));
*/
