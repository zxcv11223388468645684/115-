const darkness = document.getElementById("darkness");
const jumpScare = document.getElementById("jumpScare");
const eye = document.querySelector(".eye");
const pupil = document.querySelector(".pupil");
const curseText = document.getElementById("curseText");

const correct = ["火", "佛", "修", "一"];
let input = [];

/* 手電筒 + 眼球 */
document.addEventListener("mousemove", e => {
  darkness.style.background =
    `radial-gradient(circle 120px at ${e.clientX}px ${e.clientY}px,
    transparent 50%, rgba(0,0,0,0.95) 70%)`;

  const rect = eye.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const angle = Math.atan2(dy, dx);

  const moveX = Math.cos(angle) * 18;
  const moveY = Math.sin(angle) * 18;

  pupil.style.transform = `
    translate(${moveX}px, ${moveY}px)
    scale(${Math.min(1.6, Math.abs(dx + dy) / 300 + 1)})
  `;
});


/* 解謎 */
document.querySelectorAll(".symbol").forEach(btn => {
  btn.onclick = () => {
    input.push(btn.innerText);

    if (!check()) {
      scare();
    }

    if (input.length === correct.length) {
      curseText.innerText = "詛咒解除";
      eye.style.display = "none";
    }
  };
});

function check() {
  return input.every((v, i) => v === correct[i]);
}

function scare() {
  input = [];

  // 👁️ 眼球進入暴走狀態
  eye.classList.add("angry");

  // 👻 Jump Scare 出現
  jumpScare.style.display = "flex";

  setTimeout(() => {
    jumpScare.style.display = "none";
    curseText.innerText = "你還在這裡";

    // 👁️ 眼球恢復正常
    eye.classList.remove("angry");
  }, 1500);
}


const bloodRain = document.getElementById("bloodRain");

function createBloodDrop() {
  const drop = document.createElement("div");
  drop.className = "blood-drop";

  // 隨機位置
  drop.style.left = Math.random() * window.innerWidth + "px";

  // 隨機大小
  const width = Math.random() * 3 + 2;
  const height = Math.random() * 20 + 10;
  drop.style.width = width + "px";
  drop.style.height = height + "px";

  // 隨機速度（景深）
  const duration = Math.random() * 2 + 1.5;
  drop.style.animationDuration = duration + "s";

  // 隨機透明度
  drop.style.opacity = Math.random() * 0.5 + 0.3;

  bloodRain.appendChild(drop);

  // 清掉離開畫面的血滴
  setTimeout(() => {
    drop.remove();
  }, duration * 1000);
}

// 控制血雨密度（數字越小越多）
setInterval(createBloodDrop, 5);
