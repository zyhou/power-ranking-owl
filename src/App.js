import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";

import TeamList from "./components/TeamList";

import teams from "./data/teams.json";

import "./App.css";

class App extends Component {
  state = {
    rankings: {
      tierS: teams,
      tierA: [teams[1]],
      tierB: [],
      tierC: [],
      tierD: [],
      tierF: []
    }
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    console.log("onDragEnd.result", result);
  };

  render() {
    const { rankings } = this.state;

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {Object.keys(rankings).map(key => (
          <TeamList
            key={key}
            listId={key}
            listType="CARD"
            teams={rankings[key]}
          />
        ))}
      </DragDropContext>
    );
  }
}

export default App;
