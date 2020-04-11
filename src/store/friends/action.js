import API from 'API';
import {
	FETCHED_FRIENDS_VK,
	FETCHED_FRIENDS_DB,
} from './actionType';

export const fetchedFriends = (userId) => {
	return async (dispatch) => {
		const {response} = await API.vk.getFriends({ userId });
		dispatch({ type: FETCHED_FRIENDS_VK, payload: {userId, ...response} });
	};
};