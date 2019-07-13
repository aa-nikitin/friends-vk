import React from 'react';
import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';
import PropTypes from 'prop-types';
import './style.css';

const YandexMap = ({ mapData, cities, handleClickPointMap }) => {
    return (
        <div className="yandex-map">
            <YMaps>
                <Map width="100%" height="100vh" state={mapData}>
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
                                            handleClickPointMap(city)
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
        </div>
    );
};

YandexMap.propTypes = {
    mapData: PropTypes.object,
    cities: PropTypes.array,
    handleClickPointMap: PropTypes.func
};
YandexMap.defaultProps = {
    mapData: {},
    cities: [],
    handleClickPointMap: () => {}
};

export default YandexMap;
