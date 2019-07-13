import React from 'react';
import PropTypes from 'prop-types';
import Friend from '../../components/Friend';
import './style.css';

const Friends = ({ friends, handleClickFriend }) => {
    return (
        <div className="friends">
            {friends.map(({ id, first_name, last_name, pointCity, city }) => (
                <Friend
                    key={id}
                    id={id}
                    firstName={first_name}
                    lastName={last_name}
                    pointCity={pointCity}
                    handleClickFriend={handleClickFriend}
                    city={city}
                />
            ))}
        </div>
    );
};

Friends.propTypes = {
    friends: PropTypes.array,
    handleClickFriend: PropTypes.func
};

Friends.defaultProps = { friends: [], handleClickFriend: () => {} };

export default Friends;
