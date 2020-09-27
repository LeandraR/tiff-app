import React from 'react';
import PropTypes from 'prop-types';

const MovieSpecifics = ({ movie }) => {
    const { original_title: title, overview: description, genres, tagline, runtime } = movie;
    return (
        <div>
            <p style={{ fontWeight: '500'}}>{title}</p>
            <p>{description}</p>
            {genres.map((g, i) => <p key={i}>{g.name}</p>)}
            {tagline && <p>Tagline: {tagline}</p>}
            <p>Runtime: {runtime || 'Not provided'}</p>
        </div>
    );
};

MovieSpecifics.propTypes = {
    movie: PropTypes.object
};

export default MovieSpecifics;
