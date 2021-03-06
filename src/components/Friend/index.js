import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Friend = ({
    id,
    firstName,
    lastName,
    city,
    pointCity,
    handleClickFriend
}) => {
    return (
        <div className="friends-item">
            <a
                className="friends-item__link"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://vk.com/id${id}`}
            >
                <i className="fas fa-link friends-item__icon" />
            </a>
            <div className="friends-item__name">
                <span
                    className="friends-item__fio"
                    onClick={() => handleClickFriend(pointCity)}
                >
                    {firstName} {lastName}
                </span>
                {city && <span className="friends-item__city">({city})</span>}
            </div>
        </div>
    );
};

Friend.propTypes = {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    city: PropTypes.string,
    handleClickFriend: PropTypes.func,
    pointCity: PropTypes.array
};

Friend.exportDefault = {
    id: 0,
    firstName: '',
    lastName: '',
    city: '',
    handleClickFriend: () => {},
    pointCity: []
};

export default Friend;
