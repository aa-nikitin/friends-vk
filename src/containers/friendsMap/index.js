import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';
import { fetchFriendsRequest } from '../../actions';
import Friends from '../../components/Friends';
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
        console.log(coords);
        if (coords) {
            const { mapData } = this.state;

            this.setState({
                mapData: { ...mapData, center: coords }
            });
        }
    };

    handleClickPointMap = city => {
        console.log(city);
        const { cities } = this.props;
        const friendsInCity = cities.filter(item => {
            return item.name === city;
        });

        this.setState({ friends: friendsInCity[0].friends });
    };

    allFriends = friends => {
        const friendsValid = friends.filter(item => {
            return item.city;
        });

        return friendsValid;
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
        console.log(friends.length);
        if (isLoading) return <div>Данные загружаются...</div>;
        if (error) return <div>{error}</div>;

        return (
            <div>
                <YMaps>
                    <Map width="100%" height="70vh" state={mapData}>
                        <Clusterer
                            options={{
                                preset: 'islands#invertedVioletClusterIcons',
                                groupByCoordinates: false,
                                // clusterDisableClickZoom: true,
                                clusterHideIconOnBalloonOpen: false,
                                geoObjectHideIconOnBalloonOpen: false
                                // maxZoom: 10
                            }}
                        >
                            {cities.map(
                                ({ id, pointCity, name: city, friends }) => {
                                    return (
                                        <Placemark
                                            options={{
                                                preset:
                                                    'islands#violetCircleDotIcon'
                                            }}
                                            modules={[
                                                'geoObject.addon.balloon',
                                                'geoObject.addon.hint'
                                            ]}
                                            key={id}
                                            onClick={() =>
                                                this.handleClickPointMap(city)
                                            }
                                            properties={{
                                                hintContent: `г. <b>${city}</b> (друзей - <b>${
                                                    friends.length
                                                }</b>)`
                                            }}
                                            geometry={pointCity}
                                        />
                                    );
                                }
                            )}
                        </Clusterer>
                    </Map>
                </YMaps>
                <Friends
                    friends={friendArr}
                    handleClickFriend={this.handleClickFriend}
                />
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
