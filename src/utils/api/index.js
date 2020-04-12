import bridge from '@vkontakte/vk-bridge';


const getUser = async () => {

    const t = await bridge.send("VKWebAppGetAuthToken", {});

    console.log('VKWebAppGetFriends', t);
};

export {
	getUser,
}