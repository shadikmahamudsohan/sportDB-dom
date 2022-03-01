const allPlayers = () => {
    document.getElementById('player-container').textContent = "";
    document.getElementById('spinner').style.display = "block";
    const searchValue = document.getElementById('search-box').value;
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
    document.getElementById('search-box').value = '';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.player == null) {
                document.getElementById('spinner').style.display = 'block'
            } else {
                showPlayerDetails(data.player);
                document.getElementById('spinner').style.display = 'none'
            }
        })

}

const showPlayerDetails = playersData => {
    document.getElementById('spinner').style.display = "none";
    const players = playersData.slice(0, 5);
    const parent = document.getElementById('player-container');
    for (const player of players) {
        const div = document.createElement('div');

        div.innerHTML = `
                 <div class="card border border mt-3">
                    <img class="card-img-top" src="${player.strThumb}" alt="Card image" style="width:100%">
                    <div class="card-body">
                        <h4 class="card-title">${player.strPlayer}</h4>
                            <p class="card-text">cool</p>
                        <a href="#" class="btn btn-danger">Delete</a>
                        <a href="#" onclick="details('${player.idPlayer}')" class="btn btn-success">Details</a>
                    </div>
                </div>
            `
        parent.appendChild(div)
    }
}
const details = (id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => setDetails(data.players[0]));

}
const setDetails = (info) => {
    console.log(info.strGender);

    if (info.strGender === "Male") {
        document.getElementById("male").style.display = 'block';
        document.getElementById("female").style.display = 'none';
    } else {
        document.getElementById("male").style.display = 'none';
        document.getElementById("female").style.display = 'block';
    }

    document.getElementById('details-container').innerHTML = `
        <div>
            <img src="">
            <h4>Name: ${info.strPlayer}</h4>
        </div>
    `
}