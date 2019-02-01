import React from 'react';
import Radium from 'radium';

var styles = {
    spinner: {
        height:'5rem',
        width:'5rem'
    },
    spinBox: {
        position:'fixed',
        top:'40%',
        left:'46%'
    }
}

const Spinner = () => {
    return(
        <div style={styles.spinBox}>
            <Spinner color="light" style={styles.spinner} />
        </div>
    )
}

export default Radium(Spinner);