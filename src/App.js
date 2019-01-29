import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import TeamList from './components/TeamList';

import teams from './data/teams.json';

import './App.css';

const teamsS = teams.filter(t => t.id <= 3);
const teamsA = teams.filter(t => t.id > 3);

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
                teams: [],
                ranking: { label: 'Tier B', color: '#92d14f' },
            },
            tierC: {
                teams: [],
                ranking: { label: 'Tier C', color: '#fed966' },
            },
            tierD: {
                teams: [],
                ranking: { label: 'Tier D', color: '#f88157' },
            },
            tierF: {
                teams: [],
                ranking: { label: 'Tier F', color: '#c00000' },
            },
        },
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        console.log('onDragEnd.result', result);
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
