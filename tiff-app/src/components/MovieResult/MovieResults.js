import React from 'react';
import PropTypes from 'prop-types';

const MovieResults = ({ movie, onClick }) => {
    return (
        <div>
            <button onClick={onClick}>{movie.title}</button>
        </div>
    )
}

MovieResults.propTypes = {
    movie: PropTypes.object.isRequired
}

export default MovieResults
