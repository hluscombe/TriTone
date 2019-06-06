import * as Tone from "tone";
import React, { Component } from "react";

class Sounds extends Component {
  constructor(props) {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
  componentDidMount() {
    this.sample = new Tone.Sampler({
	    "C3" : process.env.PUBLIC_URL + "/assets/test.mp3",
	    "C2" : process.env.PUBLIC_URL + "/assets/test2.mp3",
	    "E3" : process.env.PUBLIC_URL + "/assets/test3.mp3"
    }).toMaster();
  }

  keyIsPressed = (e) => {
    console.log(e.key);
    if (e.repeat) {
      return;
    };

    // console.log(e.key);
    const playSample = {
      'a': () => {
        this.sample.triggerAttack('C3');
      },
      'b': () => {
        this.sample.triggerAttack('C3');
      },
      'c': () => {
        this.sample.triggerAttack('C3');
      },
      'd': () => {
        this.sample.triggerAttack('C3');
      },
      'e': () => {
        this.sample.triggerAttack('C3');
      },
      'f': () => {
        this.sample.triggerAttack('C3');
      },
      'g': () => {
        this.sample.triggerAttack('C3');
      },
      'h': () => {
        this.sample.triggerAttack('C3');
      },
      'i': () => {
        this.sample.triggerAttack('C3');
      },
      'j': () => {
        this.sample.triggerAttack('C3');
      },
      'k': () => {
        this.sample.triggerAttack('C3');
      },
      'l': () => {
        this.sample.triggerAttack('C3');
      },
      'm': () => {
        this.sample.triggerAttack('C3');
      },
      'n': () => {
        this.sample.triggerAttack('C3');
      },
      'o': () => {
        this.sample.triggerAttack('C3');
      },
      'p': () => {
        this.sample.triggerAttack('C3');
      },
      'q': () => {
        this.sample.triggerAttack('C3');
      },
      'r': () => {
        this.sample.triggerAttack('C3');
      },
      's': () => {
        this.sample.triggerAttack('C3');
      },
      't': () => {
        this.sample.triggerAttack('C3');
      },
      'u': () => {
        this.sample.triggerAttack('C3');
      },
      'v': () => {
        this.sample.triggerAttack('C3');
      },
      'w': () => {
        this.sample.triggerAttack('C3');
      },
      'x': () => {
        this.sample.triggerAttack('C2');
      },
      'y': () => {
        this.sample.triggerAttack('C2');
      },
      'z': () => {
        this.sample.triggerAttack('C2');
      }
    }
    if (!e.key.match(/^[a-z]$/i)) {
      console.log(e.key);
      return;
    } else {
      playSample[ e.key ]()
    };

  }

  keyIsUp = (e) => {
    console.log(`${e.key} is up`);
  }

  render() {
    return (
      <div
    
      >
      </div>
    );
  }
}

export default Sounds;
