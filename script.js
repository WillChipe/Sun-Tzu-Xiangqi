class Balatro {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.gl = this.canvas.getContext('webgl');
        if (!this.gl) {
            console.error('WebGL not supported');
            return;
        }

        this.options = {
            spinRotation: -10,
            spinSpeed: 4,
            color1: [0.067, 0.075, 0.231], // #11133b
            color2: [0.0, 0.42, 0.706],    // #006BB4
            color3: [0.086, 0.137, 0.145], // #162325
            contrast: 1.0,
            lighting: 0.15,
            spinAmount: 0.1,
            pixelFilter: 2000,
            ...options
        };

        this.startTime = Date.now();
        this.initShaders();
        this.initBuffers();
        this.running = localStorage.getItem('balatro-enabled') !== 'false';
        if (this.running) {
            this.animate();
        } else {
            this.canvas.style.display = 'none';
        }

        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    toggle(enabled) {
        this.running = enabled;
        localStorage.setItem('balatro-enabled', enabled);
        if (enabled) {
            this.canvas.style.display = 'block';
            this.resize();
            this.animate();
        } else {
            this.canvas.style.display = 'none';
        }
    }

    hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        return [
            ((bigint >> 16) & 255) / 255,
            ((bigint >> 8) & 255) / 255,
            (bigint & 255) / 255
        ];
    }

    initShaders() {
        const vsSource = `
            attribute vec4 aPosition;
            void main() {
                gl_Position = aPosition;
            }
        `;

        const fsSource = `
            precision highp float;
            uniform float iTime;
            uniform vec2 iResolution;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform vec3 color3;
            uniform float contrast;
            uniform float lighting;
            uniform float spinAmount;
            uniform float pixelFilter;
            uniform float spinRotation;
            uniform float spinSpeed;

            void main() {
                vec2 uv = gl_FragCoord.xy / iResolution.xy;
                if (pixelFilter > 0.0) {
                    uv = floor(uv * pixelFilter) / pixelFilter;
                }

                vec2 p = (uv - 0.5);
                p.x *= iResolution.x / iResolution.y;

                float t = iTime * spinSpeed * 0.1;

                float angle = spinRotation + t * spinAmount;
                float s = sin(angle);
                float c = cos(angle);
                p = mat2(c, -s, s, c) * p;

                for(int i = 1; i < 4; i++) { // Optimization: reduced from 6 to 3
                    p.x += 0.3 / float(i) * sin(float(i) * 3.0 * p.y + t) + 1.0;
                    p.y += 0.3 / float(i) * sin(float(i) * 3.0 * p.x + t) + 1.0;
                }

                vec3 col = mix(color1, color2, 0.5 + 0.5 * sin(p.x + p.y));
                col = mix(col, color3, 0.5 + 0.5 * cos(p.x * p.y));
                
                col *= contrast;
                col += lighting;

                gl_FragColor = vec4(col, 1.0);
            }
        `;

        this.program = this.createProgram(vsSource, fsSource);
    }

    createProgram(vsSource, fsSource) {
        const vs = this.compileShader(vsSource, this.gl.VERTEX_SHADER);
        const fs = this.compileShader(fsSource, this.gl.FRAGMENT_SHADER);
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);
        this.gl.linkProgram(program);
        return program;
    }

    compileShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    initBuffers() {
        const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        const aPosition = this.gl.getAttribLocation(this.program, 'aPosition');
        this.gl.enableVertexAttribArray(aPosition);
        this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 0, 0);
    }

    resize() {
        // Optimization: Render at half resolution for much better performance
        const scale = 0.5;
        this.canvas.width = Math.floor(window.innerWidth * scale);
        this.canvas.height = Math.floor(window.innerHeight * scale);
        // CSS handles the upscaling back to 100%
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        if (!this.running) return;

        const now = Date.now();
        this.lastFrameTime = now;

        const time = (now - this.startTime) / 1000;
        this.gl.useProgram(this.program);

        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'iTime'), time);
        this.gl.uniform2f(this.gl.getUniformLocation(this.program, 'iResolution'), this.canvas.width, this.canvas.height);
        this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'color1'), this.options.color1);
        this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'color2'), this.options.color2);
        this.gl.uniform3fv(this.gl.getUniformLocation(this.program, 'color3'), this.options.color3);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'contrast'), this.options.contrast);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'lighting'), this.options.lighting);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'spinAmount'), this.options.spinAmount);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'pixelFilter'), this.options.pixelFilter);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'spinRotation'), this.options.spinRotation);
        this.gl.uniform1f(this.gl.getUniformLocation(this.program, 'spinSpeed'), this.options.spinSpeed);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    balatroInstance = new Balatro('balatro-canvas', {
        color1: [0.067, 0.075, 0.231], // #11133b
        color2: [0.0, 0.42, 0.706],    // #006BB4
        color3: [0.086, 0.137, 0.145], // #162325
        spinRotation: -10,
        spinSpeed: 4,
        contrast: 1.0,
        lighting: 0.15,
        spinAmount: 0.1,
        pixelFilter: 2000
    });

    const isEnabled = localStorage.getItem('balatro-enabled') !== 'false';
    const toggle = document.getElementById('balatro-toggle');
    if (toggle) toggle.checked = isEnabled;
});

let balatroInstance = null;
function toggleBalatro(enabled) {
    if (balatroInstance) balatroInstance.toggle(enabled);
}

const PIECE_TEXT = {
    'K': '帥', 'A': '仕', 'B': '相', 'N': '傌', 'R': '俥', 'C': '炮', 'P': '兵',
    'k': '將', 'a': '士', 'b': '象', 'n': '馬', 'r': '車', 'c': '砲', 'p': '卒'
};
const PIECE_EURO = {
    'K': 'K', 'A': 'A', 'B': 'E', 'N': 'H', 'R': 'R', 'C': 'C', 'P': 'P',
    'k': 'k', 'a': 'a', 'b': 'e', 'n': 'h', 'r': 'r', 'c': 'c', 'p': 'p'
};
const PIECE_ICONS = {
    'K': '👑', 'A': '🛡️', 'B': '🐘', 'N': '🐴', 'R': '🏰', 'C': '💣', 'P': '💂',
    'k': '👑', 'a': '🛡️', 'b': '🐘', 'n': '🐴', 'r': '🏰', 'c': '💣', 'p': '💂'
};

const initialBoard = [
    ['r', 'n', 'b', 'a', 'k', 'a', 'b', 'n', 'r'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', 'c', '.', '.', '.', '.', '.', 'c', '.'],
    ['p', '.', 'p', '.', 'p', '.', 'p', '.', 'p'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['P', '.', 'P', '.', 'P', '.', 'P', '.', 'P'],
    ['.', 'C', '.', '.', '.', '.', '.', 'C', '.'],
    ['.', '.', '.', '.', '.', '.', '.', '.', '.'],
    ['R', 'N', 'B', 'A', 'K', 'A', 'B', 'N', 'R']
];

// Состояние игры
let boardState = JSON.parse(JSON.stringify(initialBoard));
let capturedRed = [];   // Что съели Черные (Красные фигуры)
let capturedBlack = []; // Что съели Красные (Черные фигуры)
let selected = null;
let turn = 'red';
let validMoves = [];
let playerColor = 'red';
let currentStyle = 'icons';
let isGameActive = false;
let difficulty = 1;
let gameMode = 'vs-bot';
let globalVolume = 1.0;

const piecesLayer = document.getElementById('pieces-layer');
const statusText = document.getElementById('status');
const boardEl = document.getElementById('board');

let pieceElementsMap = new Map(); // Для переиспользования DOM элементов и плавных анимаций
let pieceIdCounter = 0;

let moveHistoryText = [];
let boardStatesHistory = []; // Состояния после каждого полухода (0 - начальное)
let isShowingPrevious = false;
let viewingHistoryIndex = -1; // -1 значит смотрим текущий ход, иначе индекс в boardStatesHistory

// --- УПРАВЛЕНИЕ ---

function updateDiffLabel(val) {
    difficulty = parseInt(val);
    const labels = { 1: "1 - Новичок", 2: "2 - Любитель", 3: "3 - Средний", 4: "4 - Продвинутый", 5: "5 - Эксперт" };
    const labelEl = document.getElementById('setup-diff-val');
    if (labelEl) labelEl.innerText = labels[val];
}

function startGame(color) {
    if (color === 'random') {
        color = Math.random() < 0.5 ? 'red' : 'black';
    }
    playerColor = color;
    document.getElementById('start-screen').style.display = 'none';
    isGameActive = true;
    viewingHistoryIndex = -1;
    moveHistoryText = [];
    boardStatesHistory = [];
    // Initialize boardState with objects for pieces
    boardState = initialBoard.map(row => row.map(pieceChar => {
        if (pieceChar === '.') return '.';
        return { type: pieceChar, id: pieceIdCounter++ };
    }));
    boardStatesHistory.push(cloneBoard(boardState)); // Save initial state (индекс 0)
    updateHistoryUI();
    render();
    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 800);
}

function selectMode(mode) {
    if (mode === 'two') {
        gameMode = 'hotseat';
        startGame('red');
    } else {
        gameMode = 'vs-bot';
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('solo-setup').style.display = 'block';
    }
}

function showModeSelection() {
    document.getElementById('mode-selection').style.display = 'block';
    document.getElementById('solo-setup').style.display = 'none';
}

function toggleGameMode() {
    gameMode = (gameMode === 'vs-bot') ? 'hotseat' : 'vs-bot';
    document.getElementById('mode-name').innerText = (gameMode === 'vs-bot') ? 'Против Бота' : 'Два игрока';
    const diffS = document.getElementById('diff-slider');
    if (diffS) diffS.disabled = (gameMode === 'hotseat');

    // Сбросить просмотр истории
    viewingHistoryIndex = -1;

    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 600);
    render();
}

function changeStyle(newStyle) {
    currentStyle = newStyle;
    updateHelpSymbols();
    updateHistoryUI(); // Обновляем историю, чтобы сменились иконки
    render();
}

function updateHelpSymbols() {
    const dict = currentStyle === 'kanji' ? PIECE_TEXT : (currentStyle === 'euro' ? PIECE_EURO : PIECE_ICONS);
    const isKanji = currentStyle === 'kanji';
    document.querySelectorAll('.help-sym').forEach(el => {
        el.innerText = dict[el.getAttribute('data-p')];
        el.style.display = isKanji ? 'none' : 'inline';
    });
}

// --- ЛОГИКА ПРАВИЛ ---

function inBounds(r, c) { return r >= 0 && r < 10 && c >= 0 && c < 9; }

function isFlyingGeneral(board) {
    let rK = -1, cK = -1, bK = -1, cbK = -1;
    for (let r = 0; r < 10; r++) {
        for (let c = 3; c <= 5; c++) {
            if (board[r][c] !== '.' && board[r][c].type === 'K') { rK = r; cK = c; }
            if (board[r][c] !== '.' && board[r][c].type === 'k') { bK = r; cbK = c; }
        }
    }
    if (cK !== cbK || cK === -1) return false;
    let start = Math.min(rK, bK), end = Math.max(rK, bK);
    for (let i = start + 1; i < end; i++) if (board[i][cK] !== '.') return false;
    return true;
}

function findKing(board, color) {
    const char = color === 'red' ? 'K' : 'k';
    for (let r = 0; r < 10; r++) for (let c = 3; c <= 5; c++) if (board[r][c] !== '.' && board[r][c].type === char) return { r, c };
    return null;
}

function isKingUnderAttack(board, color) {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;
    const enemyColor = color === 'red' ? 'black' : 'red';
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = board[r][c];
            if (pObj === '.') continue;
            const p = pObj.type;
            if (p !== '.' && ((enemyColor === 'red' && p === p.toUpperCase()) || (enemyColor === 'black' && p === p.toLowerCase()))) {
                if (generatePseudoMoves(r, c, board).some(m => m[0] === kingPos.r && m[1] === kingPos.c)) return true;
            }
        }
    }
    return false;
}

function generatePseudoMoves(r, c, board) {
    const moves = [];
    const pieceObj = board[r][c];
    if (pieceObj === '.') return moves;
    const piece = pieceObj.type;
    const type = piece.toUpperCase(), isRed = piece === piece.toUpperCase();
    const enemy = (nr, nc) => {
        const tObj = board[nr][nc];
        if (tObj === '.') return false;
        const t = tObj.type;
        return t !== '.' && (isRed ? t === t.toLowerCase() : t === t.toUpperCase());
    };

    if (type === 'R' || type === 'C') {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
            let jumped = false;
            for (let i = 1; i < 10; i++) {
                let nr = r + dr * i, nc = c + dc * i;
                if (!inBounds(nr, nc)) break;
                const t = board[nr][nc];
                if (!jumped) {
                    if (t === '.') moves.push([nr, nc]);
                    else { if (type === 'R') { if (enemy(nr, nc)) moves.push([nr, nc]); break; } jumped = true; }
                } else if (t !== '.') { if (enemy(nr, nc)) moves.push([nr, nc]); break; }
            }
        });
    }
    if (type === 'N') {
        const kn = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]], bl = [[-1, 0], [-1, 0], [1, 0], [1, 0], [0, -1], [0, -1], [0, 1], [0, 1]];
        kn.forEach(([dr, dc], i) => {
            const nr = r + dr, nc = c + dc, br = r + bl[i][0], bc = c + bl[i][1];
            if (inBounds(nr, nc) && board[br][bc] === '.' && (board[nr][nc] === '.' || enemy(nr, nc))) moves.push([nr, nc]);
        });
    }
    if (type === 'B') {
        [[-2, -2], [-2, 2], [2, -2], [2, 2]].forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc, er = r + dr / 2, ec = c + dc / 2;
            if (inBounds(nr, nc) && board[er][ec] === '.' && (isRed ? nr >= 5 : nr <= 4) && (board[nr][nc] === '.' || enemy(nr, nc))) moves.push([nr, nc]);
        });
    }
    if (type === 'A' || type === 'K') {
        const diffs = type === 'A' ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : [[1, 0], [-1, 0], [0, 1], [0, -1]];
        diffs.forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            if (inBounds(nr, nc) && (nc >= 3 && nc <= 5) && (isRed ? nr >= 7 : nr <= 2) && (board[nr][nc] === '.' || enemy(nr, nc))) moves.push([nr, nc]);
        });
    }
    if (type === 'P') {
        const dir = isRed ? -1 : 1;
        if (inBounds(r + dir, c) && (board[r + dir][c] === '.' || enemy(r + dir, c))) moves.push([r + dir, c]);
        const crossedRiver = isRed ? r <= 4 : r >= 5;
        if (crossedRiver) {
            [[0, 1], [0, -1]].forEach(([dr, dc]) => {
                if (inBounds(r, c + dc) && (board[r][c + dc] === '.' || enemy(r, c + dc))) moves.push([r, c + dc]);
            });
        }
    }
    return moves;
}

function getLegalMoves(r, c, board = boardState) {
    const pseudo = generatePseudoMoves(r, c, board);
    const pieceObj = board[r][c];
    if (pieceObj === '.') return [];
    const color = pieceObj.type === pieceObj.type.toUpperCase() ? 'red' : 'black';
    return pseudo.filter(([tr, tc]) => {
        const temp = cloneBoard(board);
        temp[tr][tc] = temp[r][c]; temp[r][c] = '.';
        return !isFlyingGeneral(temp) && !isKingUnderAttack(temp, color);
    });
}

// --- ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ (Embedded Worker) ---
const AI_WORKER_CODE = `
const PIECE_VALUES = {
    'K': 10000, 'R': 900, 'C': 450, 'N': 400, 'B': 200, 'A': 200, 'P': 100,
    'k': 10000, 'r': 900, 'c': 450, 'n': 400, 'b': 200, 'a': 200, 'p': 100
};

// Piece-Square Tables (для красных, для черных инвертируем индекс строки)
const PST = {
    'P': [
        [0,  3,  6,  9,  12,  9,  6,  3,  0],
        [18, 36, 54, 80, 80, 80, 54, 36, 18],
        [14, 28, 42, 60, 70, 60, 42, 28, 14],
        [10, 20, 30, 40, 50, 40, 30, 20, 10],
        [6,  12, 18, 24, 30, 24, 18, 12, 6],
        [2,  4,  6,  8,  10,  8,  6,  4,  2],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0]
    ],
    'N': [
        [-5, -10, -5, -5, -5, -5, -5, -10, -5],
        [-5,  5,  5,  5,  5,  5,  5,   5, -5],
        [-5,  5, 10, 10, 10, 10, 10,   5, -5],
        [-5,  5, 10, 15, 15, 15, 10,   5, -5],
        [-5,  5, 10, 15, 20, 15, 10,   5, -5],
        [-5,  5, 10, 15, 15, 15, 10,   5, -5],
        [-5,  5, 10, 10, 10, 10, 10,   5, -5],
        [-5,  5,  5,  5,  5,  5,  5,   5, -5],
        [-5, -10, -5, -10, -10, -10, -5, -10, -5],
        [-5, -5, -5, -5, -5, -5, -5, -5, -5]
    ],
    'R': [
        [10, 10, 10, 15, 20, 15, 10, 10, 10],
        [15, 20, 20, 25, 30, 25, 20, 20, 15],
        [10, 15, 15, 20, 25, 20, 15, 15, 10],
        [10, 15, 15, 20, 25, 20, 15, 15, 10],
        [10, 15, 15, 20, 25, 20, 15, 15, 10],
        [10, 15, 15, 20, 25, 20, 15, 15, 10],
        [15, 20, 20, 25, 30, 25, 20, 20, 15],
        [10, 15, 15, 20, 15, 20, 15, 15, 10], // Небольшой бонус за седьмую/восьмую горизонталь
        [0,  5,  5,  10, 10, 10, 5,  5,  0],
        [0,  0,  0,   5,  5,  5, 0,  0,  0]
    ],
    'C': [
        [0,  5,  5,  5,  5,  5,  5,  5,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  5,  0,  0,  0,  0],
        [0,  0,  0,  5, 10,  5,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0],
        [0,  0,  0,  0,  0,  0,  0,  0,  0]
    ]
};

function cloneBoard(board) {
    return board.map(row => row.map(cell => {
        if (cell === '.') return '.';
        return { ...cell };
    }));
}

function inBounds(r, c) { return r >= 0 && r < 10 && c >= 0 && c < 9; }

function isFlyingGeneral(board) {
    let rK = -1, cK = -1, bK = -1, cbK = -1;
    for (let r = 0; r < 10; r++) {
        for (let c = 3; c <= 5; c++) {
            if (board[r][c] !== '.' && board[r][c].type === 'K') { rK = r; cK = c; }
            if (board[r][c] !== '.' && board[r][c].type === 'k') { bK = r; cbK = c; }
        }
    }
    if (cK !== cbK || cK === -1) return false;
    let start = Math.min(rK, bK), end = Math.max(rK, bK);
    for (let i = start + 1; i < end; i++) if (board[i][cK] !== '.') return false;
    return true;
}

function findKing(board, color) {
    const char = color === 'red' ? 'K' : 'k';
    for (let r = 0; r < 10; r++) for (let c = 3; c <= 5; c++) if (board[r][c] !== '.' && board[r][c].type === char) return { r, c };
    return null;
}

function isKingUnderAttack(board, color) {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;
    const enemyColor = color === 'red' ? 'black' : 'red';
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = board[r][c];
            if (pObj === '.') continue;
            const p = pObj.type;
            const pieceColor = p === p.toUpperCase() ? 'red' : 'black';
            if (pieceColor === enemyColor) {
                if (generatePseudoMoves(r, c, board).some(m => m[0] === kingPos.r && m[1] === kingPos.c)) return true;
            }
        }
    }
    return false;
}

function generatePseudoMoves(r, c, board) {
    const moves = [];
    const pieceObj = board[r][c];
    if (pieceObj === '.') return moves;
    const piece = pieceObj.type;
    const type = piece.toUpperCase(), isRed = piece === piece.toUpperCase();
    const enemy = (nr, nc) => {
        const tObj = board[nr][nc];
        if (tObj === '.') return false;
        const t = tObj.type;
        return t !== '.' && (isRed ? t === t.toLowerCase() : t === t.toUpperCase());
    };

    if (type === 'R' || type === 'C') {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => {
            let jumped = false;
            for (let i = 1; i < 10; i++) {
                let nr = r + dr * i, nc = c + dc * i;
                if (!inBounds(nr, nc)) break;
                const t = board[nr][nc];
                if (!jumped) {
                    if (t === '.') moves.push([nr, nc]);
                    else { if (type === 'R') { if (enemy(nr, nc)) moves.push([nr, nc]); break; } jumped = true; }
                } else if (t !== '.') { if (enemy(nr, nc)) moves.push([nr, nc]); break; }
            }
        });
    }
    if (type === 'N') {
        const kn = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]], bl = [[-1, 0], [-1, 0], [1, 0], [1, 0], [0, -1], [0, -1], [0, 1], [0, 1]];
        kn.forEach(([dr, dc], i) => {
            const nr = r + dr, nc = c + dc, br = r + bl[i][0], bc = c + bl[i][1];
            if (inBounds(nr, nc) && board[br][bc] === '.' && (board[nr][nc] === '.' || enemy(nr, nc))) moves.push([nr, nc]);
        });
    }
    if (type === 'B') {
        [[-2, -2], [-2, 2], [2, -2], [2, 2]].forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc, er = r + dr / 2, ec = c + dc / 2;
            if (inBounds(nr, nc) && board[er][ec] === '.' && (isRed ? nr >= 5 : nr <= 4) && (board[nr][nc] === '.' || enemy(nr, nc))) moves.push([nr, nc]);
        });
    }
    if (type === 'A' || type === 'K') {
        const diffs = type === 'A' ? [[1, 1], [1, -1], [-1, 1], [-1, -1]] : [[1, 0], [-1, 0], [0, 1], [0, -1]];
        diffs.forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            if (inBounds(nr, nc) && (nc >= 3 && nc <= 5) && (isRed ? nr >= 7 : nr <= 2) && (board[nr][nc] === '.' || enemy(nr, nc))) moves.push([nr, nc]);
        });
    }
    if (type === 'P') {
        const dir = isRed ? -1 : 1;
        if (inBounds(r + dir, c) && (board[r + dir][c] === '.' || enemy(r + dir, c))) moves.push([r + dir, c]);
        const crossedRiver = isRed ? r <= 4 : r >= 5;
        if (crossedRiver) {
            [[0, 1], [0, -1]].forEach(([dr, dc]) => {
                if (inBounds(r, c + dc) && (board[r][c + dc] === '.' || enemy(r, c + dc))) moves.push([r, c + dc]);
            });
        }
    }
    return moves;
}

function getLegalMoves(r, c, board) {
    const pseudo = generatePseudoMoves(r, c, board);
    const pieceObj = board[r][c];
    if (pieceObj === '.') return [];
    const color = pieceObj.type === pieceObj.type.toUpperCase() ? 'red' : 'black';
    return pseudo.filter(([tr, tc]) => {
        const temp = cloneBoard(board);
        temp[tr][tc] = temp[r][c]; temp[r][c] = '.';
        return !isFlyingGeneral(temp) && !isKingUnderAttack(temp, color);
    });
}

function evaluateBoard(board) {
    let score = 0;
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = board[r][c];
            if (pObj === '.') continue;
            const p = pObj.type;
            const isRed = p === p.toUpperCase();
            const type = p.toUpperCase();
            
            // Базовая стоимость
            let val = PIECE_VALUES[p];
            
            // Бонус из позиционной таблицы
            if (PST[type]) {
                const row = isRed ? r : 9 - r;
                val += PST[type][row][c];
            }
            
            score += isRed ? val : -val;
        }
    }
    return score;
}

// Сортировка ходов: сначала взятия (MVV-LVA)
function orderMoves(moves, board) {
    return moves.map(m => {
        let score = 0;
        const attacker = board[m.fr][m.fc].type;
        const victimObj = board[m.tr][m.tc];
        if (victimObj !== '.') {
            const victim = victimObj.type;
            // MVV-LVA: Most Valuable Victim - Least Valuable Attacker
            score = 10000 + (PIECE_VALUES[victim] * 10) - Math.floor(PIECE_VALUES[attacker] / 10);
        }
        return { ...m, score };
    }).sort((a, b) => b.score - a.score);
}

function minimax(board, depth, alpha, beta, isMaximizing) {
    if (depth === 0) return evaluateBoard(board);
    const color = isMaximizing ? 'red' : 'black';
    let moves = [];
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = board[r][c];
            if (pObj === '.') continue;
            const p = pObj.type;
            const pieceColor = p === p.toUpperCase() ? 'red' : 'black';
            if (pieceColor === color) {
                getLegalMoves(r, c, board).forEach(m => moves.push({ fr: r, fc: c, tr: m[0], tc: m[1] }));
            }
        }
    }
    
    if (moves.length === 0) return isMaximizing ? -100000 : 100000;

    // Оптимизация: сортируем ходы
    moves = orderMoves(moves, board);

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (let m of moves) {
            const temp = cloneBoard(board);
            temp[m.tr][m.tc] = temp[m.fr][m.fc]; temp[m.fr][m.fc] = '.';
            maxEval = Math.max(maxEval, minimax(temp, depth - 1, alpha, beta, false));
            alpha = Math.max(alpha, maxEval);
            if (beta <= alpha) break;
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let m of moves) {
            const temp = cloneBoard(board);
            temp[m.tr][m.tc] = temp[m.fr][m.fc]; temp[m.fr][m.fc] = '.';
            minEval = Math.min(minEval, minimax(temp, depth - 1, alpha, beta, true));
            beta = Math.min(beta, minEval);
            if (beta <= alpha) break;
        }
        return minEval;
    }
}

onmessage = function(e) {
    const { boardState, difficulty, turn } = e.data;
    const depth = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 4 }[difficulty];
    
    let moves = [];
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = boardState[r][c];
            if (pObj === '.') continue;
            const p = pObj.type;
            const pieceColor = p === p.toUpperCase() ? 'red' : 'black';
            if (pieceColor === turn) {
                getLegalMoves(r, c, boardState).forEach(m => moves.push({ fr: r, fc: c, tr: m[0], tc: m[1] }));
            }
        }
    }

    if (moves.length === 0) {
        postMessage({ bestMove: null });
        return;
    }

    if (difficulty === 1) {
        const m = moves[Math.floor(Math.random() * moves.length)];
        postMessage({ bestMove: m });
        return;
    }

    // Сортируем ходы на верхнем уровне
    moves = orderMoves(moves, boardState);

    let bestMove = null, bestVal = (turn === 'red') ? -Infinity : Infinity;
    for (let m of moves) {
        const temp = cloneBoard(boardState);
        temp[m.tr][m.tc] = temp[m.fr][m.fc]; temp[m.fr][m.fc] = '.';
        let val = minimax(temp, depth - 1, -Infinity, Infinity, turn === 'black');
        if (turn === 'red' && val > bestVal) { bestVal = val; bestMove = m; }
        else if (turn === 'black' && val < bestVal) { bestVal = val; bestMove = m; }
    }

    postMessage({ bestMove });
};
`;

function createWorker() {
    const blob = new Blob([AI_WORKER_CODE], { type: 'application/javascript' });
    return new Worker(URL.createObjectURL(blob));
}

function makeAiMove() {
    const thinkingEl = document.getElementById('ai-thinking');
    if (thinkingEl && difficulty > 2) thinkingEl.style.display = 'block';

    const worker = createWorker();

    worker.postMessage({
        boardState: boardState,
        difficulty: difficulty,
        turn: turn
    });

    worker.onmessage = function (e) {
        if (thinkingEl) thinkingEl.style.display = 'none';
        const { bestMove } = e.data;
        if (bestMove) {
            makeMove(bestMove.fr, bestMove.fc, bestMove.tr, bestMove.tc);
        }
        worker.terminate();
    };

    worker.onerror = function (err) {
        console.error('AI Worker error:', err);
        if (thinkingEl) thinkingEl.style.display = 'none';
        worker.terminate();
    };
}

// --- ИСТОРИЯ ХОДОВ И ВОЗВРАТ ---

// Горизонтальные файлы для нотации (теперь оба используют цифры для единообразия)
const FILES_RED = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];
const FILES_BLACK = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function recordMove(fr, fc, tr, tc, pieceType, targetType) {
    const isRed = pieceType === pieceType.toUpperCase();

    // Нотация (откуда - куда)
    const fromCol = isRed ? FILES_RED[fc] : FILES_BLACK[fc];
    const toCol = isRed ? FILES_RED[tc] : FILES_BLACK[tc];

    let moveDir = "";
    if (fr === tr) moveDir = `=${toCol}`; // по горизонтали
    else if (isRed) moveDir = (tr < fr) ? `+${fr - tr}` : `-${fr - tr}`; // вверх (+) / вниз (-) для красных
    else moveDir = (tr > fr) ? `+${tr - fr}` : `-${fr - tr}`; // для черных наоборот

    // Сохраняем данные хода, а не готовую строку
    moveHistoryText.push({
        type: pieceType,
        color: isRed ? 'red' : 'black',
        fromCol: fromCol,
        moveDir: moveDir,
        isCapture: targetType !== '.'
    });
    updateHistoryUI();
}

function getMoveString(move) {
    const dict = currentStyle === 'kanji' ? PIECE_TEXT : (currentStyle === 'euro' ? PIECE_EURO : PIECE_ICONS);
    const pieceName = dict[move.type];
    return `${pieceName} ${move.fromCol}${move.moveDir}${move.isCapture ? ' x' : ''}`;
}

function updateHistoryUI() {
    const list = document.getElementById('history-list');
    const header = document.getElementById('history-header');
    const footer = document.getElementById('history-footer');
    if (!list || !header || !footer) return;

    list.innerHTML = '';
    header.innerHTML = '';
    footer.innerHTML = '';

    // Добавим кнопку возврата к текущему ходу в закрепленный футер
    if (viewingHistoryIndex !== -1) {
        const backBtn = document.createElement('div');
        backBtn.className = 'history-item clickable active-history';
        backBtn.style.marginTop = '10px';
        backBtn.innerHTML = `<span><span style="color: #e67e22; font-weight: bold;">▶ Вернуться к игре</span></span>`;
        backBtn.onclick = () => { viewingHistoryIndex = -1; render(); updateHistoryUI(); };
        footer.appendChild(backBtn);
    }

    for (let i = 0; i < moveHistoryText.length; i += 2) {
        const item = document.createElement('div');
        item.className = 'history-item';

        const turnNum = Math.floor(i / 2) + 1;

        // Красный полуход (индекс i в moveHistoryText, индекс i+1 в boardStatesHistory)
        const redStateIdx = i + 1;
        const isRedActive = (viewingHistoryIndex === redStateIdx);
        const p1 = `<span class="red clickable ${isRedActive ? 'active-history' : ''}" onclick="viewHistory(${redStateIdx})">${getMoveString(moveHistoryText[i])}</span>`;

        // Черный полуход (индекс i+1 в moveHistoryText, индекс i+2 в boardStatesHistory)
        let p2 = '';
        if (moveHistoryText[i + 1]) {
            const blackStateIdx = i + 2;
            const isBlackActive = (viewingHistoryIndex === blackStateIdx);
            p2 = `<span class="black clickable ${isBlackActive ? 'active-history' : ''}" onclick="viewHistory(${blackStateIdx})">${getMoveString(moveHistoryText[i + 1])}</span>`;
        }

        item.innerHTML = `<span>${turnNum}. ${p1}</span> <span>${p2}</span>`;
        list.appendChild(item);
    }

    // Если мы не смотрим историю, прокручиваем вниз
    if (viewingHistoryIndex === -1) {
        list.scrollTop = list.scrollHeight;
    }
}

function viewHistory(stateIndex) {
    if (stateIndex >= 0 && stateIndex < boardStatesHistory.length) {
        viewingHistoryIndex = stateIndex;
        render();
        updateHistoryUI(); // Обновляем UI, чтобы подсветить активный ход
    }
}

function showPreviousMove() {
    if (boardStatesHistory.length < 2) return; // Нет прошлого хода
    // Сохраняем текущий режим просмотра
    this.savedHistoryIndex = viewingHistoryIndex;
    isShowingPrevious = true;
    render();
}

function hidePreviousMove() {
    if (!isShowingPrevious) return;
    isShowingPrevious = false;
    viewingHistoryIndex = this.savedHistoryIndex !== undefined ? this.savedHistoryIndex : -1;
    render();
}

// --- ОТРИСОВКА ---

function render() {
    if (!isGameActive) return;

    const isViewingHistory = viewingHistoryIndex !== -1;

    // Если мы просматриваем прошлый ход (кнопка зажата), берем предпоследнее состояние доски
    // Иначе, если смотрим конкретный ход из истории, берем его состояние
    // Иначе берем текущее состояние
    let displayBoard;
    let displayTurn;

    if (isShowingPrevious && boardStatesHistory.length > 1) {
        displayBoard = boardStatesHistory[boardStatesHistory.length - 2];
        displayTurn = (turn === 'red' ? 'black' : 'red');
    } else if (isViewingHistory) {
        displayBoard = boardStatesHistory[viewingHistoryIndex];
        // Индекс 0 = ход красных, 1 = ход черных, 2 = ход красных...
        displayTurn = (viewingHistoryIndex % 2 === 0) ? 'red' : 'black';
    } else {
        displayBoard = boardState;
        displayTurn = turn;
    }

    const isCheck = isKingUnderAttack(displayBoard, displayTurn);
    statusText.innerText = `Ход ${displayTurn === 'red' ? 'Маршала (Красные)' : 'Генерала (Черные)'}${isCheck ? ' — ШАХ!' : ''}`;
    if (isShowingPrevious) statusText.innerText = "ПРОСМОТР ПРОШЛОГО ХОДА 👀";
    else if (isViewingHistory) statusText.innerText = `ПРОСМОТР ХОДА ${viewingHistoryIndex} 👀 (Нажмите 'Вернуться' слева)`;
    statusText.className = displayTurn === 'red' ? 'red-turn' : 'black-turn';

    // Удаляем старые точки перемещения
    document.querySelectorAll('.move-dot').forEach(el => el.remove());

    // Обновляем или создаем элементы фигур
    const currentPieceIds = new Set();
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = displayBoard[r][c];
            if (pObj !== '.') {
                currentPieceIds.add(pObj.id);
                let el = pieceElementsMap.get(pObj.id);
                if (!el) {
                    el = document.createElement('div');
                    el.className = `piece`;
                    piecesLayer.appendChild(el);
                    pieceElementsMap.set(pObj.id, el);
                }
                el.className = `piece ${pObj.type === pObj.type.toUpperCase() ? 'red' : 'black'}`;
                if (selected && selected.r === r && selected.c === c && !isShowingPrevious && !isViewingHistory) el.classList.add('selected');
                else el.classList.remove('selected');
                el.innerText = (currentStyle === 'kanji') ? PIECE_TEXT[pObj.type] : (currentStyle === 'euro' ? PIECE_EURO[pObj.type] : PIECE_ICONS[pObj.type]);
                el.style.left = `${c * 60}px`; el.style.top = `${r * 60}px`;
                el.onclick = (e) => { e.stopPropagation(); handleSelect(r, c); };
            }
        }
    }

    // Удаляем фигуры, которых больше нет на доске
    for (let [id, el] of pieceElementsMap) {
        if (!currentPieceIds.has(id)) {
            el.remove();
            pieceElementsMap.delete(id);
        }
    }

    validMoves.forEach((m, index) => {
        // Не показываем возможные ходы во время просмотра истории
        if (isViewingHistory || isShowingPrevious) return;

        const d = document.createElement('div'); d.className = 'move-dot';
        d.style.left = `${m[1] * 60}px`; d.style.top = `${m[0] * 60}px`;
        d.style.animationDelay = `${index * 0.02}s`;
        d.onclick = () => { makeMove(selected.r, selected.c, m[0], m[1]); };
        piecesLayer.appendChild(d);
    });

    renderCaptured();
}

function renderCaptured() {
    const topZone = document.getElementById('captured-top');
    const bottomZone = document.getElementById('captured-bottom');
    topZone.innerHTML = ''; bottomZone.innerHTML = '';

    capturedRed.forEach(p => topZone.appendChild(createMiniPiece(p)));
    capturedBlack.forEach(p => bottomZone.appendChild(createMiniPiece(p)));
}

function createMiniPiece(p) {
    const el = document.createElement('div');
    el.className = `piece mini ${p === p.toUpperCase() ? 'red' : 'black'}`;
    el.innerText = (currentStyle === 'kanji') ? PIECE_TEXT[p] : (currentStyle === 'euro' ? PIECE_EURO[p] : PIECE_ICONS[p]);
    return el;
}

function handleSelect(r, c) {
    if (!isGameActive || isShowingPrevious || viewingHistoryIndex !== -1) return;
    const pObj = boardState[r][c];
    if (pObj === '.') { selected = null; validMoves = []; render(); return; } // No piece selected
    const isRed = pObj.type === pObj.type.toUpperCase();
    if (selected && validMoves.some(m => m[0] === r && m[1] === c)) { makeMove(selected.r, selected.c, r, c); return; }

    // Звук клика при выборе своей фигуры
    const canControl = (gameMode === 'hotseat') || (turn === playerColor);
    if (canControl && pObj !== '.' && ((turn === 'red' && isRed) || (turn === 'black' && !isRed))) {
        if (!selected || selected.r !== r || selected.c !== c) {
            playClickSound();
        }
        selected = { r, c }; validMoves = getLegalMoves(r, c);
    } else { selected = null; validMoves = []; }
    render();
}

function cloneBoard(sourceBoard) {
    let cloned = [];
    for (let r = 0; r < 10; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let cell = sourceBoard[r][c];
            if (cell !== '.') row.push({ type: cell.type, id: cell.id });
            else row.push('.');
        }
        cloned.push(row);
    }
    return cloned;
}

function makeMove(fr, fc, tr, tc) {
    const sourceObj = boardState[fr][fc];
    const targetObj = boardState[tr][tc];

    // Записываем ход в историю текстом
    recordMove(fr, fc, tr, tc, sourceObj.type, targetObj !== '.' ? targetObj.type : '.');

    if (targetObj !== '.') {
        playCaptureSound();
        triggerShake();
        const target = targetObj.type;
        if (target === target.toUpperCase()) capturedRed.push(target);
        else capturedBlack.push(target);
    } else {
        playMoveSound();
    }

    boardState[tr][tc] = boardState[fr][fc];
    boardState[fr][fc] = '.';

    boardStatesHistory.push(cloneBoard(boardState)); // Сохраняем состояние после хода

    selected = null; validMoves = []; turn = turn === 'red' ? 'black' : 'red';
    render();
    if (isGameOver()) {
        playGameOverSound();
        const check = isKingUnderAttack(boardState, turn);
        const winner = turn === 'red' ? 'ЧЁРНЫХ' : 'КРАСНЫХ';
        const msg = `${check ? "мат" : "пат"}`;
        showGameOver(msg, winner);
        return;
    }
    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 600);
}

function isGameOver() {
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = boardState[r][c];
            if (pObj === '.') continue;
            const p = pObj.type;
            if (p !== '.' && ((turn === 'red' && p === p.toUpperCase()) || (turn === 'black' && p === p.toLowerCase()))) {
                if (getLegalMoves(r, c).length > 0) return false;
            }
        }
    }
    return true;
}

function triggerShake() {
    boardEl.classList.remove('shake');
    void boardEl.offsetWidth; // Force reflow
    boardEl.classList.add('shake');
    setTimeout(() => boardEl.classList.remove('shake'), 300);
}

function showGameOver(msg, winner) {
    const title = document.getElementById('game-over-title');
    if (winner) {
        title.innerText = `ПОБЕДА ${winner}`;
        title.className = winner === 'КРАСНЫХ' ? 'winner-red' : 'winner-black';
    } else {
        title.className = '';
    }
    document.getElementById('game-over-msg').innerText = msg;
    document.getElementById('game-over-screen').style.display = 'flex';
    isGameActive = false;
}

function openSettings() {
    const radio = document.querySelector(`input[name="piece-style"][value="${currentStyle}"]`);
    if (radio) radio.checked = true;
    document.getElementById('settings-screen').classList.add('open');
}

function closeSettings() {
    document.getElementById('settings-screen').classList.remove('open');
}

function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('bg-layer').style.backgroundImage = `url('${e.target.result}')`;
        };
        reader.readAsDataURL(file);
    }
}

function clearBackground() {
    document.getElementById('bg-layer').style.backgroundImage = 'none';
    const uploadInput = document.getElementById('bg-upload');
    if (uploadInput) uploadInput.value = '';
}

function updateVolume(val) {
    globalVolume = val / 100;
    document.getElementById('volume-val').innerText = val + '%';
}

function playYooSound() {
    const audio = new Audio('https://www.myinstants.com/media/sounds/yoooo.mp3');
    audio.volume = globalVolume;
    audio.play();
}

function playMoveSound() {
    const audio = new Audio('https://cdn.freesound.org/previews/585/585598_462330-lq.mp3');
    audio.volume = globalVolume;
    audio.play();
}

function playCaptureSound() {
    const audio = new Audio('https://cdn.freesound.org/previews/340/340287_5769530-lq.mp3');
    audio.volume = globalVolume;
    audio.play();
}

function playClickSound() {
    const audio = new Audio('https://cdn.freesound.org/previews/477/477702_9961300-lq.mp3');
    audio.volume = globalVolume;
    audio.play();
}

function playGameOverSound() {
    const audio = new Audio('https://cdn.freesound.org/previews/636/636181_9034501-lq.mp3');
    audio.volume = globalVolume;
    audio.play();
}

function openHelp() {
    closeSettings();
    document.getElementById('help-screen').classList.add('open');
}

function closeHelp() {
    document.getElementById('help-screen').classList.remove('open');
}

updateHelpSymbols();
render();

// --- ЭФФЕКТ КЛИКА (CLICK SPARK) ---
// Реализация компонента ClickSpark для Vanilla JS
class ClickSpark {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.sparks = [];
        this.config = {
            sparkColor: '#ffffff',
            sparkSize: 10,
            sparkRadius: 15,
            sparkCount: 8,
            duration: 400,
            extraScale: 1
        };

        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '10000';
        document.body.appendChild(this.canvas);

        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousedown', (e) => this.addSpark(e.clientX, e.clientY));

        this.animate();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addSpark(x, y) {
        const colors = ['#212121', '#d32f2f', '#3498db']; // Чёрный, Красный, Синий
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.sparks.push({
            x, y,
            startTime: performance.now(),
            color: randomColor
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const now = performance.now();

        this.sparks = this.sparks.filter(spark => {
            const elapsed = now - spark.startTime;
            if (elapsed > this.config.duration) return false;

            const progress = elapsed / this.config.duration;
            const easedProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out

            this.ctx.save();
            this.ctx.translate(spark.x, spark.y);
            this.ctx.strokeStyle = spark.color;
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = 1 - progress;

            for (let i = 0; i < this.config.sparkCount; i++) {
                const angle = (i * 2 * Math.PI) / this.config.sparkCount;
                const r1 = (this.config.sparkRadius * easedProgress) * this.config.extraScale;
                const r2 = r1 + (this.config.sparkSize * (1 - progress));

                this.ctx.beginPath();
                this.ctx.moveTo(Math.cos(angle) * r1, Math.sin(angle) * r1);
                this.ctx.lineTo(Math.cos(angle) * r2, Math.sin(angle) * r2);
                this.ctx.stroke();
            }
            this.ctx.restore();
            return true;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Инициализация эффекта
new ClickSpark();