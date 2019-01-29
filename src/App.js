import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import TeamList from './components/TeamList';

import teams from './data/teams.json';

import './App.css';

const teamsS = teams.filter(t => t.id <= 4);
const teamsA = teams.filter(t => t.id > 4 && t.id <= 7);
const teamsB = teams.filter(t => t.id > 7 && t.id <= 10);
const teamsC = teams.filter(t => t.id > 10 && t.id <= 13);
const teamsD = teams.filter(t => t.id > 13 && t.id <= 16);
const teamsF = teams.filter(t => t.id > 16);

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const reorderRankings = ({ rankings, source, destination }) => {
    const current = [...rankings[source.droppableId].teams];
    const next = [...rankings[destination.droppableId].teams];
    const target = current[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current, source.index, destination.index);

        const result = {
            ...rankings,
            [source.droppableId]: {
                ...rankings[source.droppableId],
                teams: reordered,
            },
        };

        return {
            rankings: result,
        };
    }

    // moving to different list

    // remove from original
    current.splice(source.index, 1);
    // insert into next
    next.splice(destination.index, 0, target);

    const result = {
        ...rankings,
        [source.droppableId]: {
            ...rankings[source.droppableId],
            teams: current,
        },
        [destination.droppableId]: {
            ...rankings[destination.droppableId],
            teams: next,
        },
    };

    return {
        rankings: result,
    };
};

class App extends Component {
    state = {
        rankings: {
            tierS: {
                teams: teamsS,
                ranking: { label: 'Tier S', color: '#01b0f1' },
            },
            tierA: {
                teams: teamsA,
                ranking: { label: 'Tier A', color: '#00af50' },
            },
            tierB: {
                teams: teamsB,
                ranking: { label: 'Tier B', color: '#92d14f' },
            },
            tierC: {
                teams: teamsC,
                ranking: { label: 'Tier C', color: '#fed966' },
            },
            tierD: {
                teams: teamsD,
                ranking: { label: 'Tier D', color: '#f88157' },
            },
            tierF: {
                teams: teamsF,
                ranking: { label: 'Tier F', color: '#c00000' },
            },
        },
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        this.setState(
            reorderRankings({
                rankings: this.state.rankings,
                source: result.source,
                destination: result.destination,
            }),
        );
    };

    render() {
        const { rankings } = this.state;

        return (
            <div className="app-body">
                <div className="app-content">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {Object.keys(rankings).map(key => (
                            <TeamList
                                key={key}
                                listId={key}
                                ranking={rankings[key].ranking}
                                teams={rankings[key].teams}
                            />
                        ))}
                    </DragDropContext>
                </div>
            </div>
        );
    }
}

export default App;
