import React from 'react';
import Radium from 'radium';
import APIUrl from '../../helpers/environment';
import { Modal, ModalHeader, ModalBody, Button, Form, Label, Input} from 'reactstrap';

var styles = {
    movieButton:{
        backgroundColor:'#F37E45',
        border:'none',
        fontSize:'1.25rem',
        padding:' 0.5rem 1rem'
    },
}

class MovieAdd extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie_id:'',
            owner_id: '',
            title:'',
            comment:'',
            modal:false
        }
        this.toggle = this.toggle.bind(this);
    }
    
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    componentDidMount() {
        this.setState({
            movie_id:this.props.movie_id,
            title:this.props.title
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.props.token)
        fetch(`${APIUrl}/api/movie`, {
            method: 'POST',
            body: JSON.stringify({movie: {
                movie_id:this.state.movie_id,
                title:this.state.title,
                comment:this.state.comment
            }}),
            headers: new Headers({
                'Content-Type':'application/json',
                'Authorization':this.props.token
            })
        })
            .then((res) => res.json())
            .then((movieData) => {
                this.setState({
                    movie_id:'',
                    owner_id: '',
                    title:'',
                    comment:''
                })
                this.toggle();
            })
            .catch((err) => console.log(err))
    }

    render() {
        return(
            <div>
                <Button onClick={this.toggle} style={styles.movieButton}>+ Add To My List</Button>
                <Modal isOpen={this.state.modal}>
                    <ModalHeader toggle={this.toggle}>Add {this.state.title} To My List</ModalHeader>
                    <ModalBody>
                        <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
                            <Label for="comment">Add Comments:</Label>
                            <Input type="textarea" name="comment" id="comment" placeholder="Everyone's a critic." maxLength="255"/>
                            <Input type="submit" value="+ Add To My List"/>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Radium(MovieAdd);