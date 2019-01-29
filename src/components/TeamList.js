import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import TeamItem from "./TeamItem";

class InnerTeamList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.quotes !== this.props.teams;
  }

  render() {
    return this.props.teams.map((team, index) => (
      <Draggable key={team.id} draggableId={team.id} index={index}>
        {(dragProvided, dragSnapshot) => (
          <TeamItem
            key={team.id}
            team={team}
            isDragging={dragSnapshot.isDragging}
            isGroupedOver={dragSnapshot.combineTargetFor}
            provided={dragProvided}
          />
        )}
      </Draggable>
    ));
  }
}

const InnerList = ({ teams, dropProvided }) => (
  <div>
    <div ref={dropProvided.innerRef}>
      <InnerTeamList teams={teams} />
      {dropProvided.placeholder}
    </div>
  </div>
);

const TeamList = ({ listId, listType, teams }) => (
  <Droppable droppableId={listId} type={listType}>
    {dropProvided => (
      <div>
        <InnerList teams={teams} dropProvided={dropProvided} />
      </div>
    )}
  </Droppable>
);

export default TeamList;
