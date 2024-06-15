let looping = true;
let keysActive = true;
let socket, cnvs, gl, shaderProgram, time;
let drawCount = 0, drawIncrement = 1;
let vertices, vbuffer, dotsVBuf;
let currentProgram;
let ratio;
const seed = 10;
const openSimplex = openSimplexNoise(seed);
let resolution = 1;

function setup() {
    socket = io.connect('http://localhost:8080');
    pixelDensity(1);
    noCanvas();
    cnvs = document.getElementById('cnvs');
    cnvs.width = window.innerWidth * resolution;
    cnvs.height = window.innerHeight * resolution;
    gl = cnvs.getContext('webgl', { preserveDrawingBuffer: true });
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(false);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.viewport(0, 0, cnvs.width, cnvs.height);
    vbuffer = gl.createBuffer();
    frameRate(20);
    dotsVBuf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dotsVBuf);

    shadersReadyToInitiate = true;
    initializeShaders();

    currentProgram = getProgram("waning-gibbous");
    gl.useProgram(currentProgram);
    var coord = gl.getAttribLocation(currentProgram, "coordinates");
    gl.vertexAttribPointer(coord, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    setTimeout(function() {
        scdConsoleArea.setAttribute("style", "display:block;");
        scdArea.style.display = "none";
        scdConsoleArea.setAttribute("style", "display:none;");
        jsCmArea.style.height = "685px";
        jsArea.style.display = "block";
        displayMode = "js";
        javaScriptEditor.cm.refresh();
    }, 1);
    ratio = window.innerHeight / window.innerWidth; 
    if (!looping) {
        noLoop();
    }
}

draw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawSpace(currentProgram);
    // drawSimplexNoiseField(currentProgram);
    drawFirstQuarterMoon(currentProgram);
    drawLastQuarterMoon(currentProgram);
    drawWaningGibbous(currentProgram);
    drawWaxingGibbous(currentProgram);
    drawFull(currentProgram);
    drawNewMoon(currentProgram);
    drawWaxingCrescentMoon(currentProgram);
    drawWaningCrescentMoon(currentProgram);
    drawCount += drawIncrement;
};

drawSpace = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 3e-2;
    let n = 10000;
    for (let i = 0; i < n; i++) {
        let x = openSimplex.noise2D(i, 0);
        let y = openSimplex.noise2D(i + 1e5, 0);
        x += Math.sin(t + i) * 0.025;
        vertices.push(x * 1.5, y * 1.5, 15, 0.3);
    }
    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, n);
};



drawFirstQuarterMoon = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(0, 0.5, 15, 0.3);
    currentProgram = getProgram("first-quarter-moon");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};

drawLastQuarterMoon = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(0, -0.5, 15, 0.3);
    currentProgram = getProgram("last-quarter-moon");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};

drawWaningGibbous = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(-0.5, -0.5, 15, 0.3);
    currentProgram = getProgram("waning-gibbous");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};


drawWaxingGibbous = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(-0.5, 0.5, 15, 0.3);
    currentProgram = getProgram("waxing-gibbous");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};

drawWaxingGibbous = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(-0.5, 0.5, 15, 0.3);
    currentProgram = getProgram("waxing-gibbous");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};

drawFull = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(-0.75, 0, 15, 0.3);
    currentProgram = getProgram("full");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};


drawNewMoon = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(0.75, 0, 15, 0.3);
    currentProgram = getProgram("new-moon");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};

drawWaxingCrescentMoon = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(0.5, 0.5, 15, 0.3);
    currentProgram = getProgram("waxing-crescent-moon");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};

drawWaningCrescentMoon = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 1e-4;
    vertices.push(0.5, -0.5, 15, 0.3);
    currentProgram = getProgram("waning-crescent-moon");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, 1);
};



drawSimplexNoiseField = function(selectedProgram) {
    vertices = [];
    let t = drawCount * 0.5e-1;
    let dotAmount = 30000;
    dotAmount = Math.sqrt(dotAmount);
    for (let x = 0; x < dotAmount; x++) {
        for (let y = 0; y < (dotAmount * ratio); y++) {
           let n = (openSimplex.noise3D(x * 0.1, y * 0.1, t) + 1) * 0.5;
           vertices.push((x / dotAmount - 0.5) * 1.95, (y / dotAmount / ratio - 0.5) * 1.95, 50 * n, 0.3);
           // vertices.push((x / dotAmount - 0.5) * 2.5 * (1 - y / (dotAmount * ratio) * 0.45), (y / dotAmount / ratio - 0.5) * 1.75 + n * 0.2 - 0.1, 50 * n, 0.3);
        }
    }
    currentProgram = getProgram("smooth-dots");
    gl.useProgram(currentProgram);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.drawArrays(gl.POINTS, 0, vertices.length / 4);
};

function setResolution(r) {
    resolution = r;
    cnvs.width = window.innerWidth * resolution;
    cnvs.height = window.innerHeight * resolution;
}

function keyPressed() {
    if (keysActive) {
        if (keyCode === 32) {
            if (looping) {
                noLoop();
                looping = false;
            } else {
                loop();
                looping = true;
            }
        }
    }
}