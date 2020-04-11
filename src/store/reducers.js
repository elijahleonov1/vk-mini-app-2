import { combineReducers } from 'redux';
import friends, * as selectFriends from './friends/reducer';

export default combineReducers({
	friends,
});

export {
	selectFriends,
};