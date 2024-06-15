let firstQuarterMoon = new ShaderProgram("first-quarter-moon");

firstQuarterMoon.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
firstQuarterMoon.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 3.5;
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.75, 0.5)) * 8.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(-0.5, 1.0) * 0.5) * 4.;
        // waxing gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared);
        float cut = smoothstep(0.2, 0.6, pos.x);
        col = col * vec3(cut);
        // col = vec3(cut);
        // distSquared2 = smoothstep(0.0, 1.0, distSquared2);
        // col = vec3(distSquared - max(0.0, distSquared2 * 1.)*1.);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) * 0.8 - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
firstQuarterMoon.vertText = firstQuarterMoon.vertText.replace(/[^\x00-\x7F]/g, "");
firstQuarterMoon.fragText = firstQuarterMoon.fragText.replace(/[^\x00-\x7F]/g, "");
firstQuarterMoon.init();

let lastQuarterMoon = new ShaderProgram("last-quarter-moon");

lastQuarterMoon.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
lastQuarterMoon.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = vec2(1.0, 1.0) - gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 3.5;
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.75, 0.5)) * 8.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(-0.5, 1.0) * 0.5) * 4.;
        // waxing gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared);
        float cut = smoothstep(0.2, 0.6, pos.x);
        col = col * vec3(cut);
        // col = vec3(cut);
        // distSquared2 = smoothstep(0.0, 1.0, distSquared2);
        // col = vec3(distSquared - max(0.0, distSquared2 * 1.)*1.);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) * 0.8 - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
lastQuarterMoon.vertText = lastQuarterMoon.vertText.replace(/[^\x00-\x7F]/g, "");
lastQuarterMoon.fragText = lastQuarterMoon.fragText.replace(/[^\x00-\x7F]/g, "");
lastQuarterMoon.init();

let full = new ShaderProgram("full");

full.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
full.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = vec2(1.0, 1.0) - gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.75, 0.5)) * 8.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // waxing gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared);
        // col = vec3(distSquared - max(0.0, distSquared2 * 0.75)*0.5);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
full.vertText = full.vertText.replace(/[^\x00-\x7F]/g, "");
full.fragText = full.fragText.replace(/[^\x00-\x7F]/g, "");
full.init();

let newMoon = new ShaderProgram("new-moon");

newMoon.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
newMoon.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = vec2(1.0, 1.0) - gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 0.5)) * 6.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // waxing gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared - max(0.0, distSquared2));
        // col = vec3(distSquared) - vec3(1.0 - distSquared2);
        // col = vec3(distSquared - max(0.0, distSquared2 * -0.75)*1.5);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
newMoon.vertText = newMoon.vertText.replace(/[^\x00-\x7F]/g, "");
newMoon.fragText = newMoon.fragText.replace(/[^\x00-\x7F]/g, "");
newMoon.init();

let waxingCrescentMoon = new ShaderProgram("waxing-crescent-moon");

waxingCrescentMoon.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
waxingCrescentMoon.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 0.5)) * 6.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // waxing gibbous
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared - max(0.0, distSquared2));
        // col = vec3(distSquared) - vec3(1.0 - distSquared2);
        // col = vec3(distSquared - max(0.0, distSquared2 * -0.75)*1.5);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
waxingCrescentMoon.vertText = waxingCrescentMoon.vertText.replace(/[^\x00-\x7F]/g, "");
waxingCrescentMoon.fragText = waxingCrescentMoon.fragText.replace(/[^\x00-\x7F]/g, "");
waxingCrescentMoon.init();


let waningCrescentMoon = new ShaderProgram("waning-crescent-moon");

waningCrescentMoon.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
waningCrescentMoon.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = vec2(1.0, 1.0) - gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 0.5)) * 6.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // waxing gibbous
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared - max(0.0, distSquared2));
        // col = vec3(distSquared) - vec3(1.0 - distSquared2);
        // col = vec3(distSquared - max(0.0, distSquared2 * -0.75)*1.5);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
waningCrescentMoon.vertText = waningCrescentMoon.vertText.replace(/[^\x00-\x7F]/g, "");
waningCrescentMoon.fragText = waningCrescentMoon.fragText.replace(/[^\x00-\x7F]/g, "");
waningCrescentMoon.init();

let waningGibbous = new ShaderProgram("waning-gibbous");

waningGibbous.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
waningGibbous.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = vec2(1.0, 1.0) - gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.75, 0.5)) * 8.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // waxing gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared);
        col = vec3(distSquared - max(0.0, distSquared2 * 0.75)*0.5);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0., 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
waningGibbous.vertText = waningGibbous.vertText.replace(/[^\x00-\x7F]/g, "");
waningGibbous.fragText = waningGibbous.fragText.replace(/[^\x00-\x7F]/g, "");
waningGibbous.init();



let waxingGibbous = new ShaderProgram("waxing-gibbous");

waxingGibbous.vertText = `
    // beginGLSL
    attribute vec4 coordinates;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    void main(void) {
        gl_Position = vec4(coordinates.x, coordinates.y, 0.0, 1.0);
        center = vec2(gl_Position.x, gl_Position.y);
        center = 512.0 + center * 512.0;
        myposition = vec2(gl_Position.x, gl_Position.y);
        alph = coordinates.w;
        gl_PointSize = 200.;
        pointSize = gl_PointSize;
    }
    // endGLSL
`;
waxingGibbous.fragText = `
    // beginGLSL
    precision mediump float;
    varying vec2 myposition;
    varying vec2 center;
    varying float alph;
    varying float pointSize;
    float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453 * (2.0 + sin(co.x)));
    }
    void main(void) {
        // gl_FragCoord is the global pixel position on the canvas.
        vec2 uv = gl_FragCoord.xy / vec2(2560., 1600.) * 2.;
        // gl_PointCoord is the local pixel position within the point.
        vec2 pos = gl_PointCoord;
        float distSquared = 1.0 - dot(pos - 0.5, pos - 0.5) * 4.;
        float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.75, 0.5)) * 8.;
        // float distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.505, 0.5)) * 6.;
        // waning gibbous
        distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // waxing gibbous
        // distSquared2 = 1.0 - dot(pos - vec2(0.5, 0.5), pos - vec2(0.5, 1.0) * 0.5) * 6.;
        // distSquared2 = dot(pos - vec2(0.5, 0.5), pos - vec2(-4.5, 3.95)) * 0.25;
        vec3 col = vec3(pos.x, pos.y, 1. - pos.x);
        col = vec3(1.0 - length(pos - vec2(0.5)) * 2.);
        col = vec3(distSquared);
        col = vec3(distSquared - max(0.0, distSquared2 * 0.75)*0.5);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = smoothstep(0.0, 1.0, col);
        // col = max(vec3(0.0), col);
        // col = col * col * (3.0 - 2.0 * col);
        vec3 randCol = vec3(rand(pos), rand(pos+vec2(10.)), rand(pos+vec2(20.)));
        float alpha = smoothstep(0.0, 0.2, distSquared);
        gl_FragColor = vec4(col * vec3(0.5, 0.8, 1.) - randCol * 0.1, alpha);
        
    }
    // endGLSL
`;
waxingGibbous.vertText = waxingGibbous.vertText.replace(/[^\x00-\x7F]/g, "");
waxingGibbous.fragText = waxingGibbous.fragText.replace(/[^\x00-\x7F]/g, "");
waxingGibbous.init();