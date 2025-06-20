

const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;
let highScore = localStorage.getItem("highScore") || 0;

document.addEventListener("keydown", () => {
  if (started== false) {
    console.log("game started")
  started = true;
     nextSequence();
   }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", event => {
    const chosenColor = event.target.id;
    userPattern.push(chosenColor);
    console.log(`user clicked:${chosenColor}`)
    animatePress(chosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

const nextSequence = () => {
  userPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  flashButton(randomColor);
  
};

const flashButton = (color) => {
  const btn = document.getElementById(color);
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 200);
  console.log(`${color}`)
};

const animatePress = (color) => {
  const btn = document.getElementById(color);
  btn.style.transform = "scale(0.9)";
  setTimeout(() => {
    btn.style.transform = "scale(1)";
  }, 100);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {

    if (userPattern.length === gamePattern.length) {
      console.log("full sequence correct. moving to next level")
      setTimeout(nextSequence, 1000);

    }
  } else {
    // Update high score if needed
    console.log(`wrong input! Expected ${gamePattern[currentLevel]} but got ${userPattern[currentLevel]}`)
    if (level - 1 > highScore) {
      highScore = level - 1;
      localStorage.setItem("highScore", highScore);
      console.log("new highscore achieved :", highScore)
      
    }

    // Show Game Over Message
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent =
      `Game Over! You scored ${level - 1}. High Score: ${highScore}. Press Any Key to Restart;`

    setTimeout(() => document.body.classList.remove("game-over"), 200);
    resetGame();
  }
};

const resetGame = () => {
  level = 0;
  gamePattern = [];
  started = false;
};


