import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

import TeamList from './components/TeamList';

import { getImageByNode, reorderRankings } from './util';
import teams from './data/teams.json';
import config from './config';

import './App.css';

console.log({ env: process.env, config });

const client = axios.create({ baseURL: config.API_URL });

const teamsS = teams.filter(t => t.id <= 4);
const teamsA = teams.filter(t => t.id > 4 && t.id <= 7);
const teamsB = teams.filter(t => t.id > 7 && t.id <= 10);
const teamsC = teams.filter(t => t.id > 10 && t.id <= 13);
const teamsD = teams.filter(t => t.id > 13 && t.id <= 16);
const teamsF = teams.filter(t => t.id > 16);

class App extends Component {
    constructor(props) {
        super(props);
        this.rankingsContainer = React.createRef();
    }

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
        buttonTweet: 'Twitter',
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

    handleSaveImage = async () => {
        const blob = await getImageByNode(this.rankingsContainer.current, this.state, 'blob');
        const link = document.createElement('a');
        link.download = `power-ranking-owl.png`;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

    handleTweet = async () => {
        this.setState({ buttonTweet: 'Loading...' });
        const encodedImage = await getImageByNode(this.rankingsContainer.current, this.state, 'png');

        let response = null;
        try {
            const { data } = await client.post(config.ROUTE_URL, {
                image: encodedImage.split(',')[1],
            });
            response = data;
        } catch {
            this.setState({ buttonTweet: 'Error' });
            return;
        }

        if (!response || response.error) {
            console.log({ error: response.error });
            this.setState({ buttonTweet: 'Error' });
            return;
        }

        const text = `Power ranking Overwatch league ${encodeURIComponent(response.result.url)}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${text}`;
        console.log({ tweetUrl });
        this.setState({ buttonTweet: 'Twitter' });
    };

    render() {
        const { rankings, buttonTweet } = this.state;

        return (
            <div className="app-body">
                <nav className="app-nav">
                    <h1 className="app-title">Power ranking Overwatch League</h1>
                    <div>
                        <button className="app-export twitter" onClick={this.handleTweet}>
                            {buttonTweet}
                        </button>
                        <button className="app-export export" onClick={this.handleSaveImage}>
                            Export
                        </button>
                    </div>
                </nav>
                <div className="app-content">
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <div ref={this.rankingsContainer} style={{ padding: '10px' }}>
                            {Object.keys(rankings).map(key => (
                                <TeamList
                                    key={key}
                                    listId={key}
                                    ranking={rankings[key].ranking}
                                    teams={rankings[key].teams}
                                />
                            ))}
                        </div>
                    </DragDropContext>
                </div>
                <footer className="app-footer">
                    <a className="app-link" href="https://github.com/zyhou/power-ranking-owl/issues/new/choose">
                        send feedback
                    </a>
                    <a className="app-link" href="https://github.com/zyhou/power-ranking-owl">
                        source
                    </a>
                </footer>
            </div>
        );
    }
}

export default App;
