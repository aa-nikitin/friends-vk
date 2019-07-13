import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const AllFriends = ({ friends, allFriends }) => {
    return (
        <div className="all-friends" onClick={() => allFriends(friends, true)}>
            <i className="fas fa-users all-friends__icon" />
            Показать всех друзей
        </div>
    );
};

AllFriends.propTypes = {
    friends: PropTypes.array,
    allFriends: PropTypes.func
};

AllFriends.defaultProps = { friends: [], allFriends: () => {} };

export default AllFriends;
