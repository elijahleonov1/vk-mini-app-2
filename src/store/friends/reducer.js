import {
	FETCHED_FRIENDS_VK,
	FETCHED_FRIENDS_DB
} from './actionType';

const initialState = {
	vk: {},
	db: {},
};


export default function friends (state = initialState, action = {}) {
	switch (action.type) {
		case FETCHED_FRIENDS_VK:
			return {
				...state,
				vk: {
					[action.payload.userId]: { ...action.payload },
				},
				
			};
		case FETCHED_FRIENDS_DB:
			return {
				...state,
				db: {
					[action.payload.userId]: { ...action.payload },
				},
			};
		default:
			return state;
	};
};

export const getVKFriends = (state) => state.friends.vk;
export const getDBFriends = (state) => state.friends.db;