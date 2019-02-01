import React from 'react';
import Radium from 'radium';
import MovieAdd from './MovieAdd';
import Spinner from '../main/Spinner';
import { Row, Col, Form, Label, Input } from 'reactstrap';

var styles = {
    searchForm:{
        width:'60%',
        margin:'auto',
        paddingBottom:'5vh'
    },
    searchLabel: {
        display:'none'
    },
    searchButton: {
        border:'none',
        textTransform:'uppercase',
        color:'#FFFFFF',
        backgroundColor:'#F37E45',
        cursor:'pointer'
    },
    mainBody: {
        height:'100%',
        width:'100vw',
        fontFamily:"'Open Sans', sans-serif"
    },
    movieContainer: {
        backgroundColor:'#EFEFEF',
        padding:'4vh 1.5vw 4vh 0',
        margin:'2vh auto',
        borderRadius:'0.25vh',
        width:'80%'
    },
    movieImage:{
        maxWidth:'15vw',
        margin:'auto',
        display:'block'
    },
    movieTitle:{
        fontFamily:"'Open Sans', sans-serif",
        fontWeight:'bolder'
    }
}

class MovieSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            sessionToken:'',
            search:'',
            renderData:'',
            movies:[],
            loading:false
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    
    searchMovies = (event) => {
        this.setState({loading:true})
        event.preventDefault();
        let url="https://api.themoviedb.org/3/search/movie?api_key=2bab431d7046e085703aa9d9630eee95&query="+this.state.search;
        if(this.state.search !== ''){
            fetch(url, {
                method:"GET"
            })
                .then((response) => response.json())
                .then(json => {
                    this.mapData(json.results);
            })
        } else {
            this.setState({renderData:''})
        }
    }

    mapData = (data) => {
        let renderData = data.map((movie) => {
            return (
                    <Row key={movie.id} className="movie-display" style={styles.movieContainer}>
                        <Col sm="3">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={styles.movieImage} alt={movie.title}/>
                        </Col>
                        <Col sm="9">
                            <h2 style={styles.movieTitle}>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <MovieAdd title={movie.title} movie_id={movie.id} token={this.props.token}/>
                        </Col>
                    </Row>
            )
        })
        this.setState({
            renderData:renderData,
            loading:false
        })
    }
    
    render() {
        // let searched; 
        // if(this.state.loading === true) {
        //     searched = <Spinner/>
        // } else {
        //     searched = {this.state.renderData}
        // }

        return(
            <div style={styles.mainBody}>
                <Form onSubmit={this.searchMovies} style={styles.searchForm}>
                    <Row>
                        <Col sm="9">
                            <Label htmlFor="search" style={styles.searchLabel}>What movies have you seen?</Label>
                            <Input type="text" id="search" onChange={this.handleChange} value={this.state.search} placeholder="What movies have you seen?"/>
                        </Col>
                        <Col sm="3">
                            <Input type="submit" value="Search" style={styles.searchButton}/>
                        </Col>
                    </Row>
                </Form>
                {this.state.renderData}
            </div>
        )
    }
}

export default Radium(MovieSearch);