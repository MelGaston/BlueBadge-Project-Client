import React from 'react';
import Radium from 'radium';
import APIUrl from '../../helpers/environment';
import MovieSearch from '../movies/MovieSearch';
import MovieTable from '../movies/MovieTable';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import MovieEdit from '../movies/MovieEdit';

var styles = {
    tabNav: {
        paddingLeft:'10vw',
        margin:'5vh 0',
        borderBottom:'none'
    },
    tab: {
        borderRadius:'0.25rem',
        marginRight:'2.5vw',
        textTransform:'uppercase',
        backgroundColor:'#EFEFEF',
        cursor:'pointer',

        ':active': {
            backgroundColor:'#336699'
        }
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            movies:[],
            movieToUpdate: {}
        };
        this.toggle = this.toggle.bind(this);
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    fetchMovies = () => {
        fetch(`${APIUrl}/api/movie`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(res => res.json())
        .then(movieData => {
            return this.setState({ movies: movieData })
        })
        .catch(err => console.log(err))
    }

    movieUpdate = (event, movie) => {
        fetch(`${APIUrl}/api/movie/${movie.id}`, {
          method: 'PUT',
          body: JSON.stringify({ movie: {
            comment:movie.comment
            }
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => {
          this.setState({ updatePressed: false })
          this.fetchMovies();
        })
        .catch(err => console.log(err))
    }
    
    setUpdatedMovie = (event, movie) => {
        this.setState({
            movieToUpdate: movie,
            updatePressed: true
        })
    }
    
    movieDelete = (event) => {
        fetch(`${APIUrl}/api/movie/${event.target.id}`, {
          method: 'DELETE',
          body: JSON.stringify({ movie: {
            title:this.state.title,
            comment:this.state.comment
            }
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
          })
        })
        .then((res) => this.fetchMovies())
    }
    
    render(){
        return(
            <div>
                <Nav tabs style={styles.tabNav}>
                    <NavItem>
                        <NavLink style={styles.tab} className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>Search</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={styles.tab} className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); this.fetchMovies(); 
                    }}>My Movies</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <MovieSearch token={this.props.token}/>
                    </TabPane>
                    <TabPane tabId="2">
                        <MovieTable movies={this.state.movies} token={this.props.token} delete={this.movieDelete} update={this.setUpdatedMovie}/>
                        {
                            this.state.updatePressed ? <MovieEdit t={this.state.updatePressed} update={this.movieUpdate} movie={this.state.movieToUpdate}/>
                            : <div></div>
                        }
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

export default Radium(Main);