import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Search = ({ value, changeSearch, findFriends }) => {
    return (
        <div className="search">
            <input
                onChange={changeSearch}
                onKeyPress={findFriends}
                className="search__item"
                value={value}
                name="search-friends"
            />
        </div>
    );
};

Search.propTypes = {
    changeSearch: PropTypes.func,
    findFriends: PropTypes.func,
    value: PropTypes.string
};

Search.defaultProps = {
    changeSearch: () => {},
    findFriends: () => {},
    value: ''
};

export default Search;
