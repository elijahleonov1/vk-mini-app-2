import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Cell,
    Avatar
} from '@vkontakte/vkui';
import Icon24Done from '@vkontakte/icons/dist/24/done';

const User = ({id, name, avatarUrl, handleClick}) => {
    const [active, setActive] = useState(false);
    const _handleClick = () => {
        handleClick(id, name);
        setActive(true);
    };
    return (
        <Cell
            onClick={_handleClick}
            asideContent={active ? <Icon24Done fill="var(--accent)"/> : null}
            before={<Avatar src={avatarUrl}/>}
        >{name}</Cell>
    );
};

User.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    handleClick: PropTypes.func.isRequired,
};

export default User;