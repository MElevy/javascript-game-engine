const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 38;
const UP_ARROW = 40;

const Game = class {
    constructor(height = 270, width = 480, style = 'border:2px solid black;width:100%;', intervalTime = 20) {
        this.intervalTime = intervalTime;
        this.width = width;
        this.style = style;
        this.height = height;
        this.screen = document.createElement('canvas');
        this.screen.width = this.width;
        this.screen.height = this.height;
        this.context = this.screen.getContext('2d');
        this.keys_pressed = [];
        this.keys_pressed[1000] = false;
        this.key_tracker = setInterval(() => {
            window.addEventListener('keydown', (e) => { this.keys_pressed[e.keyCode] = true; });
            window.addEventListener('keyup', (e) => { this.keys_pressed[e.keyCode] = false; });
        }, this.intervalTime);
    }
    Rect(x, y, width, height, fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fillRect(x, y, width, height);
    }
    Text(text, x, y, fillColor, font = "10px Sans-Serif") {
        this.context.font = font;
        this.context.fillStyle = fillColor;
        this.context.fillText(text, x, y);
    }
    Image(source, x, y, width, height) {
        let img = new Image();
        img.src = source;
        this.context.drawImage(img, x, y, width, height);
    }
    clear() {
        this.context.clearRect(0, 0, screen.width, screen.height);
    }
    start(updateFunc) {
        this.screen.style = this.style;
        this.screen.width = this.width, this.screen.height = this.height;
        this.update = updateFunc;
        this.gameloop = setInterval(this.update, this.intervalTime);
        document.body.appendChild(this.screen);
    }
    on_key(keyCode, on) {
        const on_key_do = () => {
            if (this.keys_pressed[keyCode] == true) {
                on();
            }
        };
        setInterval(on_key_do, this.intervalTime);
    }
    stop() {
        clearInterval(this.gameloop);
    }
};

const game = new Game();

const Rect = class {
    constructor(x, y, width, height, fillColor) {
        this.x = x, this.y = y;
        this.fillColor = fillColor;
        this.width = width, this.height = height;
    }
    update() {}
    draw() {
        this.update();
        game.Rect(this.x, this.y, this.width, this.height, this.fillColor);
    }
    isColliding(other) {
        let left = this.x, right = this.x + this.width;
        let bottom = this.y, top = this.y + this.height;
        let other_left = other.x, other_right = other.x + other.width;
        let other_bottom = other.y, other_top = other.y + other.height;
        let colliding = true;
        if (left > other_right || top < other_bottom || right < other_left || bottom > other_top) {
            colliding = false;
        }
        return colliding;
    }
}

const Sprite = class {
    constructor(source, x, y, width, height) {
        this.source = source;
        this.x = x, this.y = y;
        this.width = width, this.height = height;
    }
    update() {}
    draw() {
        this.update();
        game.Image(this.source, this.x, this.y, this.height, this.width);
    }
    isColliding(other) {
        let left = this.x, right = this.x + this.width;
        let bottom = this.y, top = this.y + this.height;
        let other_left = other.x, other_right = other.x + other.width;
        let other_bottom = other.y, other_top = other.y + other.height;
        let colliding = true;
        if (left > other_right || top < other_bottom || right < other_left || bottom > other_top) {
            colliding = false;
        }
        return colliding;
    }
}

const Sound = class {
    constructor(source) {
        this.source = source;
        this.sound = document.createElement('audio');
        this.sound.setAttribute('preload', 'auto');
        this.sound.setAttribute('controls', 'none');
        this.sound.style.display = 'none';
        // document.body.appendChild(this.sound);
    }
    play() {
        this.sound.src = this.source;
        this.sound.play();
    }
    stop() {
        this.sound.pause();
    }
};