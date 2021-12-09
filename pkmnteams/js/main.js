//I use both of these in the parser, html builder, and load/unload functions, as well as the image array in the image handler
let pokeimg = [];

let pokemonarray = [];

//assigns onclick to the button and loads last team after load
window.onload = (e) =>  {document.querySelector("#teambuild").onclick = teamBuildClicked;
                            if(window.localStorage.getItem("lastteam") != null){
                                document.querySelector("#teamcontainer").innerHTML = window.localStorage.getItem("lastteam");
                            }
                        };

//the start of the team building happens on the click of the button
function teamBuildClicked(){
    document.querySelector("#loadstatus").innerHTML = "Loading...";
    const TYPE_URL = "https://pokeapi.co/api/v2/type/";

    let url = TYPE_URL;
    url += document.querySelector("#type1").value;

    getData(url);
}

//recieves the data from the click event (type and the api url) and creates the XMLHttpRequest
function getData(url){
    let xhr = new XMLHttpRequest;
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET",url);
    xhr.send();
}

//sends the reply from the API to a parsing function
function dataLoaded(e){
    let xhr = e.target;
    //console.log(xhr.responseText);
    parser(xhr.responseText);
}
//lets me know if i screwed up
function dataError(e){
    console.log("An error occurred. ");
}

//parses the pokemon names and starts the process for grabbing the photos
function parser(xhrreply){
    
    let obj = JSON.parse(xhrreply);
    
    let pokelist = obj.pokemon;
    for(let i = 0; i < 6; i++){
        let rando = randoNumbo(pokelist.length); //gets random pokemon from the type that the user selected
        let poke = pokelist[rando];
        pokemonarray[i] = poke.pokemon.name;
        if(document.querySelector("#images").checked){
            //if user wants images, we get the images
            let pokeurl = "https://pokeapi.co/api/v2/pokemon/" + poke.pokemon.name;
            pokeimagereply = new XMLHttpRequest();
            pokeimagereply.onload = imageHandler;
            pokeimagereply.onerror = dataError;
            pokeimagereply.open("GET", pokeurl, false); //i run this on the main thread because otherwise the pokeapi doesn't reply in time for the images to load
            pokeimagereply.send();
        }
    }
    htmlBuilder();
}
//builds the HTML
function htmlBuilder(){
    for(i = 0; i < 6; i++){
        pokename = pokemonarray[i];
        pokeimage = pokeimg[i];
        if(document.querySelector("#images").checked){
            document.querySelector("#teamslot" + (i+1).toString()).innerHTML = "<img src=\"" + pokeimage + "\"><br>" + pokename.replace('-',' ');
        }
        else{
            document.querySelector("#teamslot" + (i+1).toString()).innerHTML = pokename.replace('-',' ');
        }
        if(document.querySelector("#save").checked){window.localStorage.setItem("lastteam",document.querySelector("#teamcontainer").innerHTML);}
        else if (!document.querySelector("#save").checked){window.localStorage.removeItem("lastteam");}
    }
    //clears the image array so that the next set can be loaded
    pokeimg = [];
    document.querySelector("#loadstatus").innerHTML = "Loaded!";
}
//handles the sending of the image JSON and then commits cleanup
function imageHandler(e){
    let obj = (JSON.parse(e.target.responseText));
    pokeimg.push(obj.sprites.front_default);
}

//returns a random number
function randoNumbo(lengthoflist){
    return Math.floor(Math.random() * lengthoflist);
}

