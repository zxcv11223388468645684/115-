const correctMantra = ["火", "佛", "修", "一", "心", "薩", "嘸", "哞"];
let progress = 0;

const startGate = document.getElementById('start-gate');
const btnSacrifice = document.getElementById('btn-sacrifice');
const gameView = document.getElementById('game-view');
const redOverlay = document.getElementById('red-overlay');
const audioBg = document.getElementById('audio-bg');

// 1. 首頁點擊：啟動全螢幕與遊戲
btnSacrifice.addEventListener('click', () => {
    document.documentElement.requestFullscreen();
    startGate.classList.add('hidden');
    gameView.classList.remove('hidden');
    audioBg.play();
    initMantra();
});

// 2. 初始化亂序咒語
function initMantra() {
    const container = document.getElementById('mantra-container');
    container.innerHTML = '';
    const shuffled = [...correctMantra].sort(() => Math.random() - 0.5);
    
    shuffled.forEach(text => {
        const span = document.createElement('span');
        span.className = 'char';
        span.innerText = text;
        span.onclick = () => handleInput(text, span);
        container.appendChild(span);
    });
}

// 3. 處理點擊與生理不適感升級
function handleInput(char, element) {
    if (char === correctMantra[progress]) {
        progress++;
        element.style.color = "red";
        element.style.pointerEvents = "none";
        
        // 增加不適感：變紅
        const opacity = progress / correctMantra.length;
        redOverlay.style.background = `rgba(255, 0, 0, ${opacity * 0.4})`;
        
        // 增加不適感：生出更多蟲子
        spawnBugs(progress * 5);
        
        if (progress === correctMantra.length) {
            triggerEnding();
        }
    } else {
        // 點錯懲罰：全螢幕抖動並重置
        progress = 0;
        document.body.style.animation = "shake 0.2s 5";
        document.getElementById('audio-scream').play();
        setTimeout(() => {
            document.body.style.animation = "";
            initMantra();
            redOverlay.style.background = "rgba(255,0,0,0)";
        }, 500);
    }
}

// 4. 生成蟲子
function spawnBugs(count) {
    for (let i = 0; i < count; i++) {
        const bug = document.createElement('div');
        bug.className = 'bug';
        bug.style.left = Math.random() * 100 + 'vw';
        bug.style.top = Math.random() * 100 + 'vh';
        bug.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(bug);
        
        // 讓蟲子亂跑
        setInterval(() => {
            bug.style.left = (parseFloat(bug.style.left) + (Math.random() - 0.5) * 5) + 'vw';
            bug.style.top = (parseFloat(bug.style.top) + (Math.random() - 0.5) * 5) + 'vh';
        }, 100);
    }
}

// 5. 終極結局
function triggerEnding() {
    document.getElementById('final-eye-layer').classList.remove('hidden');
    audioBg.playbackRate = 0.5; // 音速變慢變詭異
    
    setTimeout(() => {
        // 自動跳轉到預告片
        window.location.href = "https://www.youtube.com/watch?v=MG68_Vxhx18";
    }, 4000);
}

function triggerEnding() {
    const jumpscare = document.getElementById('jumpscare-image');
    const scream = document.getElementById('audio-scream');
    
    // 1. 先進入黑屏
    document.getElementById('game-view').classList.add('hidden');
    
    // 2. 延遲 1.5 秒後突然彈出驚嚇
    setTimeout(() => {
        jumpscare.style.display = 'block'; // 顯示驚嚇圖
        document.body.classList.add('shaking-hard'); // 全螢幕劇烈抖動
        
        // 播放震耳欲聾的尖叫
        scream.volume = 1.0; 
        scream.play();

        // 3. 驚嚇持續 2 秒後跳轉
        setTimeout(() => {
            window.location.href = "https://www.youtube.com/watch?v=MG68_Vxhx18";
        }, 2000);
        
    }, 1500);
}
