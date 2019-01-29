import React from "react";

const TeamItem = ({ team, isDragging, isGroupedOver, provided }) => (
  <a
    href={team.image}
    isDragging={isDragging}
    isGroupedOver={isGroupedOver}
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <div>{team.label}</div>
  </a>
);

export default TeamItem;
