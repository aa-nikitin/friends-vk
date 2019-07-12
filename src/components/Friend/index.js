import React from 'react';
import PropTypes from 'prop-types';

const Friend = ({ firstName, lastName, pointCity, handleClickFriend }) => {
    // console.log(city.title);
    return (
        <div onClick={() => handleClickFriend(pointCity)}>
            {firstName} {lastName}
        </div>
    );
};

Friend.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    handleClickFriend: PropTypes.func,
    pointCity: PropTypes.array
};

Friend.exportDefault = {
    firstName: '',
    lastName: '',
    handleClickFriend: () => {},
    pointCity: []
};

export default Friend;
