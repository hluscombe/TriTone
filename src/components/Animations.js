import * as THREE from "three";
import React, { Component } from "react";
import * as Tone from "tone";

import Sounds from '../components/Sounds';


class Animations extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.scene = new THREE.Scene()
    // this.scene.background(color:'#ffffff')

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4;
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setClearColor('#ffffff')
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.enabled = true;
    this.mount.appendChild(this.renderer.domElement)

    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    const sphereGeometry = new THREE.SphereGeometry(2, 20, 20)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true })
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

    const decGeometry = new THREE.SphereGeometry(1, 20, 20)
    const decMaterial = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
    this.dec = new THREE.Mesh(decGeometry, decMaterial)

    this.sound = new Tone.PolySynth(3).toMaster();
    // var buffer = new Tone.Buffer("/assests/CLAP.mp3", function(){
	  //    //the buffer is now available.
	  //    var buff = buffer.get();
    // });
    Tone.Buffer.on('load', function() {console.log('loaded');})
    this.CLAP = new Tone.Sampler({
	    "C3" : process.env.PUBLIC_URL + "/assets/test.mp3",
    },
    {
      'baseURL': /assets/
    }).toMaster();
    console.log(this.CLAP.loaded);
  };

  componentWillUnmount() {
    this.stop()
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(
        this.animate
      )
    }
  }

  // stop = () => {
  //   cancelAnimationFrame( this.frameId )
  // }

  animate = () => {

    this.cube.rotation.x += 0.02
    // this.cube.rotation.z += 0.05
    this.cube.rotation.y += 0.01

    this.sphere.rotation.x += 0.01
    this.sphere.rotation.y += 0.02

    this.dec.rotation.x += 0.02
    this.dec.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  keyIsPressed = (e) => {
    if (e.repeat) {
      return;
    }
    console.log(`${e.key} is pressed`);
    // switch (e.key) {
    //   case 'g':
    //     console.log('g');
    //     break;
    //   case 'f':
    //     console.log('f');
    //     break;
    //   default:
    //     break;
    // }
    if (e.key === 'g') {
      this.sound.triggerAttackRelease(['C4', 'E4', 'G4'],'8n');
      this.scene.remove(this.cube);
      this.scene.add(this.cube)
      this.start()
    } else if (e.key === 'f'){
      this.sound.triggerAttackRelease(['B3', 'D3', 'E4'],'8n');
      this.scene.remove(this.sphere);
      this.scene.add(this.sphere)
      this.start()
    } else if (e.key === 'd'){
      this.CLAP.triggerAttack('C3');
      this.scene.remove(this.dec);
      this.scene.add(this.dec)
      this.start()
    }
  }

  keyIsUp = (e) => {
    console.log(`${e.key} is up`);
    if (e.key === 'g') {
      this.scene.remove(this.cube);
    } else if (e.key === 'f') {
      this.scene.remove(this.sphere);
    } else if (e.key === 'd') {
      this.CLAP.triggerRelease('C3')
      console.log(this.CLAP.loaded);
      this.scene.remove(this.dec);
    }
  }
  startTransport = () => {
    Tone.Transport.start()
  }

  render() {
    return (
      <div
      tabIndex={0}
      onKeyDown={this.keyIsPressed}
      onKeyUp={this.keyIsUp}
      onClick={this.startTransport}
      style={{
        width: 'window.innerWidth',
        height: 'window.innerHeight'
      }}
      ref={(mount) => {
        this.mount = mount
      }}
      >
      <Sounds
      tabIndex={0}
      onKeyDown={this.keyIsPressed}
      onKeyUp={this.keyIsUp}
      />
      </div>
    )
  }
}

export default Animations;
