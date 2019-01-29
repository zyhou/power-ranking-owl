import React from 'react';

import './TeamItem.css';

const TeamItem = ({ team, isDragging, isGroupedOver, provided }) => (
    <a
        href={`${process.env.PUBLIC_URL}/teams/${team.image}`}
        isdragging={isDragging.toString()}
        isgroupedover={isGroupedOver}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        <div>
            <img
                src={`${process.env.PUBLIC_URL}/teams/${team.image}`}
                alt={team.label}
                className="teamitem-image"
            />
        </div>
    </a>
);

export default TeamItem;
