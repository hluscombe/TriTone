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
	    "C3" : process.env.PUBLIC_URL + "/assets/TT01.mp3",
	    "D3" : process.env.PUBLIC_URL + "/assets/TT02.mp3",
	    "E3" : process.env.PUBLIC_URL + "/assets/TT03.mp3",
	    "F3" : process.env.PUBLIC_URL + "/assets/TT04.mp3",
	    "G3" : process.env.PUBLIC_URL + "/assets/TT05.mp3",
	    "A3" : process.env.PUBLIC_URL + "/assets/TT06.mp3",
	    "B3" : process.env.PUBLIC_URL + "/assets/TT07.mp3",
	    "C4" : process.env.PUBLIC_URL + "/assets/TT08.mp3",
	    "D4" : process.env.PUBLIC_URL + "/assets/TT09.mp3",
	    "E4" : process.env.PUBLIC_URL + "/assets/TT10.mp3",
	    "F4" : process.env.PUBLIC_URL + "/assets/TT11.mp3",
	    "G4" : process.env.PUBLIC_URL + "/assets/TT12.mp3",
	    "A4" : process.env.PUBLIC_URL + "/assets/TT13.mp3",
	    "B4" : process.env.PUBLIC_URL + "/assets/TT14.mp3",
	    "C5" : process.env.PUBLIC_URL + "/assets/TT15.mp3",
	    "D5" : process.env.PUBLIC_URL + "/assets/TT16.mp3",
	    "E5" : process.env.PUBLIC_URL + "/assets/TT17.mp3",
	    "F5" : process.env.PUBLIC_URL + "/assets/TT18.mp3",
	    "G5" : process.env.PUBLIC_URL + "/assets/TT19.mp3",
	    "A5" : process.env.PUBLIC_URL + "/assets/TT20.mp3",
	    "B5" : process.env.PUBLIC_URL + "/assets/TT21.mp3",
      "C6" : process.env.PUBLIC_URL + "/assets/TT22.mp3",
	    "D6" : process.env.PUBLIC_URL + "/assets/TT23.mp3",
	    "E6" : process.env.PUBLIC_URL + "/assets/TT24.mp3",
	    "F6" : process.env.PUBLIC_URL + "/assets/TT25.mp3",
	    "G6" : process.env.PUBLIC_URL + "/assets/TT26.mp3"
    }).toMaster();
  }

  keyIsPressed = (e) => {
    if (e.repeat) {
      return;
    }
    if (!e.key.match(/^[a-z]$/i)) {
      return;
    }
    console.log(`${e.key} is pressed`);
    const playSample = {
      'a': () => {
        this.sample.triggerRelease('G6')
        this.sample.triggerAttack('G6')
      },
      'b': () => {
        this.sample.triggerRelease('C3');
        this.sample.triggerAttack('C3');
      },
      'c': () => {
        this.sample.triggerRelease('D3')
        this.sample.triggerAttack('D3')
      },
      'd': () => {
        this.sample.triggerRelease('E3')
        this.sample.triggerAttack('E3')
      },
      'e': () => {
        this.sample.triggerRelease('F3')
        this.sample.triggerAttack('F3')
      },
      'f': () => {
        this.sample.triggerRelease('G3')
        this.sample.triggerAttack('G3')
      },
      'g': () => {
        this.sample.triggerRelease('A3');
        this.sample.triggerAttack('A3');
      },
      'h': () => {
        this.sample.triggerRelease('B3')
        this.sample.triggerAttack('B3')

      },
      'i': () => {
        this.sample.triggerRelease('C4')
        this.sample.triggerAttack('C4')

      },
      'j': () => {
        this.sample.triggerRelease('D4')
        this.sample.triggerAttack('D4')

      },
      'k': () => {
        this.sample.triggerRelease('E4')
        this.sample.triggerAttack('E4')

      },
      'l': () => {
        this.sample.triggerRelease('F4')
        this.sample.triggerAttack('F4')

      },
      'm': () => {
        this.sample.triggerRelease('G4')
        this.sample.triggerAttack('G4')
      },
      'n': () => {
        this.sample.triggerRelease('A4')
        this.sample.triggerAttack('A4')
      },
      'o': () => {
        this.sample.triggerRelease('B4')
        this.sample.triggerAttack('B4')

      },
      'p': () => {
        this.sample.triggerRelease('C5')
        this.sample.triggerAttack('C5')

      },
      'q': () => {
        this.sample.triggerRelease('D5')
        this.sample.triggerAttack('D5')

      },
      'r': () => {
        this.sample.triggerRelease('E5')
        this.sample.triggerAttack('E5')
      },
      's': () => {
        this.sample.triggerRelease('F5')
        this.sample.triggerAttack('F5')
      },
      't': () => {
        this.sample.triggerRelease('G5')
        this.sample.triggerAttack('G5')
      },
      'u': () => {
        this.sample.triggerRelease('A5')
        this.sample.triggerAttack('A5')
      },
      'v': () => {
        this.sample.triggerRelease('B5')
        this.sample.triggerAttack('B5')
      },
      'w': () => {
        this.sample.triggerRelease('C6')
        this.sample.triggerAttack('C6')
      },
      'x': () => {
        this.sample.triggerRelease('D6');
        this.sample.triggerAttack('D6');
      },
      'y': () => {
        this.sample.triggerRelease('E6');
        this.sample.triggerAttack('E6');
      },
      'z': () => {
        this.sample.triggerRelease('F6');
        this.sample.triggerAttack('F6');
      }
    }
    playSample[ e.key ]()
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
