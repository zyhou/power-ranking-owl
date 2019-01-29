import React from 'react';

import './TeamItem.css';

const TeamItem = ({ team, isDragging, isGroupedOver, provided }) => (
    <a
        isdragging={isDragging.toString()}
        isgroupedover={isGroupedOver}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        <div
            className="teamitem-content"
            style={{ backgroundColor: team.image.color }}
        >
            <img
                src={`${process.env.PUBLIC_URL}/teams/${team.image.name}`}
                alt={team.label}
                className="teamitem-image"
            />
        </div>
    </a>
);

export default TeamItem;
