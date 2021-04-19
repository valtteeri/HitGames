function generateGames() {
    let GameList = document.querySelector(".Gamecontainer");
    for (let i=0; i < 5; i++) {
        document.querySelector(".Gamecontainer").innerHTML += `
            <div class = "aGame">
                <div class = "GameLogo">
                    <img src="gamelogo.png" width="125px">
                </div>
                <div class = "Gametitle">
                    Game Title
                </div>
                <div class = "GameDescription">
                    Describe <br> game <br> here
                </div>
                <div class= "GameRating">
                    ★★★☆☆ <br>
                    <button class= "PlayButton"> Play </button>
                </div>
            </div>
            <hr>`
    }

}

generateGames();