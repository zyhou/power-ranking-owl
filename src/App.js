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
                ranking: { label: 'Tier S', color: 'aqua' },
            },
            tierA: {
                teams: teamsA,
                ranking: { label: 'Tier A', color: 'green' },
            },
            tierB: {
                teams: [],
                ranking: { label: 'Tier B', color: 'lightgreen' },
            },
            tierC: {
                teams: [],
                ranking: { label: 'Tier C', color: 'yellow' },
            },
            tierD: {
                teams: [],
                ranking: { label: 'Tier D', color: 'rosybrown' },
            },
            tierF: {
                teams: [],
                ranking: { label: 'Tier F', color: 'red' },
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
