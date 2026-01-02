/* 開門動畫 */
const door = document.getElementById("door");

if (door) {
  door.addEventListener("click", () => {
    door.classList.add("open");

    setTimeout(() => {
      window.location.href = "homepage.html";
    }, 2000);
  });
}

/* 主站內容頁面切換 */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* 滑入卡片音效 */
function playSfx() {
  const audio = document.getElementById('sfx');
  audio.currentTime = 0;
  audio.play();
}

/* 手電筒滑鼠追蹤 */
document.addEventListener('mousemove', (e) => {
  document.body.style.setProperty('--x', e.clientX + 'px');
  document.body.style.setProperty('--y', e.clientY + 'px');
});
