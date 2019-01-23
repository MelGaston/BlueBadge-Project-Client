import React from 'react';
import { Table, Button } from 'reactstrap';

const MovieTable = (props) => {
    return(
        <div>
            <h3>Movie Log</h3>
            <hr/>
            <Table striped>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Comment</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.movies.mao((movie,id) => {
                            return(
                                <tr>
                                    <td>{movie.title}</td>
                                    <td>{movie.description}</td>
                                    <td>{movie.comment}</td>
                                    <td>
                                        <Button id={movie.id} onClick={props.delete}>Delete</Button>
                                        <Button id={movie.id} onClick={e=>props.update(e,movie)}>Edit Comment</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default MovieTable;