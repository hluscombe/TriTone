import * as THREE from "three";
import React, { Component } from "react";
import * as Tone from "tone";
import * as TWEEN from "@tweenjs/tween.js"


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
    this.scene.background = new THREE.Color('white');

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    this.camera.position.z = 10;
    this.camera.position.y = 0;

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

    // object 1
    const cubeGeometry = new THREE.BoxBufferGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'red', wireframe: false })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    // object 2
    const sphereGeometry = new THREE.SphereBufferGeometry(2, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: false })
    this.sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial)

    // object 3
    const sphere2Geometry = new THREE.SphereBufferGeometry(1, 20, 20)
    const sphere2Material = new THREE.MeshLambertMaterial({ color: 'green', wireframe: true })
    this.sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material)

    // object 4
    const planeGeometry = new THREE.PlaneBufferGeometry(2, 5)
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 'white', side: THREE.DoubleSide})
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial)

    // object 5
    const coneGeometry = new THREE.ConeBufferGeometry( 1, 3, 30 );
    const coneMaterial = new THREE.MeshBasicMaterial( {color: 'black', wireframe: true} );
    this.cone = new THREE.Mesh( coneGeometry, coneMaterial );
    this.scene.add( this.cone );

    // object 6
    const cylGeometry = new THREE.CylinderBufferGeometry( 1, 1, 3, 20 );
    const cylMaterial = new THREE.MeshBasicMaterial( {color: 'pink', wireframe: true} );
    this.cylinder = new THREE.Mesh( cylGeometry, cylMaterial );
    this.scene.add( this.cylinder );

    // object 7
    const circGeometry = new THREE.CircleBufferGeometry( 1.5, 32 );
    const circMaterial = new THREE.MeshBasicMaterial( { color: 'yellow', wireframe: true } );
    this.circle = new THREE.Mesh( circGeometry, circMaterial );
    this.scene.add( this.circle );

    // object 8
    const decGeometry = new THREE.DodecahedronBufferGeometry(1,0);
    const decMaterial = new THREE.MeshLambertMaterial({color: 'blue', wireframe: true})
    this.dodecahedron = new THREE.Mesh( decGeometry, decMaterial );
    this.scene.add( this.dodecahedron );

    // object 9
    const icoGeometry = new THREE.IcosahedronBufferGeometry(1,1);
    const icoMaterial = new THREE.MeshLambertMaterial({color: 'purple', wireframe: true});
    this.icosahedron = new THREE.Mesh( icoGeometry, icoMaterial );
    this.scene.add( this.icosahedron )

    // object 10
    const octGeometry = new THREE.OctahedronBufferGeometry(2, 0);
    const octMaterial = new THREE.MeshBasicMaterial({color: 'green', wireframe: true});
    this.octahedron = new THREE.Mesh(octGeometry, octMaterial);
    this.scene.add( this.octahedron )

    //object 11
    const torusGeometry = new THREE.TorusBufferGeometry( 2, 0.2, 10, 100 );
    const torusMaterial = new THREE.MeshBasicMaterial( { color: 'orange', wireframe: true } );
    this.torus = new THREE.Mesh( torusGeometry, torusMaterial );
    this.scene.add( this.torus );

    // object 12
    const tetraGeometry = new THREE.TetrahedronBufferGeometry()
    const tetraMaterial = new THREE.MeshBasicMaterial({color: 'green', wireframe: true})
    this.tetra = new THREE.Mesh(tetraGeometry, tetraMaterial);
    this.scene.add( this.tetra )

    // object 13
    const circ2Geometry = new THREE.CircleBufferGeometry( 1.5, 32 );
    const circ2Material = new THREE.MeshBasicMaterial( { color: 'red', wireframe: true } );
    this.circle2 = new THREE.Mesh( circ2Geometry, circ2Material );
    this.scene.add( this.circle2 );

    // object 14
    const cube2Geometry = new THREE.BoxBufferGeometry(2, 2, 2)
    const cube2Material = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: true })
    this.cube2 = new THREE.Mesh(cube2Geometry, cube2Material)
    this.scene.add(this.cube2)

    // object 15
    const cube3Geometry = new THREE.BoxBufferGeometry(1, 2, 2)
    const cube3Material = new THREE.MeshLambertMaterial({ color: 'pink', wireframe: true })
    this.cube3 = new THREE.Mesh(cube3Geometry, cube3Material)
    this.scene.add(this.cube3)

    // object 16
    const cube4Geometry = new THREE.BoxBufferGeometry(1.5, 2, 2)
    const cube4Material = new THREE.MeshLambertMaterial({ color: 'yellow', wireframe: true })
    this.cube4 = new THREE.Mesh(cube4Geometry, cube4Material)
    this.scene.add(this.cube4)

    // object 17
    const tetra2Geometry = new THREE.TetrahedronBufferGeometry()
    const tetra2Material = new THREE.MeshBasicMaterial({color: 'blue', wireframe: true})
    this.tetra2 = new THREE.Mesh(tetra2Geometry, tetra2Material);
    this.scene.add( this.tetra2 )

    // object 18
    const triGeometry = new THREE.TorusBufferGeometry( 2, 0.2, 10, 3 );
    const triMaterial = new THREE.MeshBasicMaterial( { color: 'brown', wireframe: true } );
    this.torus = new THREE.Mesh( triGeometry, triMaterial );
    this.scene.add( this.torus );

    // object 19
    const hexGeometry = new THREE.TorusBufferGeometry( 1, .5, 3 );
    const hexMaterial = new THREE.MeshNormalMaterial({ color: 'black', wireframe: true });
    this.hex = new THREE.Mesh( hexGeometry, hexMaterial );
    this.scene.add(this.hex)

    // object 20
    const growGeometry = new THREE.CircleBufferGeometry( 1, 32, 0, 0.2 ); // animate this last var to 6.3
    const growMaterial = new THREE.MeshBasicMaterial( { color: 'blue', wireframe: true } );
    this.grow = new THREE.Mesh( growGeometry, growMaterial );
    this.scene.add( this.grow );

    // object 21
    const icoG = new THREE.IcosahedronBufferGeometry(1,0);
    const icoM = new THREE.MeshLambertMaterial({color: 'orange', wireframe: true});
    this.ico2 = new THREE.Mesh( icoG, icoM );
    this.scene.add( this.ico2 )

    // object 22
    const toyboxG = new THREE.SphereBufferGeometry(2, 20, 3)
    const toyboxM = new THREE.MeshLambertMaterial({ color: 'black', wireframe: true })
    this.toybox = new THREE.Mesh(toyboxG, toyboxM)
    this.scene.add( this.toybox )

    // object 23
    const hatG = new THREE.SphereBufferGeometry(2, 12, 2)
    const hatM = new THREE.MeshLambertMaterial({ color: 'lightblue', wireframe: true })
    this.hat = new THREE.Mesh(hatG, hatM)
    this.scene.add( this.hat )

    // object 24
    const cyl2G = new THREE.CylinderBufferGeometry( 1, 8, 2, 20 );
    const cyl2M = new THREE.MeshBasicMaterial( {color: 'blue', wireframe: true} );
    this.cylinder2 = new THREE.Mesh( cyl2G, cyl2M );
    this.scene.add( this.cylinder2 );

    // object 25
    const octG = new THREE.TorusBufferGeometry( 2, .2, 3, 8 );
    const octM = new THREE.MeshNormalMaterial({ color: 'black', wireframe: true });
    this.oct = new THREE.Mesh( octG, octM );
    this.scene.add(this.oct)

    // object 26
    var loader = new THREE.FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

    	var bigtextgeometry = new THREE.TextBufferGeometry( 'Hello SEI31 !!', {
    		font: font,
    		size: 80,
    		height: 5,
    		curveSegments: 12,
    		bevelEnabled: true,
    		bevelThickness: 10,
    		bevelSize: 8,
    		bevelOffset: 0,
    		bevelSegments: 5
    	} );
    } );


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

    var targetCube = {x: 2, y: 0.05, z: 3 };
    var cube = this.cube
    // cube.matrixAutoUpdate = false;
    this.tween = new TWEEN.Tween(cube.position)
      .to(targetCube, 1200)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.start()
        this.scene.add(cube)
        this.tweenRotation.delay(300)
        this.tweenRotation.start()
        // this.sample.triggerAttack('E3')
      })
      .onStop(()=>{
        this.scene.remove(cube)
        this.tweenRotation.stop()
        cube.position.set(0, 0, 0)})
      .onComplete(() => {
        this.scene.remove(cube)
        cube.position.set(0, 0, 0)
    });
    this.tweenRotation = new TWEEN.Tween(cube.rotation).to({x: 1.5}, 600)
    .easing(TWEEN.Easing.Quartic.In)
    .onStop(()=>{
      cube.rotation.set(0, 0, 0)})
    .onComplete(() => {
      cube.rotation.set(0, 0, 0)
    });

    var targetSphere = {x:-1, y: 1, z: -2};
    var sphere = this.sphere1
    this.tweenSphere = new TWEEN.Tween(sphere.position).to(targetSphere, 1000)
    .easing(TWEEN.Easing.Quartic.Out)
    .onUpdate(()=>{sphere.rotation.y++})
    .onStop(()=>{
      this.scene.remove(this.sphere)
      sphere.position.set(0, 0, 0)})
    .onComplete(() => {
      this.scene.remove(this.sphere)
      sphere.position.set(0, 0, 0);
    });;


    var targetPlane = {y:-1.5};
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

  animate = (time) => {
    this.renderScene()
    this.frameId = window.requestAnimationFrame(this.animate)
    TWEEN.update(time)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  create = (objName, colour, target, x, y, z, duration) => {

      const material = new THREE.MeshLambertMaterial({ color: colour})
      const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
      const obj = new THREE.Mesh(geometry, material)

      let position = obj.position.set(x, y, z);
      const objTarget= target || {x:1, y: -1, z: -2};
      this.tweenObj = new TWEEN.Tween(position).to(objTarget, duration)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onStart(() => {
        this.scene.remove(obj)
        this.scene.add(obj)

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
        this.sample.triggerRelease('G6')
        this.tween.stop()
        this.tween.start();
        this.sample.triggerAttack('G6')
      },
      'b': () => {
        this.sample.triggerRelease('C3');
        this.tweenPlane.stop()
        this.scene.remove(this.plane);
        this.scene.add(this.plane)
        this.tweenPlane.start();
        this.sample.triggerAttack('C3');
      },
      'c': () => {
        this.sample.triggerRelease('D3')
        this.create('c', 'pink', {x:-6, y: 1, z: -2}, 1, 2, 0, 800);
        this.sample.triggerAttack('D3')
      },
      'd': () => {
        this.sample.triggerRelease('E3')
        this.create('d', 'blue', {x:4, y: -1, z: -2}, 0, 0, -1, 600)
        this.sample.triggerAttack('E3')
      },
      'e': () => {
        this.sample.triggerRelease('F3')
        this.create('e', 'yellow', {x:2, y: -3, z: 0}, 1, 2, 1, 400)
        this.sample.triggerAttack('F3')
      },
      'f': () => {
        this.sample.triggerRelease('G3')
        this.sample.triggerAttack('G3')
      },
      'g': () => {
        this.sample.triggerRelease('A3');
        this.tweenSphere.stop();
        this.sphere.position.set(0, 0, 0)
        this.scene.remove(this.sphere);
        this.scene.add(this.sphere)
        // this.start()
        this.tweenSphere.start();
        this.sample.triggerAttack('A3');

      },
      'h': () => {
        this.sample.triggerRelease('B3')
        this.create('h', 'orange', {x:2, y: -5, z: 2}, 0.4, 0.3, 2, 400)
        this.sample.triggerAttack('B3')

      },
      'i': () => {
        this.sample.triggerRelease('C4')
        this.create('i', 'aliceblue', {x:-2, y: -4, z: 7}, 0.8, 0.2, 0.1, 400)
        this.sample.triggerAttack('C4')

      },
      'j': () => {
        this.sample.triggerRelease('D4')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('D4')

      },
      'k': () => {
        this.sample.triggerRelease('E4')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('E4')

      },
      'l': () => {
        this.sample.triggerRelease('F4')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('F4')

      },
      'm': () => {
        this.sample.triggerRelease('G4')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('G4')

      },
      'n': () => {
        this.sample.triggerRelease('A4')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('A4')
      },
      'o': () => {
        this.sample.triggerRelease('B4')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('B4')

      },
      'p': () => {
        this.sample.triggerRelease('C5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('C5')

      },
      'q': () => {
        this.sample.triggerRelease('D5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('D5')

      },
      'r': () => {
        this.sample.triggerRelease('E5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('E5')
      },
      's': () => {
        this.sample.triggerRelease('F5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('F5')
      },
      't': () => {
        this.sample.triggerRelease('G5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('G5')
      },
      'u': () => {
        this.sample.triggerRelease('A5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('A5')
      },
      'v': () => {
        this.sample.triggerRelease('B5')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
        this.sample.triggerAttack('B5')
      },
      'w': () => {
        this.sample.triggerRelease('C6')
        this.scene.remove(this.cube);
        this.scene.add(this.cube)
        this.start()
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
