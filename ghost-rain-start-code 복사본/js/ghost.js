function randomRange(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

let got_score = 1;
let num = 1;

class Ghost {
  constructor() {
    this.isDead = false;
    this.create();
  }

  create() {
    this.ghostElement = document.createElement("div");
    this.top = 0;

    this.ghostElement.style.position = "absolute";
    this.ghostElement.style.top = this.top + "px";
    this.ghostElement.style.left =
      randomRange(0, BG_WIDTH - GHOST_WIDTH) + "px";

    this.ghostElement.style.width = GHOST_WIDTH + "px";
    this.ghostElement.style.height = GHOST_HEIGHT + "px";
    this.ghostElement.style.background = 'url("./images/ghost.png") no-repeat';

    bg.appendChild(this.ghostElement);
  }

  move(hero) {
    this.top++;

    if (this.top > BG_HEIGHT - (HERO_HEIGHT + GHOST_HEIGHT)) {
      const ghostLeft = Number(this.ghostElement.style.left.split("px")[0]);

      if (
        hero.left < ghostLeft + GHOST_WIDTH &&
        hero.left + HERO_WIDTH > ghostLeft
      ) {
        this.isDead = true;
        this.die();
        return;
      }

      if (this.top > BG_HEIGHT - GHOST_HEIGHT) {
        this.isDead = true;
        this.remove();
        let changing = document.getElementById("heart" + num);
        changing.innerHTML = "<i class='fa-regular fa-heart fa-2x'></i>";
        num++;
        return;
      }
    }

    this.ghostElement.style.top = this.top + "px";
  }

  remove() {
    this.ghostElement.remove();
  }

  die() {
    this.ghostElement.style.backgroundPosition = "-45px";

    const soundEffect = new Audio("./audio/dying.wav");
    soundEffect.play();
    let score_counter = document.getElementById("got");
    score_counter.innerHTML = String(got_score);
    got_score++;

    setTimeout(() => {
      this.remove();
    }, 2000);
  }
}
