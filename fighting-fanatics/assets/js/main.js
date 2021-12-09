//counts da turns
let turnCounter = 1;

//enemy array
let enemyArray = [null, null, null, null, null, null, null, null, null];

//player obj
let player;

//grabbed from the MDN @ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random, used for player attack intrigue
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

//creates player and sets click events
window.onload = (e) =>  {
    document.querySelector("#fight").onclick = fightClick;
    document.querySelector("#heal").onclick = healClick;
    document.querySelector("#run").onclick = runAway;
    player = new Player(150, 7);
    document.querySelector("#player_hp").innerHTML = "Player HP: " + player.hp + " Atk: " + player.atk + " Heal: " + player.healing;
    addEnemy(new Chicken());
}

//lets all of the enemys take their turn
function enemyTurns(){
    enemyArray.forEach(enemyTurn);
    turnCount();
}

//the actual turn for each enemy. updates player hp after each attack
function enemyTurn(enemy){
    if(enemy != null){
        enemy.attack(player);
        document.querySelector("#player_hp").innerHTML = "Player HP: " + player.hp + " Atk: " + player.atk + " Heal: " + player.healing;
    }
    checkForDeadPlayer();
}

//increases the turn count after the enemy turn. also, if the turn is a perfect square, it adds an enemy based on the current turn
function turnCount(){
    turnCounter++;
    document.querySelector("#turn").innerHTML = "Turn: " + turnCounter;
    if (Math.sqrt(turnCounter) % 1 === 0) {
        if(turnCounter < 25){addEnemy(new Chicken);}
        else if(turnCounter < 100){addEnemy(new Slime);}
        else if(turnCounter < 256){addEnemy(new Goblin);}
        else{addEnemy(new Jay);}
     }
    checkForDeadMonsters();
}

//when the player clicks fight, it will attack the first enemy in the array, which then goes into the enemy turns
function fightClick(){
    let slash = new Howl({src: ['assets/wav/370204__nekoninja__samurai-slash.wav'], volume: 0.5});
    slash.play();
    for (let i = 0; i < enemyArray.length; i++){
        if(enemyArray[i] != null){
            enemy = enemyArray[i];
            player.attack(enemyArray[i]);
            document.querySelector("#enemy_image" + (i + 1)).innerHTML = "<img src=" + enemy.image + "> <br/> HP: " + enemy.hp + "<br/>" + enemy.name;
            break;
        }
    }
    enemyTurns();
}

//when the player clicks heal, they heal, then it goes into the enemy turn
function healClick() {
    let heal = new Howl({src: ['assets/wav/346116__lulyc__retro-game-heal-sound.wav'], volume: 0.5});
    heal.play();
    player.heal();
    document.querySelector("#player_hp").innerHTML = "Player HP: " + player.hp + " Atk: " + player.atk + " Heal: " + player.healing;
    enemyTurns();
}

//adds an enemy to the first empty slot
function addEnemy(enemy) {
    for (let i = 0; i < enemyArray.length; i++){
        if(enemyArray[i] == null){
            enemyArray[i] = enemy;
            document.querySelector("#enemy_image" + (i + 1)).innerHTML = "<img src=" + enemy.image + "> <br/> HP: " + enemy.hp + "<br/>" + enemy.name;
            break;
        }
    }
    
}

//self titled, checks for dead monsters and rewards the player with 3 extra attack and 50 extra heal
function checkForDeadMonsters() {
    for (let i = 0; i < enemyArray.length; i++){
        if(enemyArray[i] != null &&enemyArray[i].hp <= 0){
            enemyArray[i] = null;
            document.querySelector("#enemy_image" + (i + 1)).innerHTML = "";
            player.atk += 3;
            player.healing += 25;
            document.querySelector("#player_hp").innerHTML = "Player HP: " + player.hp + " Atk: " + player.atk + " Heal: " + player.healing;
        }
    }
}

//checks to see if the player is dead and locks input.
function checkForDeadPlayer() {
    if(player.hp <= 0){
        document.querySelector("#fight").onclick = null;
        document.querySelector("#heal").onclick = null;
        document.querySelector("#enemy_image5").innerHTML = "Press Run to play again.";
    }
}

//resets the game via reloading the page
function runAway() {
    location.reload();
}