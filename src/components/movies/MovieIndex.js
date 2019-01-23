import React from 'react';
import MovieTable from './MovieTable';
import { Container, Row, Col } from 'reactstrap';


class MovieIndex extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          sessionToken:'',
          search:'',
          movie_id:'',
          title:'',
          description:'',
          poster:''
        }
      }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    
    getImage = (event) => {
        event.preventDefault();
        this.setState({
            search:'',
            movie_id:'',
            title:'',
            description:'',
            poster:''
        })
        let url="https://api.themoviedb.org/3/search/movie?api_key=2bab431d7046e085703aa9d9630eee95&query="+this.state.search;
        fetch(url, {
            method:"GET"
        })
            .then((response) => response.json())
            .then(json => {
                if(json.results[0].poster_path !== undefined) {
                    let imageURL = "https://image.tmdb.org/t/p/w500/" + json.results[0].poster_path;
                    let movieID = json.results[0].id;
                    let movieTitle = json.results[0].title;
                    let movieDescription = json.results[0].overview;
                    // let img = document.createElement("img");
                    // img.setAttribute("src", imageURL);
                    // this.setState({movie_id:movieID,title:movieTitle,description:movieDescription,poster:imageURL});
                    // document.getElementById('placeholder').appendChild(img);
                } else {
                    let tryAgain = document.createElement("p");
                    var text = document.createTextNode("Sorry, the search you just tried didn't work. Try again!");
                    tryAgain.appendChild(text);
                    document.getElementById("placeholder").appendChild(tryAgain);
                }
          })
          document.getElementById("placeholder").innerHTML = "";
      }

    render() {
        return(
            <Container>
                <label htmlFor="search">Search a Movie</label>
                <form onSubmit={this.getImage}>
                    <input type="text" id="search" onChange={this.handleChange} value={this.state.search}/>
                    <input type="submit" value="Search"/>
                </form>
                <div id="placeholder"></div>
            </Container>
        )
    }
}

export default MovieIndex