// 電話してるフリ: 画面1（待機）⇄ 画面2（通話中）の切り替え

const screenIdle = document.getElementById("screen-idle");
const screenCall = document.getElementById("screen-call");
const answerBtn = document.querySelector(".answer-btn");
const declineBtn = document.querySelector(".circle-btn--decline");
const hangupBtn = document.querySelector(".hangup-btn");

// 応答時に再生する音声（assets/voice.mp3 を各自で配置）
const voice = new Audio("assets/voice.mp3");

function stopVoice() {
  voice.pause();
  voice.currentTime = 0;
}

function showScreen(target) {
  for (const screen of [screenIdle, screenCall]) {
    screen.classList.toggle("is-active", screen === target);
  }
}

// ブラウザ（タブ）を閉じる。
// window.close() はスクリプトで開いたウィンドウにしか効かないブラウザが多いため、
// 閉じられなかった場合は about:blank に遷移して「閉じた」状態にフォールバック。
function endCall() {
  window.close();
  window.open("", "_self");
  window.close();
  window.location.href = "about:blank";
}

// 応答 → 通話中画面へ切り替え、音声を再生
answerBtn.addEventListener("click", () => {
  showScreen(screenCall);
  voice.currentTime = 0;
  voice.play().catch(() => {
    // 再生できなかった場合（ファイル未配置など）は無視
  });
});

// 拒否 → 着信を切る（タブを閉じる）
declineBtn.addEventListener("click", () => {
  stopVoice();
  endCall();
});

// 通話終了ボタン → タブを閉じる
hangupBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  stopVoice();
  endCall();
});
