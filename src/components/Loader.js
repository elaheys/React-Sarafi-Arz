import React from 'react';

//Gif
import gif from '../gif/spinner.gif'

const Loader = () => {
    return (
        <div>
            <img src={gif} alt='Loading'/>
            <h1>Loading ...</h1>
        </div>
    );
};

export default Loader;