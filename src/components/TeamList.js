import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import TeamItem from './TeamItem';

import './TeamList.css';

class InnerTeamList extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.teams !== this.props.teams;
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

const TeamList = ({ listId, ranking, teams }) => (
    <div className="teamlist-content">
        <div
            className="teamlist-ranking"
            style={{ borderRightColor: ranking.color }}
        >
            {ranking.label}
        </div>
        <Droppable droppableId={listId} type="CARD">
            {dropProvided => (
                <div ref={dropProvided.innerRef} className="teamlist-team">
                    <InnerTeamList teams={teams} />
                    {dropProvided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

export default TeamList;
