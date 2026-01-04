const message = "我必須把這個詛咒分散出去。雖然對不起你，但這是唯一的辦法。看到牆上那些黑色的咒文了嗎？那不是祝福，那是封印。聽著，如果你想活命，絕對不要在心裡默唸那個名號。現在，請跟著我一起做，這能減輕我的負擔，也能暫時保住你的命：「火佛修一，心薩嘸哞」記住，當你感覺到脖子發癢、背後發涼時，佛母已經在看著你了。"; 
const characters = message.split('');
const displayElement = document.getElementById('text-display');
const finalScreen = document.getElementById('final-white-screen');
const bgMusic = document.getElementById('background-music');

const charDisplayDuration = 430; 
const totalDisplayTime = 63 * 1000; // 總長度 63 秒

let charIndex = 0;
let intervalId;

window.onload = () => {
    document.body.addEventListener('click', startSequence, { once: true });
    displayElement.innerText = "點擊任意處開始"; 
    displayElement.style.opacity = 1;
    displayElement.style.color = "grey";
};

function startSequence() {
    // --- 新增：強制開啟全螢幕 ---
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }

    displayElement.style.color = "red"; 
    displayElement.innerText = ""; 
    bgMusic.play(); 
    
    // 開始字元循環顯示
    intervalId = setInterval(showNextChar, charDisplayDuration); 
    
    // 設定結束時間
    setTimeout(endSequence, totalDisplayTime);
}

function showNextChar() {
    if (charIndex >= characters.length) {
        charIndex = 0; 
    }

    displayElement.innerText = characters[charIndex]; 
    displayElement.style.opacity = 1; 

    setTimeout(() => {
        displayElement.style.opacity = 0;
    }, charDisplayDuration - 50); 

    charIndex++; 
}

function endSequence() {
    clearInterval(intervalId); 
    bgMusic.pause(); 
    displayElement.style.display = 'none'; 
    
    // 顯示全白螢幕
    finalScreen.classList.remove('hidden'); 

    // --- 新增：過 5 秒後跳回 INDEX.HTML ---
    setTimeout(() => {
        // 離開全螢幕
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        
        // 跳轉頁面
        window.location.href = 'index.html';
    }, 5000); // 5000 毫秒 = 5 秒
}