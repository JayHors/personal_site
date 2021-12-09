
//the generic class for an enemy, contains the hp, the path to the image for the page,
//the name of the enemy, and the attack that the enemy has.
//the attack is an arrow function rather than a simple number because I wanted to allow for special attacks,
//i.e. the self insert doing more damage per turn. 
class Enemy{
    constructor(hp,image,name,attack){
        this.hp = hp;
        this.image = image;
        this.name = name;
        this.attack = attack;
    }
}

//these are some of the various enemies that can appear in the game
class Chicken extends Enemy{
    constructor(){
        super(10,"assets/enemy/chicken.png","Chicken",
        (target) =>{target.hp -= 1;}
        );
    }
}
class Slime extends Enemy{
    constructor(){
        super(50,"assets/enemy/slime.png","Slime",
        (target) =>{target.hp -= 10;}
        );
    }
}
class Goblin extends Enemy{
    constructor(){
        super(100,"assets/enemy/goblin.png","Goblin",
        (target) =>{target.hp -= 50;}
        );
    }
}
class Jay extends Enemy{
    constructor(){
        super(1000,"assets/enemy/jay.png","Jay",
        (target) =>{target.hp -= 99 * (turnCounter - 256);}
        );
    }
}
class BunnyEnd extends Enemy{
    constructor(){
        super(
            8000,"null","Ending Bunny",
            (target) =>{location.reload();}
        );
    }
}
//end of the enemies block

//player is the class for the user of the game, this has a heal component which is unique to the player
class Player{
    constructor(hp, atk){
        this.hp = hp;
        this.atk = atk;
        this.healing = 50;
    }
    //attacks
    attack(target) {
        target.hp -= this.atk * getRandomIntInclusive(0, 2);
    }
    //heals
    heal(){
        this.hp += this.healing;
    }
}

