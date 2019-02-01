import React from 'react';
import { Form, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class MovieEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            movie_id:'',
            title:'',
            comment:'',
        }
    }

    componentDidMount() {
        this.setState({
            id:this.props.movie.id,
            movie_id:this.props.movie.movie_id,
            title:this.props.movie.title,
            comment:this.props.movie.comment
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.update(event, this.state)
    }

    render() {
        return(
            <div>
                <Modal isOpen={true} >
                    <ModalHeader>Edit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                                <Label for="comment">Comment:</Label>
                                <Input type="textarea" id="comment" name="comment" value={this.state.comment} onChange={this.handleChange} placeholder="Enter your Commentary"/>
                            <Input type="submit" value="Submit"/>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default MovieEdit;