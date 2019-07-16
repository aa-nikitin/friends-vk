import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriendsRequest } from '../../modules/friends';
import AllFriends from '../../components/AllFriends';
import Friends from '../../components/Friends';
import YandexMap from '../../components/YandexMap';
import Search from '../../components/Search';
import {
    getFriends,
    getCities,
    getIsLoading,
    getError
} from '../../modules/friends';
import './style.css';

class FriendsMap extends Component {
    state = {
        mapData: {
            center: [55.751574, 37.573856],
            zoom: 7,
            behaviors: ['default', 'scrollZoom']
        },
        search: '',
        friends: []
    };
    handleClickFriend = coords => {
        if (coords) {
            const { mapData } = this.state;

            this.setState({
                mapData: { ...mapData, center: coords },
                search: ''
            });
        }
    };

    handleClickPointMap = city => {
        const { cities } = this.props;
        const friendsInCity = cities.filter(item => {
            return item.name === city;
        });

        this.setState({ friends: friendsInCity[0].friends, search: '' });
    };

    allFriends = (friends, isState = false) => {
        const friendsValid = friends.filter(item => {
            return item.city;
        });
        if (isState) {
            this.setState({
                friends: friendsValid
            });
        } else {
            return friendsValid;
        }
    };

    findFriends = ({ key }) => {
        const { search } = this.state;
        const { friends } = this.props;
        if (!key || key === 'Enter') {
            const friendsValid = friends.filter(item => {
                const nameFriend = `${item.first_name} ${
                    item.last_name
                }`.toLowerCase();

                return item.city && nameFriend.indexOf(search) >= 0;
            });
            this.setState({
                friends: friendsValid,
                search: ''
            });
        }
    };

    changeSearch = ({ target: { value } }) => {
        this.setState({ search: value });
    };

    componentDidMount() {
        const { fetchFriendsRequest } = this.props;
        fetchFriendsRequest();
    }
    render() {
        const { cities, isLoading, error, friends } = this.props;
        const { mapData, friends: friendsState, search } = this.state;
        const friendArr = !friendsState.length
            ? this.allFriends(friends)
            : friendsState;

        if (isLoading) return <div>Данные загружаются...</div>;
        if (error) return <div>{error}</div>;
        // console.log(search);
        return (
            <div className="friends-map">
                <div className="friends-map__left">
                    <YandexMap
                        mapData={mapData}
                        cities={cities}
                        handleClickPointMap={this.handleClickPointMap}
                    />
                </div>
                <div className="friends-map__right">
                    <AllFriends
                        friends={friends}
                        allFriends={this.allFriends}
                    />
                    <Search
                        value={search}
                        changeSearch={this.changeSearch}
                        findFriends={this.findFriends}
                    />
                    <Friends
                        friends={friendArr}
                        handleClickFriend={this.handleClickFriend}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friends: getFriends(state),
        cities: getCities(state),
        isLoading: getIsLoading(state),
        error: getError(state)
    };
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest }
)(FriendsMap);
