componentWillMount = () => {
    this.fetchMovies();
}

fetchMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=2bab431d7046e085703aa9d9630eee95', {
        method: 'GET'
    })
        .then((response) => response.json({message:response}))
        .catch((err) => console.log(err))
}