let testgames = [
    {
        name: 'Catcher',
        image: 'pictures/CatcherSmall.png',
        description: 'You catch falling balls',
        rating: '4.3',
        popularity: '324'
    },
    {
        name: 'Placeholder name',
        image: 'placeholder.png',
        description: 'game where you place bombs',
        rating: '2.4',
        popularity: '528'
    },
    {
        name: 'Placeholder name',
        image: 'placeholder.png',
        description: 'game where you find bombs',
        rating: '1.7',
        popularity: '86'
    }
]

function generateGames() {
    let GameList = document.querySelector(".Gamecontainer");
    Object.values(testgames).map(game => {
        GameList.innerHTML += `
        <div class = "aGame">
            <div class = "GameLogo">
                <img src="${game.image}" width="60px">
            </div>
            <div class = "Gametitle">
                ${game.name}
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