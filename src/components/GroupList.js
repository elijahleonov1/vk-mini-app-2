import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Header,
    Group,
    Cell,
    List,
    Link
} from '@vkontakte/vkui';

const GroupList = ({title='', description='', data={} }) => {

    const cell = data.items ? data.items.map((item, i) => {
       return (
           <Link href={item.url_post} target="_blank" key={i}>
               <Cell
                   multiline
                   description={description}>{item.text}</Cell>
           </Link>
       );
    }) : <Cell description="Ничего не найдено"></Cell>;

    return (
        <Group
            header={<Header mode="secondary">{title}</Header>}
            description={description}>
            <List>
                {cell}
            </List>
        </Group>
    );
};

GroupList.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    data: PropTypes.object
};

export default GroupList;