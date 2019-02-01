import React from 'react';
import Radium from 'radium';
import { Table, Button, Container } from 'reactstrap';

var styles = {
    mainBody: {
        height:'100%',
        width:'100vw',
        fontFamily:"'Open Sans', sans-serif"
    },
    table: {
        backgroundColor:'#EFEFEF',
        padding:'2vh',
        margin:'2vh 10vw',
        borderRadius:'0.25vh',
    },
    update: {
        border:'none',
        textTransform:'uppercase',
        color:'#FFFFFF',
        backgroundColor:'#F6BF49',
        cursor:'pointer'
    },
    delete: {
        border:'none',
        textTransform:'uppercase',
        color:'#FFFFFF',
        backgroundColor:'#F37E45',
        cursor:'pointer'
    },
    buttonRow: {
        textAlign:'right'
    },
    title: {
        color:'#344167',
        fontFamily:"'Monoton', sans-serif",
        fontSize:'3rem',
        textAlign:'center',
        paddingBottom:'1rem'
    }
}

const MovieTable = (props) => {
    return(
        <div style={styles.mainBody}>
            <Container style={styles.table}>
                <h2 style={styles.title}>My Movies</h2>
                <Table hover responsive>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Comment</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.movies.map((movie,id) => {
                                return(
                                    <tr key={id}>
                                        <td>{movie.title}</td>
                                        <td>{movie.comment}</td>
                                        <td style={styles.buttonRow}>
                                            <Button id={movie.id} onClick={e => props.update(e, movie)} style={styles.update}>Update</Button>{' '}
                                            <Button id={movie.id} onClick={props.delete} style={styles.delete}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Radium(MovieTable);