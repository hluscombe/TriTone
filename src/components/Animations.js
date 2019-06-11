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
    this.scene.background = new THREE.Color('grey');

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

    var axesHelper = new THREE.AxesHelper( 5 );
    this.scene.add( axesHelper );

    // object 1
    const cubeGeometry = new THREE.BoxBufferGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'red', wireframe: false })
    this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    this.cube.position.set(-2,2,-1)
    // this.scene.add(this.cube)

    // object 2
    const sphereGeometry = new THREE.SphereBufferGeometry(2, 20, 20)
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: false })
    this.sphere1 = new THREE.Mesh(sphereGeometry, sphereMaterial)
    this.sphere1.position.set(6,0,0)
    // this.scene.add(this.sphere1)

    // object 3
    const sphere2Geometry = new THREE.SphereBufferGeometry(1, 20, 20)
    const sphere2Material = new THREE.MeshLambertMaterial({ color: 'green', wireframe: false })
    this.sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material)
    this.sphere2.position.set(-6,2,2)
    // this.scene.add(this.sphere2)

    // object 4
    const planeGeometry = new THREE.PlaneBufferGeometry(2, 5)
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 'white', side: THREE.DoubleSide})
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial)

    // object 5
    const coneGeometry = new THREE.ConeBufferGeometry( 1, 3, 30 );
    const coneMaterial = new THREE.MeshLambertMaterial( {color: 'skyblue', wireframe: false} );
    this.cone = new THREE.Mesh( coneGeometry, coneMaterial );
    this.cone.rotation.x = -1.5
    this.cone.position.set(0,2,-4)
    // this.scene.add( this.cone );

    // object 6
    const cylGeometry = new THREE.CylinderBufferGeometry( 1, 1, 3, 20 );
    const cylMaterial = new THREE.MeshLambertMaterial( {color: 'pink', wireframe: false} );
    this.cylinder = new THREE.Mesh( cylGeometry, cylMaterial );
    this.cylinder.position.set(-20,3,-2)
    // this.scene.add( this.cylinder );

    // object 7
    const circGeometry = new THREE.CircleBufferGeometry( 1.5, 32 );
    const circMaterial = new THREE.MeshBasicMaterial( { color: 'yellow', wireframe: false } );
    this.circle = new THREE.Mesh( circGeometry, circMaterial );
    // this.scene.add( this.circle );

    // object 8
    const decGeometry = new THREE.DodecahedronBufferGeometry(1,0);
    const decMaterial = new THREE.MeshLambertMaterial({color: 'blue', wireframe: false})
    this.dodecahedron = new THREE.Mesh( decGeometry, decMaterial );
    // this.dodecahedron.position.set(Math.random() , Math.random())
    // this.scene.add( this.dodecahedron );

    // object 9
    const icoGeometry = new THREE.IcosahedronBufferGeometry(1,1);
    const icoMaterial = new THREE.MeshLambertMaterial({color: 'purple', wireframe: true});
    this.icosahedron = new THREE.Mesh( icoGeometry, icoMaterial );
    this.icosahedron.position.set(0,5,2)
    // this.scene.add( this.icosahedron )

    // object 10
    const octGeometry = new THREE.OctahedronBufferGeometry(2, 0);
    const octMaterial = new THREE.MeshLambertMaterial({color: 'green', wireframe: false});
    this.octahedron = new THREE.Mesh(octGeometry, octMaterial);
    this.octahedron.position.set(-2,2,0)
    // this.scene.add( this.octahedron )

    //object 11
    const torusGeometry = new THREE.TorusBufferGeometry( 2, 0.2, 10, 100 );
    const torusMaterial = new THREE.MeshBasicMaterial( { color: 'orange', wireframe: false } );
    this.torus = new THREE.Mesh( torusGeometry, torusMaterial );
    this.torus.position.set(0,0,-20)
    // this.scene.add( this.torus );

    // object 12
    const tetraGeometry = new THREE.TetrahedronBufferGeometry()
    const tetraMaterial = new THREE.MeshLambertMaterial({color: 'green', wireframe: false})
    this.tetra = new THREE.Mesh(tetraGeometry, tetraMaterial);
    this.tetra.position.set(2,3,-1)
    // this.scene.add( this.tetra )

    // object 13
    const circ2Geometry = new THREE.CircleBufferGeometry( 1.5, 32 );
    const circ2Material = new THREE.MeshLambertMaterial( { color: 'red', wireframe: false } );
    this.circle2 = new THREE.Mesh( circ2Geometry, circ2Material );
    this.circle2.position.set(-4, 4, 0)
    // console.log(this.circle2);
    // this.scene.add( this.circle2 );

    // object 14
    const cube2Geometry = new THREE.BoxBufferGeometry(2, 2, 2)
    const cube2Material = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: false })
    this.cube2 = new THREE.Mesh(cube2Geometry, cube2Material)
    let randomIntx = Math.random() < 0.5 ? -4 : 4;
    let randomInty = Math.random() < 0.5 ? -4 : 4;
    this.cube2.position.set(randomIntx, randomInty, 0)
    // this.scene.add(this.cube2)

    // object 15
    const cube3Geometry = new THREE.BoxBufferGeometry(1, 2, 4)
    const cube3Material = new THREE.MeshLambertMaterial({ color: 'pink', wireframe: false })
    this.cube3 = new THREE.Mesh(cube3Geometry, cube3Material)
    this.cube3.position.set(randomIntx, randomInty, 0)
    // this.scene.add(this.cube3)

    // object 16
    const cube4Geometry = new THREE.BoxBufferGeometry(2, 2, 2)
    const cube4Material = new THREE.MeshLambertMaterial({ color: 'yellow', wireframe: false })
    this.cube4 = new THREE.Mesh(cube4Geometry, cube4Material)
    this.cube4.scale.set(1,1,1)
    // this.scene.add(this.cube4)

    // object 17
    const tetra2Geometry = new THREE.TetrahedronBufferGeometry()
    const tetra2Material = new THREE.MeshLambertMaterial({color: 'blue', wireframe: false})
    this.tetra2 = new THREE.Mesh(tetra2Geometry, tetra2Material);
    this.tetra2.position.set(2, 2, 0)
    // this.scene.add( this.tetra2 )

    // object 18
    const triGeometry = new THREE.TorusBufferGeometry( 2, 0.2, 10, 3 );
    const triMaterial = new THREE.MeshBasicMaterial( { color: 'brown', wireframe: false } );
    this.tri = new THREE.Mesh( triGeometry, triMaterial );
    // this.scene.add( this.tri );

    // object 19
    const hexGeometry = new THREE.TorusBufferGeometry( 1, .2, 3 );
    const hexMaterial = new THREE.MeshNormalMaterial();
    this.hex = new THREE.Mesh( hexGeometry, hexMaterial );
    // this.scene.add(this.hex)

    // object 20
    let growGeometry = new THREE.CircleBufferGeometry( 2, 32, 0 ); // animate this last var to 6.3
    const growMaterial = new THREE.MeshLambertMaterial( { color: 'blue', wireframe: false} );
    this.grow = new THREE.Mesh( growGeometry, growMaterial );
    // this.scene.add( this.grow );

    // object 21
    const icoG = new THREE.IcosahedronBufferGeometry(1,0);
    const icoM = new THREE.MeshLambertMaterial({color: 'orange', wireframe: true});
    this.ico2 = new THREE.Mesh( icoG, icoM );
    this.icosahedron.position.set(0,-5,2)
    // this.scene.add( this.ico2 )

    // object 22
    const toyboxG = new THREE.SphereBufferGeometry(2, 20, 3)
    const toyboxM = new THREE.MeshLambertMaterial({ color: 'silver', wireframe: true })
    this.toybox = new THREE.Mesh(toyboxG, toyboxM)
    // this.scene.add( this.toybox )

    // object 23
    const hatG = new THREE.SphereBufferGeometry(2, 12, 2)
    const hatM = new THREE.MeshLambertMaterial({ color: 'lightblue', wireframe: true })
    this.hat = new THREE.Mesh(hatG, hatM)
    // this.scene.add( this.hat )

    // object 24
    const cyl2G = new THREE.CylinderBufferGeometry( 1, 8, 2, 20 );
    const cyl2M = new THREE.MeshBasicMaterial( {color: 'blue', wireframe: true} );
    this.cylinder2 = new THREE.Mesh( cyl2G, cyl2M );
    this.cylinder2.position.set(0,0,-10)
    // this.scene.add( this.cylinder2 );

    // object 25
    const octG = new THREE.TorusBufferGeometry( 2, .2, 3, 8 );
    const octM = new THREE.MeshNormalMaterial({ color: 'black', wireframe: true });
    this.oct = new THREE.Mesh( octG, octM );
    this.oct.position.set(0,0,10)
    // this.scene.add(this.oct)

    // object 26 for letter K
    // var loader = new THREE.FontLoader();
    //
    // loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
    //
    // 	var bigtextgeometry = new THREE.TextBufferGeometry( 'Hello SEI31 !!', {
    // 		font: font,
    // 		size: 80,
    // 		height: 5,
    // 		curveSegments: 12,
    // 		bevelEnabled: true,
    // 		bevelThickness: 10,
    // 		bevelSize: 8,
    // 		bevelOffset: 0,
    // 		bevelSegments: 5
    // 	} );
    // } );


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

    var cube = this.cube
    var targetCube = {x: 2, y: 0.05, z: 3 };
    this.cubeAnim = new TWEEN.Tween(cube.position)
      .to(targetCube, 2000)
      .easing(TWEEN.Easing.Exponential.Out)
      .onStart(() => {
        this.start()
        this.scene.add(cube)
        this.cubeRotation.delay(1000)
        this.cubeRotation.start()
      })
      .onStop(()=>{
        this.scene.remove(cube)
        this.cubeRotation.stop()
        cube.position.set(-2,2,-1)})
      .onComplete(() => {
        this.scene.remove(cube)
        cube.position.set(-2,2,-1)
    });
    this.cubeRotation = new TWEEN.Tween(cube.rotation)
      .to({x: 1.5}, 900)
      .easing(TWEEN.Easing.Quartic.In)
      .onStop(()=>{
        cube.rotation.set(0, 0, 0)})
      .onComplete(() => {
        cube.rotation.set(0, 0, 0)
    });

    var targetSphere = {x:-6, y: 0, z: -4};
    this.tweenSphere = new TWEEN.Tween(this.sphere1.position).to(targetSphere, 600)
    .easing(TWEEN.Easing.Exponential.Out)
    .onStart(() => {
      this.start()
      this.scene.add(this.sphere1)
    })
    .onUpdate(()=>{
      this.sphere1.rotation.y += 0.03
    })
    .onStop(()=>{
      this.scene.remove(this.sphere1)
      this.sphere1.position.set(6,0,0)
    })
    .onComplete(() => {
      this.scene.remove(this.sphere1)
      this.sphere1.position.set(6,0,0);
    });

    var sphere2Target = {x:0, y: 2.5, z: 2};
    this.sphere2Anim = new TWEEN.Tween(this.sphere2.position).to(sphere2Target, 700)
    .easing(TWEEN.Easing.Exponential.Out)
    .onStart(() => {
      this.start()
      this.scene.add(this.sphere2)
    })
    .onUpdate(()=>{
      this.sphere2.rotation.y += 0.02
    })
    .onStop(()=>{
      this.scene.remove(this.sphere2)
      this.sphere2.position.set(-6,2,2)
    })
    .onComplete(() => {
      this.scene.remove(this.sphere2)
      this.sphere2.position.set(-6,2,2)
    });

    var targetPlane = {y:-1.5}
    var plane = this.plane
    this.planeAnim = new TWEEN.Tween(plane.rotation).to(targetPlane, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.plane)
      // come back to this and make it more complex
      // maybe trigger smaller cubes in time?
    })
    .onStop(()=>{
      this.scene.remove(this.plane)
      plane.rotation.set(0, 0, 0)})
    .onComplete(() => {
      this.scene.remove(this.plane)
      plane.rotation.set(0, 0, 0)
    })

    this.coneAnim = new TWEEN.Tween(this.cone.position)
    .to({x:0,y:0,z: 6}, 2500)
    .easing(TWEEN.Easing.Exponential.Out)
    .onStart(()=>{
      this.scene.add(this.cone)
      this.coneRotation.delay(1000)
      this.coneRotation.start()
    })
    .onUpdate(()=>{
      this.cone.rotation.y += 0.03
    })
    .onStop(()=>{
      this.scene.remove(this.cone)
      this.coneRotation.stop()
      this.cone.position.set(0,2,-4)
    })
    .onComplete(()=>{
      this.scene.remove(this.cone)
      this.coneRotation.stop()
      this.cone.position.set(0,2,-4)
      this.cone.rotation.set(-1.5,0,0)
    })
    this.coneRotation = new TWEEN.Tween(this.cone.rotation)
    .to({x: -3}, 1000)
    .easing(TWEEN.Easing.Quartic.In)
    .onStop(()=>{
      this.cone.rotation.set(-1.5,0,0)
    })
    .onComplete(()=>{
    })

    this.cylAnim = new TWEEN.Tween(this.cylinder.position)
    .to({x: 20, y: 3, z: -2}, 2000)
    .easing(TWEEN.Easing.Linear.None)
    .onStart(()=>{
      this.scene.add(this.cylinder)
    })
    .onUpdate(()=>{
      this.cylinder.rotation.y += 0.01
    })
    .onStop(()=>{
      this.scene.remove(this.cylinder)
      this.cylinder.position.set(-20, 3, -2)
    })
    .onComplete(()=>{
      this.scene.remove(this.cylinder)
      this.cylinder.position.set(-20, 3, -2)
    })

    this.circAnim = new TWEEN.Tween(this.circle.position)
    .to({z:10}, 2000)
    .easing(TWEEN.Easing.Exponential.Out)
    .onStart(()=>{
      this.scene.add(this.circle)
    })
    .onStop(()=>{
      this.scene.remove(this.circle)
      this.circle.position.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove(this.circle)
      this.circle.position.set(0,0,0)
    })

    this.dodecAnim = new TWEEN.Tween(this.dodecahedron.position)
    .to({y: 1, z: 6}, 2000)
    .easing(TWEEN.Easing.Exponential.Out)
    .onStart(()=>{
      this.scene.add(this.dodecahedron)
      this.dodecRotation.delay(800)
      this.dodecRotation.start()
    })
    .onStop(()=>{
      this.scene.remove(this.dodecahedron)
      this.dodecRotation.stop()
      this.dodecahedron.position.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove(this.dodecahedron)
      this.dodecRotation.stop()
      this.dodecahedron.position.set(0,0,0)
    })
    this.dodecRotation = new TWEEN.Tween(this.dodecahedron.rotation)
    .to({y: 1.5}, 1200)
    .easing(TWEEN.Easing.Exponential.Out)
    .onStop(()=>{
      this.dodecahedron.rotation.set(0,0,0)
    })
    .onComplete(()=>{
      this.dodecahedron.rotation.set(0,0,0)
    })

    this.icosaAnim = new TWEEN.Tween(this.icosahedron.position)
    .to({y: 0, z: 3}, 1100)
    .easing(TWEEN.Easing.Quartic.InOut)
    .onStart(()=>{
      this.scene.add(this.icosahedron)
    })
    .onUpdate(()=>{
      this.icosahedron.rotation.y += 0.02
    })
    .onStop(()=>{
      this.scene.remove(this.icosahedron)
      this.icosahedron.position.set(0,5,2)
    })
    .onComplete(()=>{
      this.scene.remove(this.icosahedron)
      this.icosahedron.position.set(0,5,2)
    })

    this.octAnim = new TWEEN.Tween( this.octahedron.position )
    .to({x:2,y:2}, 1000)
    .easing(TWEEN.Easing.Quartic.InOut)
    .onStart(()=>{
      this.scene.add(this.octahedron)
    })
    .onUpdate(()=>{
      this.octahedron.rotation.x += 0.1
    })
    .onStop(()=>{
      this.scene.remove( this.octahedron )
      this.octahedron.position.set(-2, 2, 0)
    })
    .onComplete(()=>{
      this.scene.remove( this.octahedron )
      this.octahedron.position.set(-2, 2, 0)
    })

    this.torusAnim = new TWEEN.Tween(this.torus.position)
    .to({z:10}, 2000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.torus)
      this.torusRotation.delay(800)
      this.torusRotation.start()
    })
    .onStop(()=>{
      this.scene.remove(this.torus)
      this.torusRotation.stop()
      this.torus.position.set(0,0,-20)
    })
    .onComplete(()=>{
      this.scene.remove(this.torus)
      this.torus.position.set(0,0,-20)
      this.torus.rotation.set(0,0,0)
    })
    this.torusRotation = new TWEEN.Tween(this.torus.rotation)
    .to({y:3}, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStop(()=>{
      this.torus.rotation.set(0,0,0)
    })

    this.tetraAnim = new TWEEN.Tween(this.tetra.position)
    .to({x: -2}, 500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.tetra)
    })
    .onUpdate(()=>{
      this.tetra.rotation.x += 0.1
    })
    .onStop(()=>{
      this.scene.remove(this.tetra)
      this.tetra.position.set(2,3,-1)
    })
    .onComplete(()=>{
      this.scene.remove(this.tetra)
      this.tetra.position.set(2,3,-1)
    })

    this.circ2Anim = new TWEEN.Tween(this.circle2.position)
    .to({x: 4, y: -4}, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.circle2)
      this.circScale.start()
    })
    .onStop(()=>{
      this.scene.remove(this.circle2)
      this.circle2.position.set(-4, 4, 0)
      this.circScale.stop()
    })
    .onComplete(()=>{
      this.scene.remove(this.circle2)
      this.circle2.position.set(-4, 4, 0)
    })
    this.circScale = new TWEEN.Tween(this.circle2.scale)
    .to({x: 0.1, y: 0.1, z: 0.1}, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStop(()=>{
      this.circle2.scale.set(1,1,1)
    })
    .onComplete(()=>{
      this.circle2.scale.set(1,1,1)
    })

    this.cube2Anim = new TWEEN.Tween(this.cube2.scale)
    .to({x: 0.1, y: 0.1, z: 0.1}, 200)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.cube2)
    })
    .onStop(()=>{
      this.scene.remove(this.cube2)
      this.cube2.scale.set(1,1,1)
      let randomIntx = Math.random() < 0.5 ? -4 : 4;
      let randomInty = Math.random() < 0.5 ? -4 : 4;
      this.cube2.position.set(randomIntx, randomInty, 0)
    })
    .onComplete(()=>{
      this.scene.remove(this.cube2)
      this.cube2.scale.set(1,1,1)
      let randomIntx = Math.random() < 0.5 ? -4 : 4;
      let randomInty = Math.random() < 0.5 ? -4 : 4;
      this.cube2.position.set(randomIntx, randomInty, 0)
    })

    this.cube3Anim = new TWEEN.Tween(this.cube3.scale)
    .to({x:1,y:1,z:1}, 200)
    .easing(TWEEN.Easing.Linear.None)
    .onStart(()=>{
      let randomIntx = Math.random() < 0.5 ? -2.5 : 2.5;
      let randomInty = Math.random() < 0.5 ? -2.5 : 2.5;
      this.cube3.position.set(randomIntx, randomInty, 0)
      this.start()
      this.scene.add(this.cube3)
    })
    .onStop(()=>{
      this.scene.remove(this.cube3)
      this.cube3.scale.set(0.5,0.5,0.5)
      let randomIntx = Math.random() < 0.5 ? -2.5 : 2.5;
      let randomInty = Math.random() < 0.5 ? -2.5 : 2.5;
      this.cube3.position.set(randomIntx, randomInty, 0)
    })
    .onComplete(()=>{
      this.scene.remove(this.cube3)
      this.cube3.scale.set(0.5,0.5,0.5)
      let randomIntx = Math.random() < 0.5 ? -2.5 : 2.5;
      let randomInty = Math.random() < 0.5 ? -2.5 : 2.5;
      this.cube3.position.set(randomIntx, randomInty, 0)
    })

    this.cube4Anim = new TWEEN.Tween(this.cube4.scale)
    .to({x:2,y:2,z:2}, 200)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onStart(()=>{
      this.scene.add(this.cube4)
      let randomIntx = Math.random() < 0.5 ? 6 : -6;
      let randomInty = Math.random() < 0.5 ? 6 : -6;
      this.cube4.position.set(randomIntx, randomInty, 0)
    })
    .onStop(()=>{
      this.scene.remove(this.cube4)
      let randomIntx = Math.random() < 0.5 ? 6 : -6;
      let randomInty = Math.random() < 0.5 ? 6 : -6;
      this.cube4.position.set(randomIntx, randomInty, 0)
      this.cube4.scale.set(1,1,1)
    })
    .onComplete(()=>{
      this.scene.remove(this.cube4)
      let randomIntx = Math.random() < 0.5 ? 6 : -6;
      let randomInty = Math.random() < 0.5 ? 6 : -6;
      this.cube4.position.set(randomIntx, randomInty, 0)
      this.cube4.scale.set(1,1,1)
    })

    this.tetra2Anim = new TWEEN.Tween(this.tetra2.position)
    .to({x: 2, y:0, z:0}, 200)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onStart(()=>{
      this.tetra2.position.set(2, 2, 0)
      this.scene.add(this.tetra2)
    })
    .onStop(()=>{
      this.scene.remove(this.tetra2)
      this.tetra2.position.set(2, 2, 0)
      this.tetra2Anim2.stop()
    })
    .onComplete(()=>{
      this.tetra2Anim2.start()
    })
    this.tetra2Anim2 = new TWEEN.Tween(this.tetra2.position)
    .to({x: -6, y: 3, z: -5}, 800)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onStop(()=>{
      this.tetra2.position.set(2, 2, 0)
      this.scene.remove(this.tetra2)
    })
    .onComplete(()=>{
      this.scene.remove(this.tetra2)
      this.tetra2.position.set(2, 2, 0)
    })

    this.triAnim = new TWEEN.Tween(this.tri.position)
    .to({z:10}, 2200)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.tri)
    })
    .onUpdate(()=>{
      this.tri.rotation.z += 0.01
    })
    .onStop(()=>{
      this.scene.remove(this.tri)
      this.tri.position.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove(this.tri)
      this.tri.position.set(0,0,0)
    })

    this.hexAnim = new TWEEN.Tween(this.hex.position)
    .to({z:10}, 2200)
    .easing(TWEEN.Easing.Quartic.InOut)
    .onStart(()=>{
      this.scene.add(this.hex)
    })
    .onStop(()=>{
      this.scene.remove(this.hex)
      this.hex.position.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove(this.hex)
      this.hex.position.set(0,0,0)
    })

    this.growAnim = new TWEEN.Tween(this.grow.rotation)
    .to({y:6}, 2500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onStart(()=>{
      this.scene.add(this.grow)
    })
    .onStop(()=>{
      this.scene.remove(this.grow)
      this.grow.rotation.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove(this.grow)
      this.grow.rotation.set(0,0,0)
    })

    this.ico2Anim = new TWEEN.Tween(this.ico2.position)
    .to({y: 0, z: 3}, 1100)
    .easing(TWEEN.Easing.Quartic.InOut)
    .onStart(()=>{
      this.scene.add(this.ico2)
    })
    .onUpdate(()=>{
      this.ico2.rotation.y += 0.02
    })
    .onStop(()=>{
      this.scene.remove(this.ico2)
      this.ico2.position.set(0,-5,2)
    })
    .onComplete(()=>{
      this.scene.remove(this.ico2)
      this.ico2.position.set(0,-5,2)
    })

    this.toyboxAnim = new TWEEN.Tween(this.toybox.position)
    .to({y: 0, z: -30}, 4000)
    .easing(TWEEN.Easing.Quartic.In)
    .onStart(()=>{
      this.scene.add(this.toybox)
    })
    .onUpdate(()=>{
      this.toybox.rotation.y += 0.1
    })
    .onStop(()=>{
      this.scene.remove(this.toybox)
      this.toybox.position.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove(this.toybox)
      this.toybox.position.set(0,0,0)
    })

    this.hatAnim = new TWEEN.Tween(this.hat.position)
    .to({x:-3.5, y: -3.5, z: -1}, 1000)
    .onStart(()=>{
      this.scene.add( this.hat )
    })
    .onUpdate(()=>{
      this.hat.rotation.y += 0.05
    })
    .onStop(()=>{
      this.scene.remove( this.hat )
      this.hat.position.set(0,0,0)
    })
    .onComplete(()=>{
      this.scene.remove( this.hat )
      this.hat.position.set(0,0,0)
    })

    this.cylinder2Anim = new TWEEN.Tween(this.cylinder2.position)
    .to({z:0}, 1000)
    .onStart(()=>{
      this.scene.add( this.cylinder2 )
    })
    .onUpdate(()=>{
      this.cylinder2.rotation.y += 0.02
    })
    .onStop(()=>{
      this.scene.remove( this.cylinder2 )
      this.cylinder2.position.set(0,0,-10)
    })
    .onComplete(()=>{
      this.scene.remove( this.cylinder2 )
      this.cylinder2.position.set(0,0,-10)
    })

    this.octAnim = new TWEEN.Tween(this.oct.position)
    .to({z: -10}, 1000)
    .onStart(()=>{
      this.scene.add( this.oct )
    })
    .onUpdate(()=>{
      this.oct.rotation.z += 0.05
    })
    .onStop(()=>{
      this.scene.remove( this.oct )
      this.oct.position.set(0,0,10)
    })
    .onComplete(()=>{
      this.scene.remove( this.oct )
      this.oct.position.set(0,0,10)
    })








    this.start() // start three.js animation on mount
  };

  componentWillMount() {
    this.resize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.updateProjectionMatrix();
    }
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
        this.cubeAnim.stop()
        this.cubeAnim.start();
        this.sample.triggerAttack('G6')
      },
      'b': () => {
        this.sample.triggerRelease('C3');
        this.planeAnim.stop()
        this.planeAnim.start();
        this.sample.triggerAttack('C3');
      },
      'c': () => {
        this.sample.triggerRelease('D3')
        // this.create('c', 'pink', {x:-6, y: 1, z: -2}, 1, 2, 0, 800);
        this.coneAnim.stop()
        this.coneAnim.start()
        this.sample.triggerAttack('D3')
      },
      'd': () => {
        this.sample.triggerRelease('E3')
        // this.create('d', 'blue', {x:4, y: -1, z: -2}, 0, 0, -1, 600)
        this.circAnim.stop()
        this.circAnim.start()
        this.sample.triggerAttack('E3')
      },
      'e': () => {
        this.sample.triggerRelease('F3')
        // this.create('e', 'yellow', {x:2, y: -3, z: 0}, 1, 2, 1, 400)
        this.icosaAnim.stop()
        this.icosaAnim.start()
        this.sample.triggerAttack('F3')
      },
      'f': () => {
        this.sample.triggerRelease('G3')
        this.sphere2Anim.stop()
        this.sphere2Anim.start()
        this.sample.triggerAttack('G3')
      },
      'g': () => {
        this.sample.triggerRelease('A3');
        this.tweenSphere.stop();
        this.tweenSphere.start();
        this.sample.triggerAttack('A3');
      },
      'h': () => {
        this.sample.triggerRelease('B3')
        // this.create('h', 'orange', {x:2, y: -5, z: 2}, 0.4, 0.3, 2, 400)
        this.octAnim.stop()
        this.octAnim.start()
        this.sample.triggerAttack('B3')

      },
      'i': () => {
        this.sample.triggerRelease('C4')
        // this.create('i', 'aliceblue', {x:-2, y: -4, z: 7}, 0.8, 0.2, 0.1, 400)
        this.torusAnim.stop()
        this.torusAnim.start()
        this.sample.triggerAttack('C4')

      },
      'j': () => {
        this.sample.triggerRelease('D4')
        this.tetraAnim.stop()
        this.tetraAnim.start()
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
        this.circ2Anim.stop()
        this.circ2Anim.start()
        this.sample.triggerAttack('F4')

      },
      'm': () => {
        this.sample.triggerRelease('G4')
        this.cube2Anim.stop()
        this.cube2Anim.start()
        this.sample.triggerAttack('G4')
      },
      'n': () => {
        this.sample.triggerRelease('A4')
        this.cube3Anim.stop()
        this.cube3Anim.start()
        this.sample.triggerAttack('A4')
      },
      'o': () => {
        this.sample.triggerRelease('B4')
        this.cube4Anim.stop()
        this.cube4Anim.start()
        this.sample.triggerAttack('B4')

      },
      'p': () => {
        this.sample.triggerRelease('C5')
        this.tetra2Anim.stop()
        this.tetra2Anim.start()
        this.sample.triggerAttack('C5')

      },
      'q': () => {
        this.sample.triggerRelease('D5')
        this.triAnim.stop()
        this.triAnim.start()
        this.sample.triggerAttack('D5')

      },
      'r': () => {
        this.sample.triggerRelease('E5')
        this.hexAnim.stop()
        this.hexAnim.start()
        this.sample.triggerAttack('E5')
      },
      's': () => {
        this.sample.triggerRelease('F5')
        this.dodecAnim.stop()
        this.dodecAnim.start()
        this.sample.triggerAttack('F5')
      },
      't': () => {
        this.sample.triggerRelease('G5')
        this.toyboxAnim.stop()
        this.toyboxAnim.start()
        this.sample.triggerAttack('G5')
      },
      'u': () => {
        this.sample.triggerRelease('A5')
        this.growAnim.stop()
        this.growAnim.start()
        this.sample.triggerAttack('A5')
      },
      'v': () => {
        this.sample.triggerRelease('B5')
        this.hatAnim.stop()
        this.hatAnim.start()
        this.sample.triggerAttack('B5')
      },
      'w': () => {
        this.sample.triggerRelease('C6')
        this.cylAnim.stop()
        this.cylAnim.start()
        this.sample.triggerAttack('C6')
      },
      'x': () => {
        this.sample.triggerRelease('D6');
        this.octAnim.stop()
        this.octAnim.start()
        this.sample.triggerAttack('D6');
      },
      'y': () => {
        this.sample.triggerRelease('E6');
        this.ico2Anim.stop()
        this.ico2Anim.start()
        this.sample.triggerAttack('E6');
      },
      'z': () => {
        this.sample.triggerRelease('F6');
        this.cylinder2Anim.stop()
        this.cylinder2Anim.start()
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
