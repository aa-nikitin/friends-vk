import React from 'react';

const Friend = ({ firstName, lastName, city = {}, aaa }) => {
    // console.log(city.title);
    return (
        <div onClick={() => aaa(`${city.title}`)}>
            {firstName} {lastName}
        </div>
    );
};

export default Friend;
