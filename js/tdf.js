class playerObj {
    constructor(playerid, first, last, dob) {
        this.playerid = playerid;
        this.first = first;
        this.last = last;
        this.dob = dob;
    }
}

let playersArr = [];


window.onload = () =>{
    const processBtn = document.querySelector('#process-btn');
    processBtn.addEventListener("click", () => {
        const filePicker = document.getElementById("selected_tdf");
        if (!filePicker.files[0]) {
            alert("Please select a file.");
        }
        else {
            const urlObj = window.URL.createObjectURL(filePicker.files[0]);
            processTDF(urlObj);
        }
    });
}

window.removePlayer = removePlayer;


function processTDF(urlObj) {
    playersArr = [];
    fetch(urlObj.toString())
        .then((response) => response.text())
        .then((text) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/xml");
            const players = doc.querySelector('players').children;
            for (let i = 0; i < players.length; i++) {
                // console.log(players[i].getAttribute('userid'));
                // console.log(players[i].children[0].textContent);
                // console.log(players[i].children[1].textContent);
                let dob = new Date(players[i].children[2].textContent);
                // console.log(dob.getFullYear());
                let currentPlayer = new playerObj(players[i].getAttribute('userid'), players[i].children[0].textContent, players[i].children[1].textContent, dob.getFullYear());

                playersArr.push(currentPlayer);
            }
        })
        .then(() => {
            displayTDF();
        });
}


function removePlayer(index){
    playersArr.splice(index, 1);
    displayTDF();
}

function displayTDF() {
    const playerTable = document.querySelector('#players');
    playerTable.innerHTML = `<tr>
                <th>Player ID</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Year of Birth</th>
                <th>Remove from list</th>
            </tr>`;
    playersArr.forEach((player, index) => {
        playerTable.innerHTML += `<tr><td>${player.playerid}</td><td>${player.first}</td><td>${player.last}</td><td>${player.dob}</td><td><button type="button" onclick="removePlayer(${index})">Remove</button></td></tr>`;
    })
}
