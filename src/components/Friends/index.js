import React from 'react';
import PropTypes from 'prop-types';
import Friend from '../../components/Friend';

const Friends = ({ friends, handleClickFriend }) => {
    return (
        <div>
            {friends.map(({ id, first_name, last_name, pointCity }) => (
                <Friend
                    key={id}
                    firstName={first_name}
                    lastName={last_name}
                    pointCity={pointCity}
                    handleClickFriend={handleClickFriend}
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
