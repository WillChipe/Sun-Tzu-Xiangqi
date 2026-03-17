// ═══════════════════════════════════════════════════════════════
// 1. КОНСТАНТЫ ФИГУР
// ═══════════════════════════════════════════════════════════════

const PIECE_TEXT = {
    'K': '帥', 'A': '仕', 'B': '相', 'N': '傌', 'R': '俥', 'C': '炮', 'P': '兵',
    'k': '將', 'a': '士', 'b': '象', 'n': '馬', 'r': '車', 'c': '砲', 'p': '卒',
};

const PIECE_EURO = {
    'K': 'K', 'A': 'A', 'B': 'E', 'N': 'H', 'R': 'R', 'C': 'C', 'P': 'P',
    'k': 'k', 'a': 'a', 'b': 'e', 'n': 'h', 'r': 'r', 'c': 'c', 'p': 'p',
};

// Twemoji через jsDelivr CDN — одинаковый рендер на всех устройствах
const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/';
const PIECE_TWEMOJI = {
    'K': '1f451', 'A': '1f6e1', 'B': '1f418', 'N': '1f434', 'R': '1f3f0', 'C': '1f4a3', 'P': '1f482',
    'k': '1f451', 'a': '1f6e1', 'b': '1f418', 'n': '1f434', 'r': '1f3f0', 'c': '1f4a3', 'p': '1f482',
};

// Начальная расстановка (нижний регистр = чёрные, верхний = красные)
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
    ['R', 'N', 'B', 'A', 'K', 'A', 'B', 'N', 'R'],
];

// Нотация файлов (колонок) для записи ходов
const FILES_RED = ['9', '8', '7', '6', '5', '4', '3', '2', '1'];
const FILES_BLACK = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];


// ═══════════════════════════════════════════════════════════════
// 1b. ПЕРЕВОДЫ / TRANSLATIONS
// ═══════════════════════════════════════════════════════════════

const TRANSLATIONS = {
    ru: {
        resume_continue: 'Продолжить партию',
        resume_restart: 'Начать заново',
        select_mode: 'Выберите режим игры',
        mode_solo: 'Один игрок',
        mode_two: 'Два игрока',
        back: '← Назад',
        two_players: 'Два игрока',
        select_way: 'Выберите способ игры',
        local_screen: 'За одним экраном',
        network_game: 'Игра по сети',
        network_title: 'Игра по сети',
        net_ready: 'Готово',
        create_host: 'Создать игру (хост)',
        host_step1_label: '1. Скопируйте код и отправьте сопернику:',
        host_step2_label: '2. Вставьте код ответа от соперника:',
        answer_placeholder: 'Вставьте код ответа…',
        connect_btn: 'Подключить',
        guest_step1_label: 'Или вставьте код хоста и получите ответ:',
        host_offer_placeholder: 'Вставьте код хоста…',
        get_answer_btn: 'Получить ответ',
        guest_ready: '✅ Готово! Скопируйте код ответа и отправьте его хосту:',
        guest_note: 'После того как хост вставит этот код — игра начнётся автоматически.',
        ai_setup: 'Настройка ИИ',
        difficulty_label: 'Сложность:',
        your_side: 'Ваша сторона:',
        red_side: 'Красные',
        black_side: 'Черные',
        gameover_new: 'Новая партия',
        gameover_view: 'Посмотреть на поле',
        game_over_title: 'ИГРА ОКОНЧЕНА',
        victory_prefix: 'ПОБЕДА',
        winner_red: 'КРАСНЫХ',
        winner_black: 'ЧЁРНЫХ',
        winner_none: 'НИКОГО',
        msg_checkmate: 'Мат',
        msg_stalemate: 'Пат',
        msg_disconnect: 'Сетевое соединение разорвано!',
        confirm_title: 'Начать заново?',
        confirm_msg: 'Текущая партия будет сброшена.',
        confirm_yes: 'Да, начать',
        confirm_cancel: 'Отмена',
        history_title: 'История ходов',
        history_return: '▶ Вернуться к игре',
        prev_move: 'Прошлый ход',
        new_game_btn: 'Новая партия',
        chat_btn: 'Чат',
        game_title: 'Сянци',
        ai_thinking: 'Противник думает...',
        your_turn: 'Ваш ход',
        opponent_turn: 'Ход соперника',
        check: ' — ШАХ!',
        red_turn: 'Ход красных',
        black_turn: 'Ход черных',
        viewing_prev: 'ПРОСМОТР ПРОШЛОГО ХОДА 👀',
        viewing_move: 'ПРОСМОТР ХОДА',
        viewing_return_hint: "Нажмите «Вернуться» слева",
        game_finished: 'Партия окончена — начните новую!',
        role_hotseat: 'Режим: За одним экраном',
        role_playing: 'Вы играете за:',
        role_red: '🔴 Красные',
        role_black: '⚫ Черные',
        diff_1: '1 - Новичок',
        diff_2: '2 - Любитель',
        diff_3: '3 - Средний',
        diff_4: '4 - Продвинутый',
        diff_5: '5 - Эксперт',
        settings_title: 'Настройки',
        lang_label: 'Язык / Language:',
        bg_label: 'Свой фон (PNG, JPG, GIF):',
        bg_remove: 'Удалить',
        volume_label: 'Громкость:',
        style_label: 'Стиль фигур:',
        style_icons: 'Эмодзи 👑',
        style_kanji: 'Иероглифы 帥',
        style_euro: 'Буквы K',
        animated_bg: 'Анимированный фон',
        animated_bg_hint: 'Отключите, если игра подтормаживает',
        bg_theme_label: 'Тема фона:',
        theme_blue: '🔵 Синий',
        theme_purple: '🟣 Пурпурный',
        theme_green: '🟢 Зелёный',
        theme_red: '🔴 Красный',
        theme_black: '⚫ Чёрный',
        theme_gold: '🟡 Золотой',
        help_title: 'Правила Сянци',
        help_goal_title: 'Цель:',
        help_goal_text: 'Поставить мат генералу',
        help_goal_text2: 'противника.',
        help_checkmate: '<strong>Мат</strong> — это ситуация, когда генерал находится под атакой (шах) и нет ни одного легального хода, чтобы её избежать. Также победой считается пат',
        help_stalemate: '<strong>Пат</strong> — ситуация, когда у игрока нет ни одного легального хода, даже если генерал не находится под шахом.',
        help_flying_general: 'Генералы (帥/將) <span class="help-sym" data-p="K">👑</span> не могут "видеть" друг друга на одной линии. Между ними должна быть хотя бы одна любая фигура.',
        help_king_title: 'Генерал (帥/將) <span class="help-sym" data-p="K">👑</span>:',
        help_king_text: 'Ходит на 1 клетку по вертикали/горизонтали внутри своего дворца (зона 3х3). Два генерала не могут "смотреть" друг на друга по открытой вертикали без других фигур между ними.',
        help_advisor_title: 'Советник (仕/士) <span class="help-sym" data-p="A">🛡️</span>:',
        help_advisor_text: 'Ходит на 1 клетку по диагонали, тоже не может покидать дворец.',
        help_elephant_title: 'Слон (相/象) <span class="help-sym" data-p="B">🐘</span>:',
        help_elephant_text: 'Ходит ровно на 2 клетки по диагонали. Если промежуточная точка занята (через 1 шаг), слон блокирован. Слоны не могут переходить через реку (центр доски).',
        help_horse_title: 'Конь (傌/馬) <span class="help-sym" data-p="N">🐴</span>:',
        help_horse_text: 'Ходит на 1 клетку по прямой и 1 по диагонали. В отличие от обычных шахмат, если соседняя клетка по прямому направлению занята, прыжок блокируется.',
        help_rook_title: 'Ладья (俥/車) <span class="help-sym" data-p="R">🏰</span>:',
        help_rook_text: 'Ходит на любое число пустых клеток по вертикали или горизонтали.',
        help_cannon_title: 'Пушка (炮/砲) <span class="help-sym" data-p="C">💣</span>:',
        help_cannon_text: 'Ходит как ладья, но берёт фигуру противника только перепрыгивая ровно через одну любую другую фигуру (свою или чужую, образующую "экран").',
        help_pawn_title: 'Пешка (兵/卒) <span class="help-sym" data-p="P">💂</span>:',
        help_pawn_text: 'До перехода через реку ходит только на 1 клетку вперёд. После перехода реки может ходить и бить на 1 клетку вперёд, влево или вправо. Пешка не может ходить назад.',
        help_close: 'Понятно, закрыть',
        chat_placeholder: 'Напишите сообщение…',
        chat_welcome: 'Напишите сообщение…',
        chat_no_connection: '⚠️ Нет соединения — сообщение не отправлено',
        chat_opponent_disconnected: '⚠️ Соперник отключился',
        chat_game_started: '🌐 Игра началась!',
        chat_you_red: 'Вы играете за Красных (ходите первыми)',
        chat_you_black: 'Вы играете за Чёрных (ход у красных)',
        net_creating: 'Создаём соединение…',
        net_send_to_opponent: 'Передайте код сопернику',
        net_creating_answer: 'Создаём ответ…',
        net_send_to_host: 'Передайте код ответа хосту',
        net_establishing: '⏳ Установка соединения…',
        net_wrong_answer: '❌ Неверный код ответа',
        net_wrong_offer: '❌ Неверный код оффера',
        net_copied: '✅ Скопировано!',
        net_p2p_failed: '❌ Не удалось установить P2P соединение',
        net_wait: 'Ожидайте...',
        net_connected: '✅ Соединение установлено!',
        chat_disabled_title: 'Чат доступен только в сетевой игре',
        chat_network_title: 'Чат с соперником',
        resume_mode_hotseat: 'Два игрока',
        resume_mode_bot: 'Против ИИ (сложность %d)',
        resume_moves_1: 'ход',
        resume_moves_few: 'хода',
        resume_moves_many: 'ходов',
    },
    en: {
        resume_continue: 'Continue game',
        resume_restart: 'Start over',
        select_mode: 'Select game mode',
        mode_solo: 'Single player',
        mode_two: 'Two players',
        back: '← Back',
        two_players: 'Two players',
        select_way: 'Select play mode',
        local_screen: 'Same screen',
        network_game: 'Online game',
        network_title: 'Online game',
        net_ready: 'Ready',
        create_host: 'Create game (host)',
        host_step1_label: '1. Copy the code and send it to your opponent:',
        host_step2_label: '2. Paste the answer code from your opponent:',
        answer_placeholder: 'Paste answer code…',
        connect_btn: 'Connect',
        guest_step1_label: "Or paste the host's code to get your answer:",
        host_offer_placeholder: 'Paste host code…',
        get_answer_btn: 'Get answer',
        guest_ready: '✅ Done! Copy the answer code and send it to the host:',
        guest_note: 'Once the host pastes this code — the game will start automatically.',
        ai_setup: 'AI Setup',
        difficulty_label: 'Difficulty:',
        your_side: 'Your side:',
        red_side: 'Red',
        black_side: 'Black',
        gameover_new: 'New game',
        gameover_view: 'View the board',
        game_over_title: 'GAME OVER',
        victory_prefix: 'VICTORY FOR',
        winner_red: 'RED',
        winner_black: 'BLACK',
        winner_none: 'NOBODY',
        msg_checkmate: 'Checkmate',
        msg_stalemate: 'Stalemate',
        msg_disconnect: 'Network connection lost!',
        confirm_title: 'Start over?',
        confirm_msg: 'The current game will be reset.',
        confirm_yes: 'Yes, start',
        confirm_cancel: 'Cancel',
        history_title: 'Move history',
        history_return: '▶ Back to game',
        prev_move: 'Last move',
        new_game_btn: 'New game',
        chat_btn: 'Chat',
        game_title: 'Xiangqi',
        ai_thinking: 'Opponent is thinking...',
        your_turn: 'Your turn',
        opponent_turn: "Opponent's turn",
        check: ' — CHECK!',
        red_turn: "Red's turn",
        black_turn: "Black's turn",
        viewing_prev: 'VIEWING LAST MOVE 👀',
        viewing_move: 'VIEWING MOVE',
        viewing_return_hint: "Click «Back» on the left",
        game_finished: 'Game over — start a new one!',
        role_hotseat: 'Mode: Same screen',
        role_playing: 'You play as:',
        role_red: '🔴 Red',
        role_black: '⚫ Black',
        diff_1: '1 - Beginner',
        diff_2: '2 - Amateur',
        diff_3: '3 - Intermediate',
        diff_4: '4 - Advanced',
        diff_5: '5 - Expert',
        settings_title: 'Settings',
        lang_label: 'Язык / Language:',
        bg_label: 'Custom background (PNG, JPG, GIF):',
        bg_remove: 'Remove',
        volume_label: 'Volume:',
        style_label: 'Piece style:',
        style_icons: 'Emoji 👑',
        style_kanji: 'Kanji 帥',
        style_euro: 'Letters K',
        animated_bg: 'Animated background',
        animated_bg_hint: 'Disable if the game lags',
        bg_theme_label: 'Background theme:',
        theme_blue: '🔵 Blue',
        theme_purple: '🟣 Purple',
        theme_green: '🟢 Green',
        theme_red: '🔴 Red',
        theme_black: '⚫ Black',
        theme_gold: '🟡 Gold',
        help_title: 'Xiangqi Rules',
        help_goal_title: 'Goal:',
        help_goal_text: "Checkmate the opponent's general",
        help_goal_text2: '',
        help_checkmate: '<strong>Checkmate</strong> — the general is under attack (check) and there are no legal moves to escape. Stalemate is also a win.',
        help_stalemate: '<strong>Stalemate</strong> — the player has no legal moves, even if the general is not in check.',
        help_flying_general: 'Generals (帥/將) <span class="help-sym" data-p="K">👑</span> cannot "see" each other on the same file. There must be at least one piece between them.',
        help_king_title: 'General (帥/將) <span class="help-sym" data-p="K">👑</span>:',
        help_king_text: 'Moves one point orthogonally within the palace (3×3 zone). Two generals may not face each other on an open file without a piece between them.',
        help_advisor_title: 'Advisor (仕/士) <span class="help-sym" data-p="A">🛡️</span>:',
        help_advisor_text: 'Moves one point diagonally, confined to the palace.',
        help_elephant_title: 'Elephant (相/象) <span class="help-sym" data-p="B">🐘</span>:',
        help_elephant_text: 'Moves exactly two points diagonally. Blocked if the intervening point is occupied. Cannot cross the river.',
        help_horse_title: 'Horse (傌/馬) <span class="help-sym" data-p="N">🐴</span>:',
        help_horse_text: 'Moves one point orthogonally then one diagonally. Blocked if the orthogonal point is occupied.',
        help_rook_title: 'Chariot (俥/車) <span class="help-sym" data-p="R">🏰</span>:',
        help_rook_text: 'Moves any number of empty points orthogonally.',
        help_cannon_title: 'Cannon (炮/砲) <span class="help-sym" data-p="C">💣</span>:',
        help_cannon_text: 'Moves like the chariot, but captures by jumping over exactly one intervening piece (the "screen").',
        help_pawn_title: 'Soldier (兵/卒) <span class="help-sym" data-p="P">💂</span>:',
        help_pawn_text: 'Before crossing the river, moves one point forward only. After crossing, may also move one point sideways. Cannot move backward.',
        help_close: 'Got it, close',
        chat_placeholder: 'Write a message…',
        chat_welcome: 'Write a message…',
        chat_no_connection: '⚠️ No connection — message not sent',
        chat_opponent_disconnected: '⚠️ Opponent disconnected',
        chat_game_started: '🌐 Game started!',
        chat_you_red: 'You play as Red (you go first)',
        chat_you_black: 'You play as Black (Red moves first)',
        net_creating: 'Creating connection…',
        net_send_to_opponent: 'Send the code to your opponent',
        net_creating_answer: 'Creating answer…',
        net_send_to_host: 'Send the answer code to the host',
        net_establishing: '⏳ Establishing connection…',
        net_wrong_answer: '❌ Invalid answer code',
        net_wrong_offer: '❌ Invalid host code',
        net_copied: '✅ Copied!',
        net_p2p_failed: '❌ Could not establish P2P connection',
        net_wait: 'Please wait...',
        net_connected: '✅ Connection established!',
        chat_disabled_title: 'Chat is only available in online games',
        chat_network_title: 'Chat with opponent',
        resume_mode_hotseat: 'Two players',
        resume_mode_bot: 'vs AI (difficulty %d)',
        resume_moves_1: 'move',
        resume_moves_few: 'moves',
        resume_moves_many: 'moves',
    }
};

let currentLang = 'ru';

function t(key) {
    const lang = TRANSLATIONS[currentLang] || TRANSLATIONS['ru'];
    return (lang[key] !== undefined) ? lang[key] : (TRANSLATIONS['ru'][key] || key);
}

function setLanguage(lang, save = true) {
    currentLang = lang;
    // Apply static data-i18n translations (innerHTML to support HTML in help text)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = t(key);
        if (val !== undefined) el.innerHTML = val;
    });
    // Apply placeholder translations
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = t(key);
        if (val !== undefined) el.placeholder = val;
    });
    // Highlight active language button
    const btnRu = document.getElementById('lang-btn-ru');
    const btnEn = document.getElementById('lang-btn-en');
    if (btnRu) btnRu.style.transform = lang === 'ru' ? 'scale(1.25)' : 'scale(1)';
    if (btnEn) btnEn.style.transform = lang === 'en' ? 'scale(1.25)' : 'scale(1)';
    // Re-apply piece symbols inside help text (innerHTML may have recreated spans)
    updateHelpSymbols();
    // Refresh dynamic UI pieces
    updateDiffLabel(document.getElementById('setup-diff-slider') ? document.getElementById('setup-diff-slider').value : difficulty);
    if (isGameActive || isBoardVisible) render();
    updateHistoryUI();
    if (save) saveSettings();
}


// ═══════════════════════════════════════════════════════════════
// 2. СОСТОЯНИЕ ИГРЫ
// ═══════════════════════════════════════════════════════════════

let boardState = JSON.parse(JSON.stringify(initialBoard));
let capturedRed = [];   // красные фигуры, съеденные чёрными
let capturedBlack = [];   // чёрные фигуры, съеденные красными
let selected = null; // { r, c } выбранной фигуры
let turn = 'red';
let validMoves = [];
let playerColor = 'red';
let currentStyle = 'icons';
let isGameActive = false;
let isBoardVisible = false; // true после dismissGameOver
let difficulty = 1;
let gameMode = 'vs-bot';
let globalVolume = 1.0;

let pieceElementsMap = new Map(); // id → DOM-элемент
let pieceIdCounter = 0;
let moveHistoryText = [];
let boardStatesHistory = []; // снимки доски (индекс 0 — начало игры)
let isShowingPrevious = false;
let viewingHistoryIndex = -1; // -1 = текущий ход

let currentBgTheme = 0;
let balatroInstance = null;


// ═══════════════════════════════════════════════════════════════
// 3. DOM-ССЫЛКИ
// ═══════════════════════════════════════════════════════════════

const piecesLayer = document.getElementById('pieces-layer');
const statusText = document.getElementById('status');
const boardEl = document.getElementById('board');


// ═══════════════════════════════════════════════════════════════
// 4. ХРАНИЛИЩЕ (localStorage)
// ═══════════════════════════════════════════════════════════════

const SETTINGS_KEY = 'xiangqi_settings';
const GAME_KEY = 'xiangqi_game';

function saveSettings() {
    const settings = {
        bgTheme: currentBgTheme,
        balatroEnabled: balatroInstance ? balatroInstance.running : true,
        pieceStyle: currentStyle,
        volume: Math.round(globalVolume * 100),
        lang: currentLang,
    };
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { }
}

function loadSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function saveGameState() {
    if (!isGameActive) return;
    const state = {
        boardState, capturedRed, capturedBlack,
        turn, playerColor, gameMode, difficulty,
        moveHistoryText, boardStatesHistory, pieceIdCounter,
    };
    try { localStorage.setItem(GAME_KEY, JSON.stringify(state)); } catch (e) { }
}

function loadGameState() {
    try {
        const raw = localStorage.getItem(GAME_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

function clearGameState() {
    try { localStorage.removeItem(GAME_KEY); } catch (e) { }
}


// ═══════════════════════════════════════════════════════════════
// 5. ФИГУРЫ — ОТОБРАЖЕНИЕ
// ═══════════════════════════════════════════════════════════════

function setPieceContent(el, pieceType) {
    if (currentStyle === 'kanji') {
        el.innerText = PIECE_TEXT[pieceType];
        el.style.backgroundImage = '';
        el.style.filter = '';
        el.style.fontSize = '';
    } else if (currentStyle === 'euro') {
        el.innerText = PIECE_EURO[pieceType];
        el.style.backgroundImage = '';
        el.style.filter = '';
        el.style.fontSize = '';
    } else {
        // icons — Twemoji через <img> внутри фишки
        el.innerHTML = `<img src="${TWEMOJI_BASE}${PIECE_TWEMOJI[pieceType]}.svg"
            style="width:65%;height:65%;pointer-events:none;
            filter: drop-shadow(1px 1px 0 rgba(0,0,0,0.9))
                    drop-shadow(-1px -1px 0 rgba(0,0,0,0.9))
                    drop-shadow(1px -1px 0 rgba(0,0,0,0.9))
                    drop-shadow(-1px 1px 0 rgba(0,0,0,0.9));">`;
        el.style.backgroundImage = '';
        el.style.backgroundSize = '';
        el.style.backgroundRepeat = '';
        el.style.backgroundPosition = '';
        el.style.filter = '';
    }
}

function updateHelpSymbols() {
    document.querySelectorAll('.help-sym').forEach(el => {
        const p = el.getAttribute('data-p');
        if (currentStyle === 'kanji') {
            el.innerHTML = '';
            el.style.display = 'none';
        } else if (currentStyle === 'euro') {
            el.innerHTML = PIECE_EURO[p];
            el.style.display = 'inline';
        } else {
            el.innerHTML = `<img src="${TWEMOJI_BASE}${PIECE_TWEMOJI[p]}.svg"
                style="width:1.2em;height:1.2em;vertical-align:middle;">`;
            el.style.display = 'inline';
        }
    });
}

function changeStyle(newStyle) {
    currentStyle = newStyle;
    updateHelpSymbols();
    updateHistoryUI();
    render();
    saveSettings();
}


// ═══════════════════════════════════════════════════════════════
// 6. ПРАВИЛА — ЛОГИКА
// ═══════════════════════════════════════════════════════════════

function inBounds(r, c) {
    return r >= 0 && r < 10 && c >= 0 && c < 9;
}

function cloneBoard(src) {
    return src.map(row => row.map(cell =>
        cell === '.' ? '.' : { type: cell.type, id: cell.id }
    ));
}

function isFlyingGeneral(board) {
    let rK = -1, cK = -1, rk = -1, ck = -1;
    for (let r = 0; r < 10; r++) {
        for (let c = 3; c <= 5; c++) {
            const cell = board[r][c];
            if (cell === '.') continue;
            if (cell.type === 'K') { rK = r; cK = c; }
            if (cell.type === 'k') { rk = r; ck = c; }
        }
    }
    if (cK === -1 || cK !== ck) return false;
    for (let i = Math.min(rK, rk) + 1; i < Math.max(rK, rk); i++) {
        if (board[i][cK] !== '.') return false;
    }
    return true;
}

function findKing(board, color) {
    const type = color === 'red' ? 'K' : 'k';
    for (let r = 0; r < 10; r++)
        for (let c = 3; c <= 5; c++)
            if (board[r][c] !== '.' && board[r][c].type === type) return { r, c };
    return null;
}

function isKingUnderAttack(board, color) {
    const kingPos = findKing(board, color);
    if (!kingPos) return false;
    const enemy = color === 'red' ? 'black' : 'red';
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const cell = board[r][c];
            if (cell === '.') continue;
            const p = cell.type;
            if ((p === p.toUpperCase() ? 'red' : 'black') === enemy) {
                if (generatePseudoMoves(r, c, board).some(m => m[0] === kingPos.r && m[1] === kingPos.c))
                    return true;
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
    const type = piece.toUpperCase();
    const isRed = piece === piece.toUpperCase();
    const isEnemy = (nr, nc) => {
        const t = board[nr][nc];
        if (t === '.') return false;
        return isRed ? t.type === t.type.toLowerCase() : t.type === t.type.toUpperCase();
    };

    // Ладья и Пушка — движение по прямым
    if (type === 'R' || type === 'C') {
        for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            let jumped = false;
            for (let i = 1; i < 10; i++) {
                const nr = r + dr * i, nc = c + dc * i;
                if (!inBounds(nr, nc)) break;
                const t = board[nr][nc];
                if (!jumped) {
                    if (t === '.') { moves.push([nr, nc]); continue; }
                    if (type === 'R') { if (isEnemy(nr, nc)) moves.push([nr, nc]); break; }
                    jumped = true;
                } else {
                    if (t !== '.') { if (isEnemy(nr, nc)) moves.push([nr, nc]); break; }
                }
            }
        }
    }

    // Конь
    if (type === 'N') {
        const jumps = [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]];
        const blocks = [[-1, 0], [-1, 0], [1, 0], [1, 0], [0, -1], [0, -1], [0, 1], [0, 1]];
        jumps.forEach(([dr, dc], i) => {
            const nr = r + dr, nc = c + dc;
            const br = r + blocks[i][0], bc = c + blocks[i][1];
            if (inBounds(nr, nc) && board[br][bc] === '.' && (board[nr][nc] === '.' || isEnemy(nr, nc)))
                moves.push([nr, nc]);
        });
    }

    // Слон (не пересекает реку)
    if (type === 'B') {
        for (const [dr, dc] of [[-2, -2], [-2, 2], [2, -2], [2, 2]]) {
            const nr = r + dr, nc = c + dc;
            const er = r + dr / 2, ec = c + dc / 2;
            if (inBounds(nr, nc) && board[er][ec] === '.' &&
                (isRed ? nr >= 5 : nr <= 4) &&
                (board[nr][nc] === '.' || isEnemy(nr, nc)))
                moves.push([nr, nc]);
        }
    }

    // Советник и Генерал — дворец
    if (type === 'A' || type === 'K') {
        const dirs = type === 'A'
            ? [[1, 1], [1, -1], [-1, 1], [-1, -1]]
            : [[1, 0], [-1, 0], [0, 1], [0, -1]];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (inBounds(nr, nc) && nc >= 3 && nc <= 5 &&
                (isRed ? nr >= 7 : nr <= 2) &&
                (board[nr][nc] === '.' || isEnemy(nr, nc)))
                moves.push([nr, nc]);
        }
    }

    // Пешка
    if (type === 'P') {
        const dir = isRed ? -1 : 1;
        if (inBounds(r + dir, c) && (board[r + dir][c] === '.' || isEnemy(r + dir, c)))
            moves.push([r + dir, c]);
        if (isRed ? r <= 4 : r >= 5) {
            for (const dc of [-1, 1]) {
                if (inBounds(r, c + dc) && (board[r][c + dc] === '.' || isEnemy(r, c + dc)))
                    moves.push([r, c + dc]);
            }
        }
    }

    return moves;
}

function getLegalMoves(r, c, board = boardState) {
    const pieceObj = board[r][c];
    if (pieceObj === '.') return [];
    const color = pieceObj.type === pieceObj.type.toUpperCase() ? 'red' : 'black';
    return generatePseudoMoves(r, c, board).filter(([tr, tc]) => {
        const temp = cloneBoard(board);
        temp[tr][tc] = temp[r][c];
        temp[r][c] = '.';
        return !isFlyingGeneral(temp) && !isKingUnderAttack(temp, color);
    });
}

function isGameOver() {
    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const cell = boardState[r][c];
            if (cell === '.') continue;
            const p = cell.type;
            const isCurrentTurn = turn === 'red' ? p === p.toUpperCase() : p === p.toLowerCase();
            if (isCurrentTurn && getLegalMoves(r, c).length > 0) return false;
        }
    }
    return true;
}


// ═══════════════════════════════════════════════════════════════
// 7. ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ (Embedded Worker)
// ═══════════════════════════════════════════════════════════════

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
    worker.postMessage({ boardState, difficulty, turn });

    worker.onmessage = function (e) {
        if (thinkingEl) thinkingEl.style.display = 'none';
        const { bestMove } = e.data;
        if (bestMove) makeMove(bestMove.fr, bestMove.fc, bestMove.tr, bestMove.tc);
        worker.terminate();
    };

    worker.onerror = function (err) {
        console.error('AI Worker error:', err);
        if (thinkingEl) thinkingEl.style.display = 'none';
        worker.terminate();
    };
}


// ═══════════════════════════════════════════════════════════════
// 8. ИСТОРИЯ ХОДОВ
// ═══════════════════════════════════════════════════════════════

function recordMove(fr, fc, tr, tc, pieceType, targetType) {
    const isRed = pieceType === pieceType.toUpperCase();
    const fromCol = isRed ? FILES_RED[fc] : FILES_BLACK[fc];
    const toCol = isRed ? FILES_RED[tc] : FILES_BLACK[tc];

    let moveDir;
    if (fr === tr) {
        moveDir = `=${toCol}`;
    } else if (isRed) {
        moveDir = tr < fr ? `+${fr - tr}` : `-${fr - tr}`;
    } else {
        moveDir = tr > fr ? `+${tr - fr}` : `-${fr - tr}`;
    }

    moveHistoryText.push({
        type: pieceType,
        color: isRed ? 'red' : 'black',
        fromCol,
        moveDir,
        isCapture: targetType !== '.',
    });
    updateHistoryUI();
}

function getMoveString(move) {
    let pieceName;
    if (currentStyle === 'kanji') {
        pieceName = PIECE_TEXT[move.type];
    } else if (currentStyle === 'euro') {
        pieceName = PIECE_EURO[move.type];
    } else {
        pieceName = `<img src="${TWEMOJI_BASE}${PIECE_TWEMOJI[move.type]}.svg" style="width:1em;height:1em;vertical-align:middle;">`;
    }
    return `${pieceName} ${move.fromCol}${move.moveDir}${move.isCapture ? ' x' : ''}`;
}

function updatePrevMoveBtn() {
    const btn = document.getElementById('prev-move-btn');
    if (!btn) return;
    const canShow = boardStatesHistory.length >= 2;
    btn.disabled = !canShow;
    btn.classList.toggle('disabled-btn', !canShow);
}

function updateHistoryUI() {
    updatePrevMoveBtn();

    const list = document.getElementById('history-list');
    const footer = document.getElementById('history-footer');
    if (!list || !footer) return;

    list.innerHTML = '';
    footer.innerHTML = '';

    // Кнопка «Вернуться к игре» в закреплённом футере
    if (viewingHistoryIndex !== -1) {
        const backBtn = document.createElement('div');
        backBtn.className = 'history-item clickable active-history';
        backBtn.style.marginTop = '10px';
        backBtn.innerHTML = `<span><span style="color: #e67e22; font-weight: bold;">${t('history_return')}</span></span>`;
        backBtn.onclick = () => { viewingHistoryIndex = -1; render(); updateHistoryUI(); };
        footer.appendChild(backBtn);
    }

    for (let i = 0; i < moveHistoryText.length; i += 2) {
        const item = document.createElement('div');
        item.className = 'history-item';
        const turnNum = Math.floor(i / 2) + 1;

        const redIdx = i + 1;
        const isRedActive = viewingHistoryIndex === redIdx;
        const p1 = `<span class="red clickable ${isRedActive ? 'active-history' : ''}" onclick="viewHistory(${redIdx})">${getMoveString(moveHistoryText[i])}</span>`;

        let p2 = '';
        if (moveHistoryText[i + 1]) {
            const blackIdx = i + 2;
            const isBlackActive = viewingHistoryIndex === blackIdx;
            p2 = `<span class="black clickable ${isBlackActive ? 'active-history' : ''}" onclick="viewHistory(${blackIdx})">${getMoveString(moveHistoryText[i + 1])}</span>`;
        }

        item.innerHTML = `<span>${turnNum}. ${p1}</span> <span>${p2}</span>`;
        list.appendChild(item);
    }

    if (viewingHistoryIndex === -1) list.scrollTop = list.scrollHeight;
}

function viewHistory(stateIndex) {
    if (stateIndex >= 0 && stateIndex < boardStatesHistory.length) {
        viewingHistoryIndex = stateIndex;
        render();
        updateHistoryUI();
    }
}

function showPreviousMove() {
    if (boardStatesHistory.length < 2) return;
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


// ═══════════════════════════════════════════════════════════════
// 9. ОТРИСОВКА
// ═══════════════════════════════════════════════════════════════

function getCellSize() {
    // boardEl.clientWidth = cell-size * 8; надёжнее чем getComputedStyle с clamp()
    return boardEl.clientWidth / 8;
}

function render() {
    if (!isGameActive && !isBoardVisible) return;

    const isViewingHistory = viewingHistoryIndex !== -1;

    let displayBoard, displayTurn;
    if (isShowingPrevious && boardStatesHistory.length > 1) {
        displayBoard = boardStatesHistory[boardStatesHistory.length - 2];
        displayTurn = turn === 'red' ? 'black' : 'red';
    } else if (isViewingHistory) {
        displayBoard = boardStatesHistory[viewingHistoryIndex];
        displayTurn = viewingHistoryIndex % 2 === 0 ? 'red' : 'black';
    } else {
        displayBoard = boardState;
        displayTurn = turn;
    }

    // Статус
    const isCheck = isKingUnderAttack(displayBoard, displayTurn);
    if (isShowingPrevious) {
        statusText.innerText = t('viewing_prev');
    } else if (isViewingHistory) {
        statusText.innerText = `${t('viewing_move')} ${viewingHistoryIndex} 👀 (${t('viewing_return_hint')})`;
    } else {
        if (gameMode !== 'hotseat') {
            const whoseTurn = displayTurn === playerColor ? t('your_turn') : t('opponent_turn');
            statusText.innerText = `${whoseTurn}${isCheck ? t('check') : ''}`;
        } else {
            const turnName = displayTurn === 'red' ? t('red_turn') : t('black_turn');
            statusText.innerText = `${turnName}${isCheck ? t('check') : ''}`;
        }
    }
    statusText.className = displayTurn === 'red' ? 'red-turn' : 'black-turn';

    const roleEl = document.getElementById('player-role-indicator');
    if (roleEl && !isShowingPrevious && !isViewingHistory) {
        if (gameMode === 'hotseat') {
            roleEl.innerText = t('role_hotseat');
            roleEl.style.display = 'block';
        } else if (gameMode === 'vs-bot' || gameMode === 'network') {
            const colorName = playerColor === 'red' ? t('role_red') : t('role_black');
            roleEl.innerText = `${t('role_playing')} ${colorName}`;
            roleEl.style.display = 'block';
        } else {
            roleEl.style.display = 'none';
        }
    } else if (roleEl) {
        roleEl.style.display = 'none';
    }

    // Убираем старые точки ходов
    document.querySelectorAll('.move-dot').forEach(el => el.remove());

    // Синхронизируем DOM фигур
    const cellSize = getCellSize();
    const visibleIds = new Set();

    for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 9; c++) {
            const pObj = displayBoard[r][c];
            if (pObj === '.') continue;

            visibleIds.add(pObj.id);
            let el = pieceElementsMap.get(pObj.id);
            if (!el) {
                el = document.createElement('div');
                piecesLayer.appendChild(el);
                pieceElementsMap.set(pObj.id, el);
            }

            el.className = `piece ${pObj.type === pObj.type.toUpperCase() ? 'red' : 'black'}`;
            if (selected && selected.r === r && selected.c === c && !isShowingPrevious && !isViewingHistory)
                el.classList.add('selected');

            el.innerText = '';
            el.style.backgroundImage = '';
            setPieceContent(el, pObj.type);
            el.style.left = `${c * cellSize}px`;
            el.style.top = `${r * cellSize}px`;
            el.onclick = (e) => { e.stopPropagation(); handleSelect(r, c); };
        }
    }

    // Удаляем фигуры, которых нет на доске
    for (const [id, el] of pieceElementsMap) {
        if (!visibleIds.has(id)) { el.remove(); pieceElementsMap.delete(id); }
    }

    // Точки доступных ходов
    if (!isViewingHistory && !isShowingPrevious) {
        validMoves.forEach((m, i) => {
            const d = document.createElement('div');
            d.className = 'move-dot';
            d.style.left = `${m[1] * cellSize}px`;
            d.style.top = `${m[0] * cellSize}px`;
            d.style.animationDelay = `${i * 0.02}s`;
            d.onclick = () => makeMove(selected.r, selected.c, m[0], m[1]);
            piecesLayer.appendChild(d);
        });
    }

    renderCaptured(displayBoard);
}

function renderCaptured(displayBoard) {
    const topZone = document.getElementById('captured-top');
    const bottomZone = document.getElementById('captured-bottom');
    topZone.innerHTML = '';
    bottomZone.innerHTML = '';

    if (isShowingPrevious || viewingHistoryIndex !== -1) {
        const captured = getCapturedFromBoard(displayBoard);
        captured.red.forEach(p => topZone.appendChild(createMiniPiece(p)));
        captured.black.forEach(p => bottomZone.appendChild(createMiniPiece(p)));
    } else {
        capturedRed.forEach(p => topZone.appendChild(createMiniPiece(p)));
        capturedBlack.forEach(p => bottomZone.appendChild(createMiniPiece(p)));
    }
}

// Вычисляет захваченные фигуры по снимку (для просмотра истории)
function getCapturedFromBoard(board) {
    const onBoard = {}, initial = {};

    for (let r = 0; r < 10; r++)
        for (let c = 0; c < 9; c++) {
            const cell = board[r][c];
            if (cell !== '.') onBoard[cell.type] = (onBoard[cell.type] || 0) + 1;
        }

    for (let r = 0; r < 10; r++)
        for (let c = 0; c < 9; c++) {
            const cell = initialBoard[r][c];
            if (cell !== '.') initial[cell] = (initial[cell] || 0) + 1;
        }

    const red = [], black = [];
    for (const type in initial) {
        const missing = (initial[type] || 0) - (onBoard[type] || 0);
        for (let i = 0; i < missing; i++)
            (type === type.toUpperCase() ? red : black).push(type);
    }
    return { red, black };
}

function createMiniPiece(p) {
    const el = document.createElement('div');
    el.className = `piece mini ${p === p.toUpperCase() ? 'red' : 'black'}`;
    setPieceContent(el, p);
    return el;
}

function triggerShake() {
    boardEl.classList.remove('shake');
    void boardEl.offsetWidth; // force reflow
    boardEl.classList.add('shake');
    setTimeout(() => boardEl.classList.remove('shake'), 300);
}


// ═══════════════════════════════════════════════════════════════
// 10. ВВОД — УПРАВЛЕНИЕ
// ═══════════════════════════════════════════════════════════════

function handleSelect(r, c) {
    if (!isGameActive || isShowingPrevious || viewingHistoryIndex !== -1) return;
    if (gameMode !== 'hotseat' && turn !== playerColor) return;

    const pObj = boardState[r][c];

    // Клик на пустую клетку — сбросить выбор
    if (pObj === '.') { selected = null; validMoves = []; render(); return; }

    // Клик на клетку из допустимых ходов — сделать ход
    if (selected && validMoves.some(m => m[0] === r && m[1] === c)) {
        makeMove(selected.r, selected.c, r, c);
        return;
    }

    // Выбор своей фигуры
    const isRed = pObj.type === pObj.type.toUpperCase();
    const canMove = gameMode === 'hotseat' || turn === playerColor;
    const ownPiece = (turn === 'red' && isRed) || (turn === 'black' && !isRed);

    if (canMove && ownPiece) {
        if (!selected || selected.r !== r || selected.c !== c) playClickSound();
        selected = { r, c };
        validMoves = getLegalMoves(r, c);
    } else {
        selected = null;
        validMoves = [];
    }
    render();
}

function makeMove(fr, fc, tr, tc, isReceivedMove = false) {
    const srcObj = boardState[fr][fc];
    const tgtObj = boardState[tr][tc];

    if (tgtObj !== '.') {
        playCaptureSound();
        triggerShake();
        (tgtObj.type === tgtObj.type.toUpperCase() ? capturedRed : capturedBlack).push(tgtObj.type);
    } else {
        playMoveSound();
    }

    boardState[tr][tc] = boardState[fr][fc];
    boardState[fr][fc] = '.';
    boardStatesHistory.push(cloneBoard(boardState));

    recordMove(fr, fc, tr, tc, srcObj.type, tgtObj !== '.' ? tgtObj.type : '.');

    selected = null;
    validMoves = [];
    turn = turn === 'red' ? 'black' : 'red';
    saveGameState();
    render();

    if (isGameOver()) {
        playGameOverSound();
        const isCheck = isKingUnderAttack(boardState, turn);
        const winner = turn === 'red' ? 'black' : 'red';
        showGameOver(isCheck ? 'checkmate' : 'stalemate', winner);
        return;
    }

    // Сетевой режим — отправляем ход сопернику
    if (!isReceivedMove && gameMode === 'network' && _dc && _dc.readyState === 'open') {
        _dc.send(JSON.stringify({ type: 'move', fr, fc, tr, tc }));
    }

    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 600);
}


// ═══════════════════════════════════════════════════════════════
// 11. ХОД ИГРЫ
// ═══════════════════════════════════════════════════════════════

function startGame(color) {
    if (color === 'random') color = Math.random() < 0.5 ? 'red' : 'black';
    playerColor = color;

    document.getElementById('start-screen').style.display = 'none';
    isGameActive = true;
    viewingHistoryIndex = -1;
    moveHistoryText = [];
    boardStatesHistory = [];

    boardState = initialBoard.map(row => row.map(ch =>
        ch === '.' ? '.' : { type: ch, id: pieceIdCounter++ }
    ));
    boardStatesHistory.push(cloneBoard(boardState));

    updateHistoryUI();
    updatePrevMoveBtn();
    updateChatBtn();
    saveGameState();
    render();

    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 800);
}

function newGame() {
    isGameActive = false;
    isBoardVisible = false;
    clearGameState();
    disconnectPeer();

    pieceElementsMap.forEach(el => el.remove());
    pieceElementsMap.clear();

    boardState = JSON.parse(JSON.stringify(initialBoard));
    capturedRed = [];
    capturedBlack = [];
    selected = null;
    turn = 'red';
    validMoves = [];
    moveHistoryText = [];
    boardStatesHistory = [];
    isShowingPrevious = false;
    viewingHistoryIndex = -1;
    chatMessages = [];
    const chatList = document.getElementById('chat-messages');
    if (chatList) chatList.innerHTML = '';
    if (typeof setUnreadChat === 'function') setUnreadChat(false);

    document.getElementById('game-over-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('resume-screen').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'block';
    document.getElementById('solo-setup').style.display = 'none';
    document.getElementById('two-player-menu').style.display = 'none';
    document.getElementById('network-setup').style.display = 'none';
    document.getElementById('captured-top').innerHTML = '';
    document.getElementById('captured-bottom').innerHTML = '';

    updateHistoryUI();
}

function resumeGame() {
    const saved = loadGameState();
    if (!saved) { showModeSelection(); return; }

    boardState = saved.boardState;
    capturedRed = saved.capturedRed;
    capturedBlack = saved.capturedBlack;
    turn = saved.turn;
    playerColor = saved.playerColor;
    gameMode = saved.gameMode;
    difficulty = saved.difficulty;
    moveHistoryText = saved.moveHistoryText;
    boardStatesHistory = saved.boardStatesHistory;
    pieceIdCounter = saved.pieceIdCounter;
    isGameActive = true;
    viewingHistoryIndex = -1;

    document.getElementById('start-screen').style.display = 'none';
    updateHistoryUI();
    updatePrevMoveBtn();
    render();

    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 800);
}

function selectMode(mode) {
    if (mode === 'two') {
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('two-player-menu').style.display = 'block';
    } else {
        gameMode = 'vs-bot';
        updateChatBtn();
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('solo-setup').style.display = 'block';
    }
}

function selectTwoPlayerMode(mode) {
    if (mode === 'local') {
        gameMode = 'hotseat';
        updateChatBtn();
        startGame('red');
    } else {
        gameMode = 'network';
        updateChatBtn();
        document.getElementById('two-player-menu').style.display = 'none';
        document.getElementById('network-setup').style.display = 'block';
    }
}

function showTwoPlayerMenu() {
    disconnectPeer();
    document.getElementById('network-setup').style.display = 'none';
    document.getElementById('two-player-menu').style.display = 'block';
}

function showModeSelection() {
    clearGameState();
    disconnectPeer();
    document.getElementById('resume-screen').style.display = 'none';
    document.getElementById('mode-selection').style.display = 'block';
    document.getElementById('solo-setup').style.display = 'none';
    document.getElementById('two-player-menu').style.display = 'none';
    document.getElementById('network-setup').style.display = 'none';
}

function toggleGameMode() {
    gameMode = gameMode === 'vs-bot' ? 'hotseat' : 'vs-bot';
    document.getElementById('mode-name').innerText = gameMode === 'vs-bot' ? 'Против Бота' : 'Два игрока';
    const diffS = document.getElementById('diff-slider');
    if (diffS) diffS.disabled = gameMode === 'hotseat';
    viewingHistoryIndex = -1;
    if (gameMode === 'vs-bot' && turn !== playerColor) setTimeout(makeAiMove, 600);
    render();
}

function updateDiffLabel(val) {
    difficulty = parseInt(val);
    const el = document.getElementById('setup-diff-val');
    if (el) el.innerText = t('diff_' + val);
}

function requestNewGame() {
    if (!isGameActive) { newGame(); return; }
    document.getElementById('confirm-screen').style.display = 'flex';
}

function confirmNewGame() {
    document.getElementById('confirm-screen').style.display = 'none';
    newGame();
}

function cancelNewGame() {
    document.getElementById('confirm-screen').style.display = 'none';
}

function showGameOver(msgKey, winnerKey) {
    const title = document.getElementById('game-over-title');
    if (winnerKey && winnerKey !== 'none') {
        title.innerText = `${t('victory_prefix')} ${t('winner_' + winnerKey)}`;
        title.className = winnerKey === 'red' ? 'winner-red' : 'winner-black';
    } else {
        title.innerText = t('game_over_title');
        title.className = '';
    }
    document.getElementById('game-over-msg').innerText = t('msg_' + msgKey) || msgKey;
    document.getElementById('game-over-screen').style.display = 'flex';
    isGameActive = false;
    isBoardVisible = false;
    clearGameState();
}

function dismissGameOver() {
    document.getElementById('game-over-screen').style.display = 'none';
    isBoardVisible = true;
    statusText.innerText = t('game_finished');
    statusText.className = '';
}


// ═══════════════════════════════════════════════════════════════
// 12. UI — ПАНЕЛИ И НАСТРОЙКИ
// ═══════════════════════════════════════════════════════════════

// Закрывает все боковые панели (настройки, справка, чат)
function closeAllPanels() {
    document.getElementById('settings-screen').classList.remove('open');
    document.getElementById('help-screen').classList.remove('open');
    document.getElementById('chat-screen').classList.remove('open');
    // История — отдельный drawer, не трогаем
}

function openSettings() {
    closeAllPanels();
    const radio = document.querySelector(`input[name="piece-style"][value="${currentStyle}"]`);
    if (radio) radio.checked = true;
    document.getElementById('settings-screen').classList.add('open');
}
function closeSettings() { document.getElementById('settings-screen').classList.remove('open'); }

function openHistory() { document.getElementById('history-screen').classList.add('open'); }
function closeHistory() { document.getElementById('history-screen').classList.remove('open'); }

function openHelp() { closeAllPanels(); document.getElementById('help-screen').classList.add('open'); }
function closeHelp() { document.getElementById('help-screen').classList.remove('open'); }

// ═══════════════════════════════════════════════════════════════
// ЧАТ
// ═══════════════════════════════════════════════════════════════

let chatMessages = []; // { role, text }
let hasUnreadChat = false;

function setUnreadChat(val) {
    hasUnreadChat = val;
    const badge = document.getElementById('chat-badge');
    if (badge) badge.style.display = val ? 'block' : 'none';
}

// Вызывается после смены режима — обновляет состояние кнопки чата
function updateChatBtn() {
    const btn = document.getElementById('chat-btn');
    if (!btn) return;
    if (gameMode === 'hotseat') {
        btn.disabled = true;
        btn.classList.add('disabled-btn');
        btn.title = t('chat_disabled_title');
    } else {
        btn.disabled = false;
        btn.classList.remove('disabled-btn');
        btn.title = gameMode === 'network' ? t('chat_network_title') : '';
    }
}

function openChat() {
    if (gameMode === 'hotseat') return;
    closeAllPanels();
    setUnreadChat(false);
    document.getElementById('chat-screen').classList.add('open');
    document.getElementById('chat-input').focus();
    const list = document.getElementById('chat-messages');
    if (list.children.length === 0) {
        appendChatBubble('system', t('chat_welcome'));
    }
}

function closeChat() {
    document.getElementById('chat-screen').classList.remove('open');
}

function appendChatBubble(role, text, isTyping = false) {
    const list = document.getElementById('chat-messages');
    const el = document.createElement('div');
    el.className = `chat-bubble ${role}${isTyping ? ' typing' : ''}`;
    el.textContent = text;
    list.appendChild(el);
    list.scrollTop = list.scrollHeight;
    return el;
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const msg = input.value.trim();
    if (!msg) return;

    input.value = '';

    // Сетевой режим
    if (gameMode === 'network') {
        if (_sendChat) {
            appendChatBubble('user', msg);
            chatMessages.push({ role: 'user', text: msg });
            _sendChat(msg);
        } else {
            appendChatBubble('system', t('chat_no_connection'));
        }
        return;
    }

    appendChatBubble('user', msg);
    chatMessages.push({ role: 'user', text: msg });

    // В режиме vs-bot — отвечаем случайным числом в двоичном коде
    if (gameMode === 'vs-bot') {
        sendBtn.disabled = true;
        input.disabled = true;

        const typingEl = appendChatBubble('opponent', '● ● ●', true);

        setTimeout(() => {
            typingEl.remove();
            const num = Math.floor(Math.random() * 257);
            const binary = num.toString(2);
            appendChatBubble('opponent', binary);
            chatMessages.push({ role: 'opponent', text: binary });
            if (!document.getElementById('chat-screen').classList.contains('open')) setUnreadChat(true);
            sendBtn.disabled = false;
            input.disabled = false;
            input.focus();
        }, 600 + Math.random() * 600);
    }
}



// ═══════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════
function setNetworkStatus(text, cls) {
    const el = document.getElementById('network-status');
    if (!el) return;
    el.textContent = text;
    el.className = 'net-status ' + cls;
}

// ═══════════════════════════════════════════════════════════════
// WebRTC — СЕТЕВОЕ СОЕДИНЕНИЕ (ручной обмен кодами, без сервера)
// ═══════════════════════════════════════════════════════════════

let _pc = null;   // RTCPeerConnection
let _dc = null;   // RTCDataChannel
let _sendChat = null;
let networkGameStarted = false;

const _ICE = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
        { urls: 'stun:stun.cloudflare.com:3478' },
        { urls: 'stun:stun.stunprotocol.org:3478' },
    ]
};

function _encode(obj) { return btoa(unescape(encodeURIComponent(JSON.stringify(obj)))); }
function _decode(str) { return JSON.parse(decodeURIComponent(escape(atob(str.trim())))); }

// Ждём завершения сбора ICE-кандидатов
function _waitICE(pc) {
    return new Promise(resolve => {
        if (pc.iceGatheringState === 'complete') { resolve(); return; }
        const check = () => {
            if (pc.iceGatheringState === 'complete') {
                pc.removeEventListener('icegatheringstatechange', check);
                resolve();
            }
        };
        pc.addEventListener('icegatheringstatechange', check);
        setTimeout(resolve, 15000);
    });
}

function _setupDC(dc) {
    _dc = dc;
    _sendChat = (text) => {
        try { dc.send(JSON.stringify({ type: 'chat', text })); }
        catch (e) { console.error('[WebRTC] send error:', e); }
    };
    dc.onopen = () => {
        console.log('[WebRTC] DataChannel open');
        setNetworkStatus(t('net_connected'), 'connected');
        if (!networkGameStarted) startNetworkGame();
    };
    dc.onmessage = (e) => {
        try {
            const data = JSON.parse(e.data);
            if (data.type === 'move') {
                // Получили ход соперника — применяем
                makeMove(data.fr, data.fc, data.tr, data.tc, true);
            } else if (data.type === 'chat') {
                appendChatBubble('opponent', data.text);
                chatMessages.push({ role: 'opponent', text: data.text });
                if (!document.getElementById('chat-screen').classList.contains('open')) setUnreadChat(true);
            } else if (data.type === 'yoo') {
                playYooSound(true);
            }
        } catch (err) { console.error('[WebRTC] msg parse error:', err); }
    };
    dc.onclose = () => {
        if (networkGameStarted) {
            appendChatBubble('system', t('chat_opponent_disconnected'));
            showGameOver('disconnect', 'none');
        }
    };
    dc.onerror = (e) => console.error('[WebRTC] DC error:', e);
}

function _createPC() {
    const pc = new RTCPeerConnection(_ICE);
    pc.onicecandidate = (e) => console.log('[WebRTC] icecandidate:', e.candidate ? e.candidate.type : 'null(done)');
    pc.oniceconnectionstatechange = () => {
        console.log('[WebRTC] iceConnectionState:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'failed') {
            // Пробуем ICE restart
            console.warn('[WebRTC] ICE failed, trying restart');
            setNetworkStatus(t('net_p2p_failed'), 'error');
        }
    };
    pc.onicegatheringstatechange = () => console.log('[WebRTC] iceGatheringState:', pc.iceGatheringState);
    pc.onconnectionstatechange = () => {
        console.log('[WebRTC] connectionState:', pc.connectionState);
        if (pc.connectionState === 'connected') {
            setNetworkStatus(t('net_connected'), 'connected');
        } else if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected' || pc.connectionState === 'closed') {
            setNetworkStatus(t('net_p2p_failed'), 'error');
            if (networkGameStarted && isGameActive) {
                showGameOver('disconnect', 'none');
            }
        }
    };
    pc.onsignalingstatechange = () => console.log('[WebRTC] signalingState:', pc.signalingState);
    return pc;
}

// ШАГ 1 (хост): создать оффер
async function createRoom() {
    isHost = true;
    setNetworkStatus(t('net_creating'), 'waiting');
    document.getElementById('step-host-1').style.display = 'block';
    document.getElementById('step-guest-1').style.display = 'none';

    document.getElementById('offer-code').value = t('net_wait');
    _pc = _createPC();
    _setupDC(_pc.createDataChannel('game'));

    const offer = await _pc.createOffer();
    await _pc.setLocalDescription(offer);
    console.log('[WebRTC] local description set, gathering ICE…');
    await _waitICE(_pc);
    console.log('[WebRTC] ICE gathered, candidates in SDP:', (_pc.localDescription.sdp.match(/a=candidate/g) || []).length);

    document.getElementById('offer-code').value = _encode(_pc.localDescription);
    setNetworkStatus(t('net_send_to_opponent'), 'waiting');
}

// ШАГ 2 (хост): вставить ответ гостя
async function hostSetAnswer() {
    const answerStr = document.getElementById('answer-input').value.trim();
    if (!answerStr) return;
    try {
        const desc = _decode(answerStr);
        console.log('[WebRTC] hostSetAnswer type:', desc.type, 'candidates:', (desc.sdp.match(/a=candidate/g) || []).length);
        await _pc.setRemoteDescription(desc);
        console.log('[WebRTC] remote set, signalingState:', _pc.signalingState, 'iceState:', _pc.iceConnectionState);
        setNetworkStatus(t('net_establishing'), 'waiting');
    } catch (e) {
        setNetworkStatus(t('net_wrong_answer'), 'error');
        console.error('[WebRTC] hostSetAnswer error:', e);
    }
}

// ШАГ 1 (гость): вставить оффер и получить ответ
async function guestGetAnswer() {
    const offerStr = document.getElementById('guest-offer-input').value.trim();
    if (!offerStr) return;

    isHost = false;
    setNetworkStatus(t('net_creating_answer'), 'waiting');

    _pc = _createPC();
    _pc.ondatachannel = (e) => { console.log('[WebRTC] ondatachannel'); _setupDC(e.channel); };

    try {
        document.getElementById('step-guest-2').style.display = 'block';
        document.getElementById('answer-code').value = t('net_wait');

        const desc = _decode(offerStr);
        console.log('[WebRTC] guestGetAnswer, offer candidates:', (desc.sdp.match(/a=candidate/g) || []).length);
        await _pc.setRemoteDescription(desc);
        const answer = await _pc.createAnswer();
        await _pc.setLocalDescription(answer);
        console.log('[WebRTC] local answer set, gathering ICE…');
        await _waitICE(_pc);
        console.log('[WebRTC] ICE gathered, candidates:', (_pc.localDescription.sdp.match(/a=candidate/g) || []).length);

        document.getElementById('answer-code').value = _encode(_pc.localDescription);
        setNetworkStatus(t('net_send_to_host'), 'waiting');
    } catch (e) {
        setNetworkStatus(t('net_wrong_offer'), 'error');
        console.error('[WebRTC] guestGetAnswer error:', e);
    }
}




// ШАГ 1 (гость): вставить оффер и получить ответ — дубль удалён

function _copyField(id) {
    const el = document.getElementById(id);
    el.select();
    navigator.clipboard.writeText(el.value).then(() => {
        setNetworkStatus(t('net_copied'), 'connected');
        setTimeout(() => setNetworkStatus(isHost ? t('net_send_to_opponent') : t('net_send_to_host'), 'waiting'), 1500);
    });
}

function startNetworkGame() {
    if (networkGameStarted) return;
    networkGameStarted = true;

    // Хост = красные, гость = чёрные
    playerColor = isHost ? 'red' : 'black';
    gameMode = 'network';
    updateChatBtn();

    // Инициализируем доску
    boardState = initialBoard.map(row => row.map(ch =>
        ch === '.' ? '.' : { type: ch, id: pieceIdCounter++ }
    ));
    boardStatesHistory = [cloneBoard(boardState)];
    capturedRed = [];
    capturedBlack = [];
    turn = 'red';
    selected = null;
    validMoves = [];
    moveHistoryText = [];
    viewingHistoryIndex = -1;
    isGameActive = true;

    document.getElementById('start-screen').style.display = 'none';
    updateHistoryUI();
    updatePrevMoveBtn();
    render();

    const list = document.getElementById('chat-messages');
    chatMessages = [];
    if (list) list.innerHTML = '';

    appendChatBubble('system', t('chat_game_started'));
    appendChatBubble('system', isHost ? t('chat_you_red') : t('chat_you_black'));
}

function disconnectPeer() {
    if (_dc) { try { _dc.close(); } catch (e) { } _dc = null; }
    if (_pc) { try { _pc.close(); } catch (e) { } _pc = null; }
    _sendChat = null;
    networkGameStarted = false;
    isHost = false;

    ['step-host-1', 'step-host-2', 'step-guest-2'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
    const guest1 = document.getElementById('step-guest-1');
    if (guest1) guest1.style.display = 'block';
    ['offer-code', 'answer-input', 'guest-offer-input', 'answer-code'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
}





function handleBackgroundUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        document.getElementById('bg-layer').style.backgroundImage = `url('${dataUrl}')`;
        try { localStorage.setItem('xiangqi_bg', dataUrl); } catch (err) {
            console.warn('Фон не сохранён: файл слишком большой', err);
        }
    };
    reader.readAsDataURL(file);
}

function clearBackground() {
    document.getElementById('bg-layer').style.backgroundImage = 'none';
    const input = document.getElementById('bg-upload');
    if (input) input.value = '';
    try { localStorage.removeItem('xiangqi_bg'); } catch (e) { }
}

function updateVolume(val) {
    globalVolume = val / 100;
    document.getElementById('volume-val').innerText = val + '%';
    saveSettings();
}


// ═══════════════════════════════════════════════════════════════
// 13. ФОН — BALATRO ТЕМЫ
// ═══════════════════════════════════════════════════════════════

const BALATRO_THEMES = [
    { name: 'Синий', color1: [0.067, 0.075, 0.231], color2: [0.0, 0.42, 0.706], color3: [0.086, 0.137, 0.145], spinRotation: -10, spinSpeed: 4, contrast: 1.0, lighting: 0.15, spinAmount: 0.10, pixelFilter: 2000 },
    { name: 'Пурпурный', color1: [0.12, 0.04, 0.25], color2: [0.45, 0.05, 0.55], color3: [0.08, 0.03, 0.18], spinRotation: 5, spinSpeed: 5, contrast: 1.05, lighting: 0.12, spinAmount: 0.14, pixelFilter: 2000 },
    { name: 'Зелёный', color1: [0.03, 0.15, 0.10], color2: [0.02, 0.50, 0.28], color3: [0.05, 0.12, 0.07], spinRotation: 15, spinSpeed: 3, contrast: 1.1, lighting: 0.10, spinAmount: 0.08, pixelFilter: 2000 },
    { name: 'Красный', color1: [0.20, 0.04, 0.04], color2: [0.55, 0.05, 0.05], color3: [0.12, 0.03, 0.03], spinRotation: -5, spinSpeed: 4, contrast: 1.0, lighting: 0.13, spinAmount: 0.12, pixelFilter: 2000 },
    { name: 'Чёрный', color1: [0.05, 0.05, 0.05], color2: [0.15, 0.15, 0.15], color3: [0.02, 0.02, 0.02], spinRotation: 8, spinSpeed: 3, contrast: 1.2, lighting: 0.05, spinAmount: 0.07, pixelFilter: 2000 },
    { name: 'Золотой', color1: [0.18, 0.14, 0.01], color2: [0.55, 0.40, 0.00], color3: [0.10, 0.08, 0.02], spinRotation: -12, spinSpeed: 5, contrast: 1.15, lighting: 0.20, spinAmount: 0.09, pixelFilter: 2000 },
];

function updateBodyBackground() {
    if (balatroInstance && balatroInstance.running) {
        document.body.style.backgroundColor = '';
    } else {
        const [r, g, b] = BALATRO_THEMES[currentBgTheme].color1.map(v => Math.round(v * 255));
        document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}

function applyBgTheme(themeIndex) {
    currentBgTheme = themeIndex;
    const theme = BALATRO_THEMES[themeIndex];
    if (balatroInstance) {
        balatroInstance.options = { ...balatroInstance.options, ...theme };
    } else {
        balatroInstance = new Balatro('balatro-canvas', { ...theme });
    }
    document.querySelectorAll('.bg-theme-btn').forEach((btn, i) =>
        btn.classList.toggle('active-theme', i === themeIndex)
    );
    updateBodyBackground();
    saveSettings();
}

function toggleBalatro(enabled) {
    if (balatroInstance) balatroInstance.toggle(enabled);
    updateBodyBackground();
    saveSettings();
}


// ═══════════════════════════════════════════════════════════════
// 14. АУДИО
// ═══════════════════════════════════════════════════════════════

const AUDIO_SRCS = {
    move: 'https://cdn.freesound.org/previews/585/585598_462330-lq.mp3',
    capture: 'https://cdn.freesound.org/previews/340/340287_5769530-lq.mp3',
    click: 'https://cdn.freesound.org/previews/477/477702_9961300-lq.mp3',
    gameover: 'https://cdn.freesound.org/previews/636/636181_9034501-lq.mp3',
};

const audioCache = {};
(function preloadAudio() {
    for (const [key, url] of Object.entries(AUDIO_SRCS)) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        audioCache[key] = audio;
    }
})();

function playSound(key) {
    const audio = audioCache[key];
    if (!audio) return;
    audio.volume = globalVolume;
    audio.currentTime = 0;
    audio.play().catch(() => { });
}

function playYooSound(fromNetwork = false) {
    const btn = document.getElementById('sound-btn');
    const audio = new Audio('https://www.myinstants.com/media/sounds/yoooo.mp3');
    audio.volume = globalVolume;
    if (btn) { btn.disabled = true; btn.classList.add('playing'); }
    audio.play().catch(() => { });
    const restore = () => { if (btn) { btn.disabled = false; btn.classList.remove('playing'); } };
    audio.onended = restore;
    audio.onerror = restore;

    if (!fromNetwork && gameMode === 'network' && _dc && _dc.readyState === 'open') {
        try { _dc.send(JSON.stringify({ type: 'yoo' })); } catch (e) { }
    }
}

function playMoveSound() { playSound('move'); }
function playCaptureSound() { playSound('capture'); }
function playClickSound() { playSound('click'); }
function playGameOverSound() { playSound('gameover'); }


// ═══════════════════════════════════════════════════════════════
// 15. КЛАСС: BALATRO (анимированный WebGL-фон)
// ═══════════════════════════════════════════════════════════════

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
        this.isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        this.initShaders();
        this.initBuffers();
        // Всегда запускаем анимацию; DOMContentLoaded управляет начальным состоянием
        this.running = true;
        this.animate();

        window.addEventListener('resize', () => this.resize());
        this.resize();
    }

    toggle(enabled) {
        const wasRunning = this.running;
        this.running = enabled;
        if (enabled) {
            this.canvas.style.display = 'block';
            this.resize();
            // Запускаем новый RAF-цикл только если до этого анимация была остановлена
            if (!wasRunning) this.animate();
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

        // Кэшируем uniform locations — дорогой вызов, не нужно делать каждый кадр
        this.uniforms = {
            iTime: this.gl.getUniformLocation(this.program, 'iTime'),
            iResolution: this.gl.getUniformLocation(this.program, 'iResolution'),
            color1: this.gl.getUniformLocation(this.program, 'color1'),
            color2: this.gl.getUniformLocation(this.program, 'color2'),
            color3: this.gl.getUniformLocation(this.program, 'color3'),
            contrast: this.gl.getUniformLocation(this.program, 'contrast'),
            lighting: this.gl.getUniformLocation(this.program, 'lighting'),
            spinAmount: this.gl.getUniformLocation(this.program, 'spinAmount'),
            pixelFilter: this.gl.getUniformLocation(this.program, 'pixelFilter'),
            spinRotation: this.gl.getUniformLocation(this.program, 'spinRotation'),
            spinSpeed: this.gl.getUniformLocation(this.program, 'spinSpeed'),
        };
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
        // На мобильных ограничиваем до 30fps, на ПК — нативные 60fps
        const interval = this.isMobile ? 1000 / 30 : 0;
        if (interval && (now - (this.lastFrameTime || 0)) < interval) {
            requestAnimationFrame(() => this.animate());
            return;
        }
        this.lastFrameTime = now;

        const time = (now - this.startTime) / 1000;
        const u = this.uniforms;
        this.gl.useProgram(this.program);

        this.gl.uniform1f(u.iTime, time);
        this.gl.uniform2f(u.iResolution, this.canvas.width, this.canvas.height);
        this.gl.uniform3fv(u.color1, this.options.color1);
        this.gl.uniform3fv(u.color2, this.options.color2);
        this.gl.uniform3fv(u.color3, this.options.color3);
        this.gl.uniform1f(u.contrast, this.options.contrast);
        this.gl.uniform1f(u.lighting, this.options.lighting);
        this.gl.uniform1f(u.spinAmount, this.options.spinAmount);
        this.gl.uniform1f(u.pixelFilter, this.options.pixelFilter);
        this.gl.uniform1f(u.spinRotation, this.options.spinRotation);
        this.gl.uniform1f(u.spinSpeed, this.options.spinSpeed);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(() => this.animate());
    }
}


// ═══════════════════════════════════════════════════════════════
// 16. КЛАСС: CLICK SPARK (эффект клика, только десктоп)
// ═══════════════════════════════════════════════════════════════

class ClickSpark {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.sparks = [];
        this.animating = false; // Не крутим RAF когда нечего рисовать
        this.config = {
            sparkSize: 10,
            sparkRadius: 15,
            sparkCount: 8,
            duration: 400,
        };
        // Предвычисляем cos/sin для N лучей — не пересчитываем каждый кадр
        this.angles = Array.from({ length: this.config.sparkCount }, (_, i) => ({
            cos: Math.cos((i * 2 * Math.PI) / this.config.sparkCount),
            sin: Math.sin((i * 2 * Math.PI) / this.config.sparkCount),
        }));
        this.colors = ['#212121', '#d32f2f', '#3498db'];
        this.init();
    }

    init() {
        Object.assign(this.canvas.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: '10000',
        });
        document.body.appendChild(this.canvas);
        this.handleResize();
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousedown', (e) => {
            const x = e.clientX * (this.canvas.width / window.innerWidth);
            const y = e.clientY * (this.canvas.height / window.innerHeight);
            this.addSpark(x, y);
        });
    }

    handleResize() {
        // Ограничиваем ширину размером экрана (не растёт при отдалении),
        // высоту считаем по соотношению сторон текущего окна — иначе CSS растягивает
        // canvas с разными коэффициентами по X и Y и искры сплющиваются.
        const w = Math.min(window.innerWidth, screen.width);
        const h = Math.round(w * window.innerHeight / window.innerWidth);
        this.canvas.width = w;
        this.canvas.height = h;
    }

    addSpark(x, y) {
        this.sparks.push({
            x, y,
            startTime: performance.now(),
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
        });
        if (!this.animating) {
            this.animating = true;
            requestAnimationFrame(() => this.animate());
        }
    }

    animate() {
        const now = performance.now();
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparks = this.sparks.filter(spark => {
            const elapsed = now - spark.startTime;
            if (elapsed >= this.config.duration) return false;

            const progress = elapsed / this.config.duration;
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const r1 = this.config.sparkRadius * easedProgress;
            const r2 = r1 + this.config.sparkSize * (1 - progress);

            ctx.save();
            ctx.translate(spark.x, spark.y);
            ctx.strokeStyle = spark.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = 1 - progress;

            // Один beginPath + все линии + один stroke = 1 draw call вместо 8
            ctx.beginPath();
            for (const { cos, sin } of this.angles) {
                ctx.moveTo(cos * r1, sin * r1);
                ctx.lineTo(cos * r2, sin * r2);
            }
            ctx.stroke();
            ctx.restore();
            return true;
        });

        if (this.sparks.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            // Искр нет — останавливаем цикл и очищаем canvas
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.animating = false;
        }
    }
}


// ═══════════════════════════════════════════════════════════════
// 17. ИНИЦИАЛИЗАЦИЯ
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Удаляем устаревший ключ
    try { localStorage.removeItem('balatro-enabled'); } catch (e) { }

    const saved = loadSettings();

    // Тема фона
    const themeIdx = (saved && saved.bgTheme !== undefined) ? saved.bgTheme : 0;
    currentBgTheme = themeIdx;
    balatroInstance = new Balatro('balatro-canvas', { ...BALATRO_THEMES[themeIdx] });

    // Анимированный фон: на мобильных по умолчанию выключен
    const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isEnabled = saved ? (saved.balatroEnabled !== false) : !isMobile;
    const toggle = document.getElementById('balatro-toggle');
    if (toggle) toggle.checked = isEnabled;
    if (!isEnabled) balatroInstance.toggle(false);
    updateBodyBackground();

    // Активная тема в UI
    document.querySelectorAll('.bg-theme-btn').forEach((btn, i) =>
        btn.classList.toggle('active-theme', i === themeIdx)
    );

    // Стиль фигур
    if (saved && saved.pieceStyle) {
        currentStyle = saved.pieceStyle;
        const radio = document.querySelector(`input[name="piece-style"][value="${currentStyle}"]`);
        if (radio) radio.checked = true;
        updateHelpSymbols();
    }

    // Громкость
    if (saved && saved.volume !== undefined) {
        globalVolume = saved.volume / 100;
        const slider = document.getElementById('volume-slider');
        const label = document.getElementById('volume-val');
        if (slider) slider.value = saved.volume;
        if (label) label.innerText = saved.volume + '%';
    }

    // Язык интерфейса
    const savedLang = saved ? saved.lang : null;
    setLanguage(savedLang || 'ru', false);

    // Пользовательский фон
    try {
        const bg = localStorage.getItem('xiangqi_bg');
        if (bg) document.getElementById('bg-layer').style.backgroundImage = `url('${bg}')`;
    } catch (e) { }

    // Стартовый экран
    const savedGame = loadGameState();
    if (savedGame) {
        const modeLabel = savedGame.gameMode === 'hotseat'
            ? t('resume_mode_hotseat')
            : t('resume_mode_bot').replace('%d', savedGame.difficulty);
        const moves = savedGame.moveHistoryText ? savedGame.moveHistoryText.length : 0;
        let moveSuffix;
        if (currentLang === 'ru') {
            moveSuffix = moves === 1 ? t('resume_moves_1') : moves < 5 ? t('resume_moves_few') : t('resume_moves_many');
        } else {
            moveSuffix = moves === 1 ? t('resume_moves_1') : t('resume_moves_many');
        }
        document.getElementById('resume-desc').innerText = `${modeLabel} · ${moves} ${moveSuffix}`;
        document.getElementById('resume-screen').style.display = 'block';
        document.getElementById('mode-selection').style.display = 'none';
        document.getElementById('solo-setup').style.display = 'none';
    } else {
        document.getElementById('resume-screen').style.display = 'none';
        document.getElementById('mode-selection').style.display = 'block';
    }
});


// ═══════════════════════════════════════════════════════════════
// 18. ЗАПУСК
// ═══════════════════════════════════════════════════════════════

updateHelpSymbols();
render();

// ClickSpark только на десктопе
if (!('ontouchstart' in window) && !(navigator.maxTouchPoints > 0)) {
    new ClickSpark();
}

// Перерисовка при повороте экрана (debounce 150ms)
let _resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => { if (isGameActive) render(); }, 150);
});
