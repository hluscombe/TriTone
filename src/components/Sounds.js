import * as Tone from "tone";
import React, { Component } from "react";
// import ReactDOM from "react-dom";

class Sounds extends Component {

  componentDidMount() {
    this.sound = new Tone.PolySynth(6).toMaster();
    // Tone.Transport.bpm(120);
  }

  keyIsPressed = (e) => {
    if (e.repeat) { //|| e.key !== 'g'
      return;
    }
    Tone.Transport.start()
    this.sound.triggerAttackRelease(['C4', 'E4', 'G5'],'8n')
  }

  keyIsUp = (e) => {
    console.log(`${e.key} is up`);

  }

  render() {
    return (
      <div
      tabIndex={0}
      onKeyDown={this.keyIsPressed}
      onKeyUp={this.keyIsUp}
      >
      </div>
    );
  }
}

export default Sounds;
