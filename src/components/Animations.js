import * as THREE from "three";
import React, { Component } from "react";
import * as Tone from "tone";
import * as TWEEN from "@tweenjs/tween.js"

// import Sounds from '../components/Sounds';


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
    // var center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color('black');

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 4;
    this.camera.position.x = 0;

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.renderer.shadowMap.enabled = true;
    this.mount.appendChild(this.renderer.domElement)
    window.addEventListener("resize", this.resize)

    this.light = new THREE.PointLight("#ffffff");
    this.light.castShadow = true;
    this.light.position.set(-20, 10, 10);
    this.light.shadow.mapSize.width = 2048;
    this.light.shadow.mapSize.height = 2048;
    this.scene.add(this.light)

    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'red', wireframe: false })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    const sphereGeometry = new THREE.SphereGeometry(2, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: false })
    this.dec = new THREE.Mesh(sphereGeometry, sphereMaterial)

    const decGeometry = new THREE.SphereGeometry(1, 20, 20)
    const decMaterial = new THREE.MeshLambertMaterial({ color: 'green', wireframe: false })
    this.sphere = new THREE.Mesh(decGeometry, decMaterial)

    const planeGeometry = new THREE.PlaneGeometry(5, 5)
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 'white', side: THREE.DoubleSide})
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial)

    this.objects = [];

    //checks if buffer is loaded
    this.sample = new Tone.Sampler({
	    "C3" : process.env.PUBLIC_URL + "/assets/test.mp3",
	    "C2" : process.env.PUBLIC_URL + "/assets/test2.mp3",
	    "E3" : process.env.PUBLIC_URL + "/assets/test3.mp3"
    }).toMaster();

    var targetCube = {x: 2, y: 0.05, z: 0 };
    var cube = this.cube
    this.tween = new TWEEN.Tween(cube.position).to(targetCube, 600)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.scene.add(cube)
        this.sample.triggerAttack('E3')
      })
      .onStop(()=>{
        this.scene.remove(cube)
        cube.position.set(0, 0, 0)})
      .onComplete(() => {
        this.scene.remove(cube)
        cube.position.set(0, 0, 0)
    });

    var targetSphere = {x:-1, y: 1, z: -2};
    var sphere = this.sphere
    this.tweenSphere = new TWEEN.Tween(sphere.position).to(targetSphere, 1000)
    .easing(TWEEN.Easing.Quartic.InOut)
    .onStop(()=>{
      this.scene.remove(this.sphere)
      sphere.position.set(0, 0, 0)})
    .onComplete(() => {
      this.scene.remove(this.sphere)
      sphere.position.set(0, 0, 0);
    });;


    var targetPlane = {y:-2};
    var plane = this.plane
    this.tweenPlane = new TWEEN.Tween(plane.rotation).to(targetPlane, 500)
    .easing(TWEEN.Easing.Linear.None)
    .onStop(()=>{
      this.scene.remove(this.plane)
      plane.rotation.set(0, 0, 0)})
    .onComplete(() => {
      this.scene.remove(this.plane)
      plane.rotation.set(0, 0, 0);
    });
    this.start()
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
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
    TWEEN.update()
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  create = (objName, colour, target, x, y, z, duration) => {
    // if (this.scene.getObjectByName(objName)) {
    if (this.objects.includes(objName)) {
      this.tweenObj.stop()
      console.log(this.objects.indexOf(objName));
      this.objects[this.objects.indexOf(objName)] = null
      return this.create(objName, colour, target, x, y, z, duration)
    } else {
      const material = new THREE.MeshLambertMaterial({ color: colour})
      const geometry = new THREE.BoxGeometry(1, 1, 1)
      const obj = new THREE.Mesh(geometry, material)
      obj.name = objName
      let position = obj.position.set(x, y, z);
      const objTarget= target || {x:1, y: -1, z: -2};
      this.tweenObj = new TWEEN.Tween(position).to(objTarget, duration)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onStart(() => {
        this.scene.remove(obj)
        this.scene.add(obj)
        this.objects.push(objName)
        console.log(this.objects);
        this.sample.triggerAttack('C2')
      })
      .onStop(() => {
        this.scene.remove(obj)
        geometry.dispose()
        material.dispose()
      })
      .onComplete(() => {
        this.scene.remove(obj)
        geometry.dispose()
        material.dispose()
      }).start();
    }
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
        this.tween.start();
      },
      'b': () => {
        this.tweenPlane.stop()
        this.scene.remove(this.plane);
        this.scene.add(this.plane)
        this.tweenPlane.start();
        this.sample.triggerAttack('E3');
      },
      'c': () => {
        this.create('c', 'pink', {x:-6, y: 1, z: -2}, 1, 2, 0, 800)
      },
      'd': () => {
        this.create('d', 'blue', {x:4, y: -1, z: -2}, 0, 0, -1, 600)
      },
      'e': () => {
        this.create('e', 'yellow', {x:2, y: -3, z: 0}, 1, 2, 1, 400)
      },
      'f': () => {
        // this.scene.remove(this.dec);
        // this.scene.add(this.dec)
        // this.start()
      },
      'g': () => {
        this.sample.triggerRelease('C3');
        this.tweenSphere.stop();
        this.sphere.position.set(0, 0, 0)
        this.scene.remove(this.sphere);
        this.scene.add(this.sphere)
        // this.start()
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

      </div>
    )
  }
}

export default Animations;
