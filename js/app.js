// Enemies our player must avoid
var Enemy = function (x, y, difficulty) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    // Set the height and width of the enemy, this helps in checking the collision more accurately
    this.width = 40;
    this.height = 30;

    // Generate random number for enemy speed
    // Get speed limits depending on the difficulty level chosen
    limits = enemy_min_max_speed(difficulty);

    // Assign random speed within the speed limits
    this.speed = (Math.random() * limits[1] + limits[0]);
};

function enemy_min_max_speed(e) {
    if (e == 'E') {
        return [100, 150];
    }
    else if (e == 'M') {
        return [150, 200]
    }
    else if (e == 'H') {
        return [200, 250]
    }
    else {
        alert("Wrong Difficulty")
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
    } else {
        this.x = -25;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y) {
    //image for player character
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;

    // Set the height and width of the enemy, this helps in checking the collision more accurately
    this.width = 30;
    this.height = 30;
};

Player.prototype.update = function () {

    // Check if player has reached the finish point, if so show alert box and reset the player position
    if (this.y < 0) {
        alert("You Win!");
        this.reset();
    }
    player.detectCollision();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player according to the pressed direction key
Player.prototype.handleInput = function (dir) {
    if (dir == 'left' && this.x > 0) {
        this.x -= 100;
    }
    if (dir == 'right' && this.x < 350) {
        this.x += 100;
    }
    if (dir == 'up' && this.y > 0) {
        this.y -= 100;
    }
    if (dir == 'down' && this.y < 400) {
        this.y += 100;
    }
};

// Check if the objects a and b are colliding
function collides(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

// Detect Collision
Player.prototype.detectCollision = function () {
    allEnemies.forEach(function (enemy) {
        if (collides(enemy, player)) {
            player.reset();
        }
    });
};

// Reset Player to start Position
Player.prototype.reset = function () {
    this.y = 425;
    this.x = 200;
};


// Ask user to set the difficulty level, if a user adds a wrong value ask again

var difficulty_set = false;
var difficulty_array = ["E", "M", "H"];

while (!difficulty_set) {
    var difficulty = prompt("Enter difficulty level: (E for Easy, M for Medium, H for Hard)", "M");
    if (difficulty_array.indexOf(difficulty) > -1) {
        difficulty_set = true;
    }
}


// Create Enemies and add them to all enemies array
var allEnemies = [];

// These are used to place the enemy in proper rows and at proper positions
var COL_SIZE = 101;
var ROW_SIZE = 70;


for (var i = 1; i < 4; i++) {
    // Place the enemies in different rows and at different positions

    // Get the column position in which enemy will be placed
    var x = Math.floor(Math.random() * (COL_SIZE * 5));

    // Get the row position in which enemy will be placed
    var y = ROW_SIZE * i - 20 / i;

    allEnemies[i] = new Enemy(x, y, difficulty);
}

// Create a new player
var player = new Player(200, 425);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
