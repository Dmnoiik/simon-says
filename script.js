const colors = ["red", "blue", "green", "yellow"];
const btns = document.querySelectorAll("button");
const pointsEl = document.querySelector(".points");
let level = 1;
let isComputerPlaying = false;
const computerSequence = [];
let playerSequence = [];

function getSequence() {
  for (let i = 0; i < level; i++) {
    computerSequence.push(colors[Math.floor(Math.random() * 4)]);
  }
}
getSequence();
const checkSequences = (playerArr, computerArr) => {
  console.log(playerArr, computerArr);
  for (let i = 0; i < playerArr.length; i++) {
    if (playerArr[i] !== computerArr[i]) {
      console.log("Game Over");
      return;
    }
  }
  if (playerArr.length === computerArr.length) {
    playerSequence = [];
    console.log("End of level, congrats!");
    level++;
    pointsEl.textContent = level;
    computerSequence.push(colors[Math.floor(Math.random() * 4)]);
    computerPlay();
  }
};
const computerPlay = () => {
  isComputerPlaying = true;
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < computerSequence.length) {
      const currentColor = computerSequence[index];
      const currentBtn = document.querySelector(`.${currentColor}`);
      currentBtn.classList.add("active");
      setTimeout(() => {
        currentBtn.classList.remove("active");
        index++;
      }, 1000);
    } else {
      clearInterval(intervalId);
      isComputerPlaying = false;
    }
  }, 2000);
};

computerPlay();
const playerPlay = () => {
  btns.forEach((button) =>
    button.addEventListener("click", (e) => {
      if (isComputerPlaying) {
        return;
      } else {
        playerSequence.push(e.target.classList.value);
        checkSequences(playerSequence, computerSequence);
      }
    })
  );
};
playerPlay();
