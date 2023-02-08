/*let ghost = [];
function initGhosts() {
  const ghost = new Ghost();
  ghosts.push(ghost);
}

document.addEventListener("keydown", function (e) {
  const heroLeft = getComputedStyle(heroElement).left;

  const heroLeftWithoutPx = Number(heroLeft.split("px")[0]);

  // 왼쪽 화살표를 눌렀는데, 용사 위치의 left가 0보다 마이너스(좌측) 일때
  if (heroLeftWithoutPx - 10 < 0 && e.keyCode === 37) {
    return;
  }

  // 오른쪽 화살표를 눌렀는데, 용사 위치의 right가 765보다 마이너스(좌측) 일때
  if (heroLeftWithoutPx + 10 > BG_WIDTH - HERO_WIDTH && e.keyCode === 39) {
    return;
  }

  if (e.keyCode === 37) {
    //왼쪽키
    heroElement.classList.remove("stop", "right");
    heroElement.classList.add("left");
    heroElement.style.left = heroLeftWithoutPx - 30 + "px";
  } else if (e.keyCode === 39) {
    //오른쪽키
    heroElement.classList.remove("stop", "left");
    heroElement.classList.add("right");
    heroElement.style.left = heroLeftWithoutPx + 30 + "px";
  } else {
    heroElement.classList.remove("left", "right");
    heroElement.classList.add("stop");
  }
});*/
const player = new Hero();
let ghosts = [];

document.getElementById("start_button").addEventListener("click", game_start);

function game_start() {
  function init() {
    document.addEventListener(
      "keydown",
      function (e) {
        checkKey(e, true);
      },
      false
    );

    document.addEventListener(
      "keyup",
      function (e) {
        checkKey(e, false);
      },
      false
    );

    setInterval(function () {
      initGhosts();
    }, 2000);

    window.requestAnimationFrame(loop);
  }

  function checkKey(e, value) {
    const keyID = e.keyCode || e.which;

    switch (keyID) {
      case 39: //right
        player.isRightKey = value;
        e.preventDefault();
        break;
      case 37: //left
        player.isLeftKey = value;
        e.preventDefault();
        break;
    }
  }

  function initGhosts() {
    const ghost = new Ghost();
    ghosts.push(ghost);
  }

  function updateAllghosts() {
    ghosts.forEach((el, idx) => {
      if (!el.isDead) {
        el.move(player);
      } else {
        ghosts.splice(idx, 1);
      }
    });
  }

  function loop() {
    if (
      (seconds =
        0 ||
        document.getElementById("got") === 10 ||
        document.getElementById("heart5") ===
          '<i class="fa-regular fa-heart fa-2x"></i>')
    ) {
      return;
    }
    player.checkDirection();
    updateAllghosts();
    window.requestAnimationFrame(loop);
  }

  let timeoutHandle;
  function countdown(minutes, seconds) {
    function tick() {
      let counter = document.getElementById("timer");
      counter.innerHTML =
        minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
      seconds--;
      if (seconds >= 0) {
        timeoutHandle = setTimeout(tick, 1000);
      } else {
        if (minutes >= 1) {
          // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
          setTimeout(function () {
            countdown(minutes - 1, 59);
          }, 1000);
        }
      }
    }
    tick();
  }

  countdown(0, 30); // 이 부분을 변경하면 시간을 바꿀수 있다

  init();
}

if (
  (seconds = 0) ||
  document.getElementById("got") === 10 ||
  document.getElementById("heart5") ===
    '<i class="fa-regular fa-heart fa-2x"></i>'
) {
  target = document.getElementById("bg");
  target.style.color = "black";
}
