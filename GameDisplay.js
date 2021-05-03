let testgames = [
    {
        name: 'Catcher',
        image: 'pictures/CatcherSmall.png',
        description: 'You catch falling balls',
        rating: '3.0',
        popularity: '324'
    },
    {
        name: 'Worlds hardest (random) game',
        image: 'pictures/whrgSmall.png',
        description: 'Play and find out how hard it is',
        rating: '2.4',
        popularity: '528'
    },
    {
        name: 'Minesweeper',
        image: 'pictures/MineSweeperSmall.png',
        description: 'Game where you find bombs',
        rating: '3.1',
        popularity: '86'
    },
    {
        name: 'BrickBreaker',
        image: 'pictures/BrickBreakerSmall.png',
        description: 'Break blocks with the ball',
        rating: '3.3',
        popularity: '80'
    }
]

function generateGames() {
    let GameList = document.querySelector(".Gamecontainer");
    Object.values(testgames).map(game => {
        GameList.innerHTML += `
        <div class = "aGame">
            <div class = "GameLogo">
            <a href="${game.name}.html"><img src="${game.image}" width="60px"></a>
            </div>
            <div class = "Gametitle">
            <a href="${game.name}.html"> ${game.name} </a>
            </div>
            <div class = "GameDescription">
                ${game.description}
            </div>
            <div class= "GameRating">
                 ${game.rating} <i class="fas fa-star"></i> <br>
                <a href="${game.name}.html" class= "PlayButton"> Play </a>
            </div>
        </div>
        <hr>`;
    });
    // for (let i=0; i < testgames.length; i++) {
    //     GameList.innerHTML += `
    //         <div class = "aGame">
    //             <div class = "GameLogo">
    //                 <img src="gamelogo.png" width="125px">
    //             </div>
    //             <div class = "Gametitle">
    //                 Game Title
    //             </div>
    //             <div class = "GameDescription">
    //                 Describe <br> game <br> here
    //             </div>
    //             <div class= "GameRating">
    //                 ★★★☆☆ <br>
    //                 <button class= "PlayButton"> Play </button>
    //             </div>
    //         </div>
    //         <hr>`
    // }

}

generateGames();