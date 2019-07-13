import React from 'react';
import PropTypes from 'prop-types';

const Menu = ({ friends, allFriends }) => {
    return (
        <div className="menu" onClick={() => allFriends(friends, true)}>
            <i className="fas fa-users menu-item__button" />
            Показать всех друзей
        </div>
    );
};

Menu.propTypes = {
    friends: PropTypes.array,
    allFriends: PropTypes.func
};

Menu.defaultProps = { friends: [], allFriends: () => {} };

export default Menu;
