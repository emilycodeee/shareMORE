import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

// const Fireworks = () => {
//   let isAnimationEnabled = false;
//   let animationInstance = null;
//   let intervalId = null;

//   const getAnimationSettings = (originXA, originXB) => {
//     return {
//       angle: randomInRange(55, 125),
//       spread: randomInRange(50, 70),
//       ticks: 180,
//       zIndex: 0,
//       particleCount: randomInRange(50, 100),
//       origin: { y: 0.6 },
//     };
//   };

//   const startAnimation = () => {
//     for (let i = 0; i < 3; i++) {
//       animationInstance = getAnimationSettings(0.1, 0.3);
//     }
//   };

//   const handlerClickStart = () => {
//     startAnimation();
//   };

//   const getInstance = (instance) => {
//     animationInstance = instance;
//   };

//   return (
//     <>
//       <div>
//         <button onClick={handlerClickStart}>Start</button>
//       </div>
//       <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
//     </>
//   );
// };
///////////////////////////////////////////////////////
export default class Fireworks extends React.Component {
  constructor(props) {
    super(props);
    this.isAnimationEnabled = false;
    this.animationInstance = null;
    this.intervalId = null;
  }

  getAnimationSettings(originXA, originXB) {
    return {
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      ticks: 180,
      zIndex: 0,
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    };
  }

  startAnimation() {
    for (let i = 0; i < 3; i++) {
      this.animationInstance(this.getAnimationSettings(0.1, 0.3));
    }
  }

  handlerClickStart = () => {
    this.startAnimation();
  };

  getInstance = (instance) => {
    this.animationInstance = instance;
  };

  render() {
    return (
      <>
        <div>
          <button onClick={this.handlerClickStart}>Start</button>
        </div>
        <ReactCanvasConfetti
          refConfetti={this.getInstance}
          style={canvasStyles}
        />
      </>
    );
  }
}

// export default Fireworks;
