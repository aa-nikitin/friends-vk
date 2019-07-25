import React from 'react';
import { FriendsMap } from './index';
import { mount } from 'enzyme';
import { fetchFriendsRequest } from '../../modules/friends/actions';
import {
    friends,
    cities
} from '../../modules/friends/testsFriend/constants.js';

const wrapper = mount(
    <FriendsMap
        cities={cities}
        friends={friends}
        error={null}
        isLoading={false}
        fetchFriendsRequest={fetchFriendsRequest}
    />
);

describe('friendsMap test', () => {
    it('change the value state.search when changing the input value', () => {
        const searchInput = 'test search';

        wrapper.find('input[name="search-friends"]').simulate('change', {
            target: { name: 'search-friends', value: searchInput }
        });

        expect(wrapper.state().search).toEqual(searchInput);
    });
    it('test handleClickFriend', () => {
        const centerMap = [50, 50];

        wrapper.instance().handleClickFriend(centerMap);
        expect(wrapper.state().mapData.center).toEqual(centerMap);
    });
    it('test handleClickPointMap', () => {
        const cityMap = 'Тула';

        wrapper.instance().handleClickPointMap(cityMap);
        wrapper.state().friends.forEach(friend => {
            expect(friend.city).toEqual(cityMap);
        });
    });
    it('test allFriends', () => {
        wrapper.instance().allFriends(friends, true);
        expect(wrapper.state().friends.length).toEqual(3);
        expect(wrapper.instance().allFriends(friends, false).length).toEqual(3);
    });
    it('test findFriends', () => {
        const searchInput = 'иванов';

        wrapper.find('input[name="search-friends"]').simulate('change', {
            target: { name: 'search-friends', value: searchInput }
        });
        wrapper.instance().findFriends({ key: 'Enter' });
        expect(wrapper.state().search).toEqual('');
        expect(wrapper.state().friends[0].id).toEqual(3185397);
    });
});
