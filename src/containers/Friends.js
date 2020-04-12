import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from 'API';

import { connect } from 'react-redux';

import { selectFriends } from '@Reducers';
import { frendsActions } from '@Actions';

import User from "@Components/User";
import GroupList from "@Components/GroupList";

import {
	Avatar,
	View,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelHeaderClose,
	Root,
	Group,
	List,
	FormLayout,
	Select,
	SelectMimicry,
	Div,
	Snackbar,
	Spinner,
	Button,
	InfoRow,
	Header,
	Cell,
	Progress
} from '@vkontakte/vkui';

import Icon28ErrorOutline from '@vkontakte/icons/dist/28/error_outline';

const useUserSession = (dispatch) => {
	useEffect(() => {
		const { getUserSession } = userSessionActions;
		dispatch(getUserSession());
	}, []);
};

const useVkFriends = (userId, dispatch) => {
	useEffect(() => {
		if (userId) {
			const { vkFetchedFriends } = frendsActions;
			dispatch(vkFetchedFriends(userId));
		}
	}, [userId]);
};

const Friends = ({go, userSession, vkFriends, dispatch}) => {

	const [activeView, setActiveView] = useState('profile');
	const [friend, setFriend] = useState('');
	const [countPost, setCountPost] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const [snackbar, setSnackbar] = useState(false);
	const [isSpinner, setIsSpinner] = useState(false);
	const [likes, setLikes] = useState(null);
	const [posts, setPosts] = useState(null);

	useUserSession(dispatch);
	useVkFriends(userSession.id, dispatch);

	const handleClickFriends = (id, name) => {
		setFriend(name);
		setActiveView('profile');
	};

	let userFriends= null;
	if (vkFriends && vkFriends[userSession.id] && vkFriends[userSession.id].items) {
		userFriends = vkFriends[userSession.id].items.map(({
			first_name, last_name,
			photo_200_orig, id
		}) => {
			return (
				<User
					id={id}
					name={`${first_name} ${last_name}`}
					avatarUrl={photo_200_orig} key={id}
					handleClick={handleClickFriends}
				/>
			);
		});
	}

	const countPostOptions = () => {
		let options = [];
		for (let i = 10; i <= 100; i += 10) {
			options.push(<option value={`${i}`} key={`${i}`}>{i}</option>)
		}
		return options;
	};

	const fetchAnaliseLikes = async () => {
		if (userSession.id && countPost) {
			setDisabled(true);
			setIsSpinner(true);
			const data = await API.vk.checkForLikes({userId: userSession.id, count: countPost});

			setLikes(data.likes);
			setPosts(data.posts);

			setIsSpinner(false);
			setDisabled(false);
		} else {
			setSnackbar(
				<Snackbar
					layout="vertical"
					before={<Avatar size={24} style={{backgroundColor: 'var(--transparent)'}}>
						<Icon28ErrorOutline fill="#ff0000" width={28} height={28} />
					</Avatar>}
					onClose={() => setSnackbar(null)}
				>
					Выберете друга и глубино вложенности для проверки!
				</Snackbar>
			);
		}
	};

	return (
		<Root activeView={activeView}>
			<View activePanel="profile" id="profile">
				<Panel id="profile">
					<PanelHeader
						left={<PanelHeaderBack onClick={() => go('home')} />}
					>
						Поиск лайков
					</PanelHeader>

					<FormLayout>
						<SelectMimicry
							disabled={disabled}
							top="Выберите друга"
							placeholder="Не выбрано"
							onClick={() => setActiveView('countries' )}
						>{friend}</SelectMimicry>
					</FormLayout>

					<FormLayout>
						<Select
							disabled={disabled}
							top="Глубина анализа"
							placeholder="Не выбрано"
							value={countPost}
							onChange={(e) => setCountPost(Number(e.target.value))}
						>
							{countPostOptions()}
						</Select>
					</FormLayout>
					<Div>
						<InfoRow header="Процесс анализа может занимать продолжительное время" />
					</Div>
					<Div>
						<Button
							disabled={disabled}
							stretched
							size="xl"
							onClick={fetchAnaliseLikes}
						>
							начать проверку
						</Button>
					</Div>

					{!!Object.keys(likes || {}).length && <Div>
						<GroupList
							title='Найденные лайки'
							data={likes}
						/>
					</Div>}

					<Div>
						{isSpinner && <Spinner size="large" style={{ marginTop: 20 }} /> }
					</Div>
					<Div>
						{snackbar}
					</Div>
				</Panel>
			</View>
			<View activePanel="countries" id="countries">
				<Panel id="countries">
					<PanelHeader
						left={<PanelHeaderClose onClick={() => setActiveView('profile')} />}
					>
						Друзья
					</PanelHeader>
					{!Object.keys(vkFriends || {}).length && <Spinner size="large" style={{ marginTop: 20 }} />}
					<Group>
						<List>
							{userFriends}
						</List>
					</Group>
				</Panel>
			</View>
		</Root>
	);
};

Friends.propTypes = {
	go: PropTypes.func,
	dispatch: PropTypes.func,
	userSession: PropTypes.object,
	vkFriends: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		friends: selectFriends.getFriends(state),
	};
};

export default connect(mapStateToProps, null)(Friends);