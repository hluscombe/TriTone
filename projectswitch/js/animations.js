let renderer, scene, camera, floor, cube, sphere, light, step = 0

let width = window.innerWidth;
let height = window.innerHeight;
let center = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setClearColor("#000000");
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.shadowMap.enabled = true;
  mount.appendChild(renderer.domElement);
  window.addEventListener("resize", resize);
};

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);
}

function createLight() {
  const light = new THREE.PointLight("#ffffff");
  light.castShadow = true;
  light.position.set(10, 60, 10);
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  return light;
}

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}

function animate(time) {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color('white');
  camera = createCamera();
  const axes = new THREE.AxesHelper(100);
  scene.add(axes);
  window.addEventListener("keydown", keyIsPressed, true);
  animate();
}

function createCube() {
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
  const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'red', wireframe: false })
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
}

function sphereGeometry() {
  const sphereGeometry = new THREE.SphereGeometry(2, 20, 20)
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 'blue', wireframe: false })
  const dec = new THREE.Mesh(sphereGeometry, sphereMaterial)
}

function polyGeometry() {
  const decGeometry = new THREE.SphereGeometry(1, 20, 20)
  const decMaterial = new THREE.MeshLambertMaterial({ color: 'green', wireframe: true })
  const sphere = new THREE.Mesh(decGeometry, decMaterial)
}

function createPlane() {
  const planeGeometry = new THREE.PlaneGeometry(5, 5)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 'white', side: THREE.DoubleSide})
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
}

var targetCube = {x: 2, y: 0.05, z: 3 };
// cube.matrixAutoUpdate = false;
let tween = new TWEEN.Tween(cube.position)
  .to(targetCube, 1200)
  .easing(TWEEN.Easing.Exponential.Out)
  .onStart(() => {

    scene.add(cube)
    tweenRotation.delay(300)
    tweenRotation.start()
  })
  .onStop(()=>{
    scene.remove(cube)
    tweenRotation.stop()
    cube.position.set(0, 0, 0)})
  .onComplete(() => {
    scene.remove(cube)
    cube.position.set(0, 0, 0)
});

  let tweenRotation = new TWEEN.Tween(cube.rotation).to({x: 1.5}, 600)
  .easing(TWEEN.Easing.Quartic.In)
  .onStop(()=>{
    cube.rotation.set(0, 0, 0)})
  .onComplete(() => {
    cube.rotation.set(0, 0, 0)
  });

  var targetSphere = {x:-1, y: 1, z: -2};

  tweenSphere = new TWEEN.Tween(sphere.position).to(targetSphere, 1000)
  .easing(TWEEN.Easing.Quartic.Out)
  .onUpdate(()=>{sphere.rotation.y++})
  .onStop(()=>{
    scene.remove(sphere)
    sphere.position.set(0, 0, 0)})
  .onComplete(() => {
    scene.remove(sphere)
    sphere.position.set(0, 0, 0);
  });;


  var targetPlane = {y:-1.5};
  var plane = plane
  tweenPlane = new TWEEN.Tween(plane.rotation).to(targetPlane, 500)
  .easing(TWEEN.Easing.Linear.None)
  .onStop(()=>{
    scene.remove(plane)
    plane.rotation.set(0, 0, 0)})
  .onComplete(() => {
    scene.remove(plane)
    plane.rotation.set(0, 0, 0);
  });


const create = (objName, colour, target, x, y, z, duration) => {
  const material = new THREE.MeshLambertMaterial({ color: colour})
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const obj = new THREE.Mesh(geometry, material)

  let position = obj.position.set(x, y, z);
  const objTarget = target || {x:1, y: -1, z: -2};

  const tweenObj = new TWEEN.Tween(position).to(objTarget, duration)
  .easing(TWEEN.Easing.Quartic.InOut)
  .onStart(() => {
    scene.remove(obj)
    scene.add(obj)
    objects.push(objName)
  })
  .onStop(() => {
    scene.remove(obj)
    geometry.dispose()
    material.dispose()
  })
  .onComplete(() => {
    scene.remove(obj)
    geometry.dispose()
    material.dispose()
  }).start();
}

function keyIsPressed(e) {
  if (e.repeat) {
    return;
  }
  if (!e.key.match(/^[a-z]$/i)) {
    return;
  }
  console.log(`${e.key} is pressed`);
  const addObject = {
    'a': () => {
      sample.triggerRelease('G6')
      tween.stop()
      tween.start();
      sample.triggerAttack('G6')
    },
    'b': () => {
      sample.triggerRelease('C3');
      tweenPlane.stop()
      scene.remove(plane);
      scene.add(plane)
      tweenPlane.start();
      sample.triggerAttack('C3');
    },
    'c': () => {
      sample.triggerRelease('D3')
      create('c', 'pink', {x:-6, y: 1, z: -2}, 1, 2, 0, 800);
      sample.triggerAttack('D3')
    },
    'd': () => {
      sample.triggerRelease('E3')
      create('d', 'blue', {x:4, y: -1, z: -2}, 0, 0, -1, 600)
      sample.triggerAttack('E3')
    },
    'e': () => {
      sample.triggerRelease('F3')
      create('e', 'yellow', {x:2, y: -3, z: 0}, 1, 2, 1, 400)
      sample.triggerAttack('F3')
    },
    'f': () => {
      sample.triggerRelease('G3')
      sample.triggerAttack('G3')

    },
    'g': () => {
      sample.triggerRelease('A3');
      tweenSphere.stop();
      sphere.position.set(0, 0, 0)
      scene.remove(sphere);
      scene.add(sphere)
      // start()
      tweenSphere.start();
      sample.triggerAttack('A3');

    },
    'h': () => {
      sample.triggerRelease('B3')
      create('h', 'orange', {x:2, y: -5, z: 2}, 0.4, 0.3, 2, 400)
      sample.triggerAttack('B3')

    },
    'i': () => {
      sample.triggerRelease('C4')
      create('i', 'aliceblue', {x:-2, y: -4, z: 7}, 0.8, 0.2, 0.1, 400)
      sample.triggerAttack('C4')

    },
    'j': () => {
      sample.triggerRelease('D4')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('D4')

    },
    'k': () => {
      sample.triggerRelease('E4')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('E4')

    },
    'l': () => {
      sample.triggerRelease('F4')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('F4')

    },
    'm': () => {
      sample.triggerRelease('G4')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('G4')

    },
    'n': () => {
      sample.triggerRelease('A4')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('A4')
    },
    'o': () => {
      sample.triggerRelease('B4')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('B4')

    },
    'p': () => {
      sample.triggerRelease('C5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('C5')

    },
    'q': () => {
      sample.triggerRelease('D5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('D5')

    },
    'r': () => {
      sample.triggerRelease('E5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('E5')
    },
    's': () => {
      sample.triggerRelease('F5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('F5')
    },
    't': () => {
      sample.triggerRelease('G5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('G5')
    },
    'u': () => {
      sample.triggerRelease('A5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('A5')
    },
    'v': () => {
      sample.triggerRelease('B5')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('B5')
    },
    'w': () => {
      sample.triggerRelease('C6')
      scene.remove(cube);
      scene.add(cube)
      start()
      sample.triggerAttack('C6')
    },
    'x': () => {
      sample.triggerRelease('D6');
      sample.triggerAttack('D6');
    },
    'y': () => {
      sample.triggerRelease('E6');
      sample.triggerAttack('E6');
    },
    'z': () => {
      sample.triggerRelease('F6');
      sample.triggerAttack('F6');
    }
  }
  addObject[ e.key ]()
}
window.addEventListener("resize", resize);
