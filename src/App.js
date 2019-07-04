import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriendsRequest } from './actions';
import './App.css';

class App extends Component {
    componentDidMount() {
        const { fetchFriendsRequest } = this.props;
        fetchFriendsRequest('as');
    }
    render() {
        const { friends } = this.props;
        console.log(friends);
        return <div>sdf</div>;
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friends
    };
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest }
)(App);
