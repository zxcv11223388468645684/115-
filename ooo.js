// 替換成你想顯示的文字
const message = "火佛修一心薩嘸哞 火佛修一心薩嘸哞 "; 
const characters = message.split(''); // 將訊息拆分成單個字元
const displayElement = document.getElementById('text-display');
const finalScreen = document.getElementById('final-white-screen');
const bgMusic = document.getElementById('background-music');

const charDisplayDuration = 430; // 每個字顯示 0.3 秒
const totalDisplayTime = 40 * 1000; // 總共顯示 20 秒 (20000 毫秒)

let charIndex = 0;
let startTime;
let intervalId;

// 啟動函數：在網頁加載完成後等待使用者點擊
window.onload = () => {
    // 為了讓瀏覽器允許播放音樂，通常需要使用者互動
    document.body.addEventListener('click', startSequence, { once: true });
    displayElement.innerText = "點擊任意處開始"; // 初始提示
    displayElement.style.opacity = 1; // 顯示提示文字
    displayElement.style.color = "grey";
};

function startSequence() {
    displayElement.style.color = "red"; // 恢復白色字
    displayElement.innerText = ""; // 清除提示文字
    bgMusic.play(); // 播放背景音樂
    startTime = Date.now(); // 記錄開始時間
    intervalId = setInterval(showNextChar, charDisplayDuration); // 每 0.3 秒顯示下一個字
    
    // 設定計時器，20 秒後結束序列
    setTimeout(endSequence, totalDisplayTime);
}

function showNextChar() {
    if (charIndex >= characters.length) {
        charIndex = 0; // 如果字元都顯示完了，從頭開始循環
    }

    displayElement.innerText = characters[charIndex]; // 顯示當前字元
    displayElement.style.opacity = 1; // 讓字元可見

    // 0.25 秒後隱藏字元，為下一個字準備
    setTimeout(() => {
        displayElement.style.opacity = 0;
    }, charDisplayDuration - 50); // 在 0.3 秒結束前 0.05 秒隱藏，製造閃爍感

    charIndex++; // 準備顯示下一個字
}

function endSequence() {
    clearInterval(intervalId); 
    bgMusic.pause(); 
    displayElement.style.display = 'none'; // 直接隱藏文字
    
    // 確保這裡的 class 名稱與你 CSS 中定義的「隱藏樣式」一致
    // 假設你原本用 .hidden 隱藏 finalScreen，現在要移除它
    finalScreen.classList.remove('hidden'); 

}

