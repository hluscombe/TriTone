import * as THREE from "three";
import React, { Component } from "react";
import * as Tone from "tone";
import * as TWEEN from "@tweenjs/tween.js"

import Sounds from '../components/Sounds';


class Animations extends Component {
  constructor(props) {
    super();
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    var center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.scene = new THREE.Scene()
    // const scene = new THREE.Scene();
    this.scene.background = new THREE.Color('black');

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4;
    this.camera.position.x = 0;
    this.camera.lookAt(0, 0, 4);

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    // this.renderer.setClearColor('#ffffff')
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.enabled = true;
    this.mount.appendChild(this.renderer.domElement)
    window.addEventListener("resize", this.resize)

    this.light = new THREE.PointLight("#ffffff");
    this.light.castShadow = true;
    this.light.position.set(10, 60, 10);
    this.light.shadow.mapSize.width = 2048;
    this.light.shadow.mapSize.height = 2048;
    this.scene.add(this.light)

    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    const sphereGeometry = new THREE.SphereGeometry(2, 20, 20)
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true })
    this.dec = new THREE.Mesh(sphereGeometry, sphereMaterial)

    const decGeometry = new THREE.SphereGeometry(1, 20, 20)
    const decMaterial = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
    this.sphere = new THREE.Mesh(decGeometry, decMaterial)

    const planeGeometry = new THREE.PlaneGeometry(5, 5)
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 'white', side: THREE.DoubleSide})
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial)
    this.plane.position.set(15, 0, 0);

    //checks if buffer is loaded
    Tone.Buffer.on('load', function() {console.log('loaded');})
    this.sample = new Tone.Sampler({
	    "C3" : process.env.PUBLIC_URL + "/assets/test.mp3",
	    "C2" : process.env.PUBLIC_URL + "/assets/test2.mp3",
	    "E3" : process.env.PUBLIC_URL + "/assets/test3.mp3"
    }).toMaster();

    var targetCube = {x: 2, y: 0.05, z: 0 };
    var cube = this.cube
    this.tween = new TWEEN.Tween(cube.position).to(targetCube, 400).easing(TWEEN.Easing.Exponential.Out);
    this.tween.onStop(function() {
      cube.position.set(0, 0, 0);
      console.log(cube.position);
    });

    var targetSphere = {x:-1, y: 1, z: -2};
    var sphere = this.sphere
    this.tweenSphere = new TWEEN.Tween(sphere.position).to(targetSphere, 400).easing(TWEEN.Easing.Exponential.Out);
    this.tweenSphere.onStop(function() {
      sphere.position.set(0, 0, 0);
      console.log(sphere.position);
    });

    var targetPlane = {x:1.6};
    var plane = this.plane
    this.tweenPlane = new TWEEN.Tween(plane.rotation).to(targetPlane, 400).easing(TWEEN.Easing.Linear.None);
    this.tweenPlane.onStop(function() {
      plane.rotation.set(0, 0, 0);
      console.log(plane.rotation);
    });


  };

  componentWillMount() {
    this.resize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.updateProjectionMatrix();
    }
  }

  componentWillUnmount() {
    this.stop()
    window.removeEventListener('resize', this.resize)
    this.mount.removeChild(this.renderer.domElement)
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(
        this.animate
      );
    }
  }

  animate = () => {
    this.cube.rotation.x += 0.02
    this.cube.rotation.y += 0.01
    // this.plane.rotation.x += 0.05

    this.sphere.rotation.x += 0.01
    this.sphere.rotation.y += 0.02

    this.dec.rotation.x += 0.02
    this.dec.rotation.y += 0.01

    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
    TWEEN.update()
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  create = (obj, target, easing) => {
    const geometry = new THREE.SphereGeometry(1, 20, 20)
    const material = new THREE.MeshBasicMaterial({ color: 'green', wireframe: true })
    this.green = new THREE.Mesh(geometry, material)

    // var to = target|| {x:-1, y: 1, z: -2};
    this.tween = new TWEEN.Tween(obj.position).to(target, 1000).easing(TWEEN.Easing.Quadratic.InOut);
    this.tween.onStop(function() {
      obj.position.set(0, 0, 0);
      console.log(obj.position);
    });
  }

  keyIsPressed = (e) => {
    if (e.repeat) {
      return;
    }
    if (!e.key.match(/^[a-z]$/i)) {
      return;
    }
    console.log(`${e.key} is pressed`);
    const addObject = {
      'a': () => {
        this.tween.stop()
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.tween.start();
        this.sample.triggerAttack('E3');
      },
      'b': () => {
        this.tweenPlane.stop()
        this.scene.remove(this.plane);
        this.scene.add(this.plane)
        this.start()
        this.tweenPlane.start();
        this.sample.triggerAttack('E3');
      },
      'c': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'd': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'e': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'f': () => {
        this.scene.remove(this.dec);
        this.scene.add(this.dec)
        this.start()
      },
      'g': () => {
        this.tweenSphere.stop();
        this.scene.remove(this.sphere);
        this.scene.add(this.sphere)
        this.start()
        this.tweenSphere.start();
        this.sample.triggerAttack('C3');

      },
      'h': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'i': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'j': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'k': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'l': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'm': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'n': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'o': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'p': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'q': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'r': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      's': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      't': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'u': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'v': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
      },
      'w': () => {
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
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
    addObject[ e.key ]()
  }

  keyIsUp = (e) => {
    if (!e.key.match(/^[a-z]$/i)) {
      return;
    }
    console.log(`${e.key} is up`);
    const delObject = {
      'a': () => {
        this.tween.stop();
        this.cube.position.set(0, 0, 0)
        this.scene.remove(this.cube);
      },
      'b': () => {
        this.tweenPlane.stop();
        this.plane.rotation.set(0, 0, 0)
        this.scene.remove(this.plane);

      },
      'c': () => {
        this.scene.remove(this.cube);

      },
      'd': () => {
        this.scene.remove(this.cube);

      },
      'e': () => {
        this.scene.remove(this.cube);

      },
      'f': () => {
        this.scene.remove(this.dec);

      },
      'g': () => {
        this.tweenSphere.stop();
        this.sphere.position.set(0, 0, 0)
        this.scene.remove(this.sphere);
      },
      'h': () => {
        this.scene.remove(this.cube);

      },
      'i': () => {
        this.scene.remove(this.cube);

      },
      'j': () => {
        this.scene.remove(this.cube);

      },
      'k': () => {
        this.scene.remove(this.cube);

      },
      'l': () => {
        this.scene.remove(this.cube);

      },
      'm': () => {
        this.scene.remove(this.cube);

      },
      'n': () => {
        this.scene.remove(this.cube);

      },
      'o': () => {
        this.scene.remove(this.cube);

      },
      'p': () => {
        this.scene.remove(this.cube);

      },
      'q': () => {
        this.scene.remove(this.cube);

      },
      'r': () => {
        this.scene.remove(this.cube);

      },
      's': () => {
        this.scene.remove(this.cube);

      },
      't': () => {
        this.scene.remove(this.cube);

      },
      'u': () => {
        this.scene.remove(this.cube);

      },
      'v': () => {
        this.scene.remove(this.cube);

      },
      'w': () => {
        this.scene.remove(this.cube);
      },
      'x': () => {
        this.scene.remove(this.cube);
      },
      'y': () => {
        this.scene.remove(this.cube);
      },
      'z': () => {
        this.scene.remove(this.cube);
      }
    }
    delObject[ e.key ]()
  }

  render() {
    return (
      <div
      tabIndex={0}
      onKeyDown={this.keyIsPressed}
      onKeyUp={this.keyIsUp}
      onClick={this.startTransport}
      style={{
        width: this.state.width,
        height: this.state.height
      }}
      ref={(mount) => {
        this.mount = mount
      }}
      >
      <Sounds
      tabIndex={0}
      onKeyDown={this.keyIsPressed}
      onKeyUp={this.keyIsUp}
      focus='true'
      style={{
        width: this.state.width,
        height: this.state.height
      }}
      />
      </div>
    )
  }
}

export default Animations;
