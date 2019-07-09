import React, { Component } from 'react';
import { connect } from 'react-redux';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { fetchFriendsRequest } from '../../actions';
import Friend from '../../components/Friend';
import { getSeriesImages } from '../../selectors';
import './style.css';

// const mapData = {
//     center: [55.751574, 37.573856],
//     zoom: 5
// };

const coordinates = [[55.684758, 37.738521], [57.684758, 39.738521]];

class Friends extends Component {
    state = {
        mapData: {
            center: [55.751574, 37.573856],
            zoom: 5
        }
    };
    aaa = www => {
        const { mapData } = this.state;
        console.log(www);
        this.setState({ mapData: { ...mapData, zoom: mapData.zoom + 1 } });
    };
    componentDidMount() {
        const { fetchFriendsRequest } = this.props;
        fetchFriendsRequest();
    }
    render() {
        const { friends, isLoading, error, friends2 } = this.props;
        const { mapData } = this.state;

        console.log(friends);

        if (isLoading) return <div>Данные загружаются...</div>;
        if (error) return <div>{error}</div>;
        // console.log(friends, isLoading, error);

        // geocode().then(series => {
        //     console.log(series.my_function);
        // });

        // console.log(friends);
        return (
            <div>
                <h1>Friends</h1>
                <YMaps>
                    <Map state={mapData}>
                        {coordinates.map((coordinate, i) => (
                            <Placemark
                                key={i}
                                onClick={() => {
                                    console.log(coordinate);
                                }}
                                geometry={coordinate}
                            />
                        ))}
                    </Map>
                </YMaps>
                {friends.map(item => (
                    <Friend
                        key={item.id}
                        firstName={item.first_name}
                        lastName={item.last_name}
                        city={item.city}
                        aaa={this.aaa}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        friends: state.friends.friends,
        friends2: getSeriesImages(state),
        isLoading: state.friends.isLoading,
        error: state.friends.error
    };
};

export default connect(
    mapStateToProps,
    { fetchFriendsRequest }
)(Friends);
