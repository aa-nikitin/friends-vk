import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriendsRequest } from '../../actions';
import Menu from '../../components/Menu';
import Friends from '../../components/Friends';
import YandexMap from '../../components/YandexMap';
import { getSeriesImages } from '../../selectors';
import './style.css';

// const mapData = {
//     center: [55.751574, 37.573856],
//     zoom: 5
// };

class FriendsMap extends Component {
    state = {
        mapData: {
            center: [55.751574, 37.573856],
            zoom: 7,
            behaviors: ['default', 'scrollZoom']
        },
        friends: []
    };
    handleClickFriend = coords => {
        if (coords) {
            const { mapData } = this.state;

            this.setState({
                mapData: { ...mapData, center: coords }
            });
        }
    };

    handleClickPointMap = city => {
        const { cities } = this.props;
        const friendsInCity = cities.filter(item => {
            return item.name === city;
        });

        this.setState({ friends: friendsInCity[0].friends });
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

    componentDidMount() {
        const { fetchFriendsRequest } = this.props;
        fetchFriendsRequest();
    }
    render() {
        const { cities, isLoading, error, friends } = this.props;
        const { mapData, friends: friendsState } = this.state;
        const friendArr = !friendsState.length
            ? this.allFriends(friends)
            : friendsState;
        // console.log(friends.length);
        if (isLoading) return <div>Данные загружаются...</div>;
        if (error) return <div>{error}</div>;

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
                    <Menu friends={friends} allFriends={this.allFriends} />
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
        friends: getSeriesImages(state),
        cities: state.friends.cities,
        isLoading: state.friends.isLoading,
        error: state.friends.error
    };
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest }
)(FriendsMap);
