import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// import * as THREE from "three";
// import React from "react";
// import ReactDOM from "react-dom";
// import { Canvas } from "react-three-fiber";
//
// function Thing({ vertices, color }) {
//   return (
//     <group ref={ref => console.log("we have access to the instance")}>
//       <line>
//         <geometry
//           attach="geometry"
//           vertices={vertices.map(v => new THREE.Vector3(...v))}
//           onUpdate={self => (self.verticesNeedUpdate = true)}
//         />
//         <lineBasicMaterial attach="material" color="black" />
//       </line>
//       <mesh
//         onClick={e => console.log("click")}
//         tabIndex="0"
//         onKeyDown={e => console.log("key")}
//         onPointerOver={e => console.log("hover")}
//         onPointerOut={e => console.log("unhover")}
//       >
//         <octahedronGeometry attach="geometry" />
//         <meshBasicMaterial
//           attach="material"
//           color="peachpuff"
//           opacity={0.5}
//           transparent
//         />
//       </mesh>
//     </group>
//   );
// }
//
// ReactDOM.render(
//   <Canvas tabIndex={0} onKeyDown={event => console.log(event.key)}>
//     <Thing
//       vertices={[[-1, 0, 0], [0, 1, 0], [1, 0, 0], [0, -1, 0], [-1, 0, 0]]}
//     />
//   </Canvas>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
