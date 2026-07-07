// 電話してるフリ: 画面1（待機）⇄ 画面2（通話中）の切り替え

const screenStart = document.getElementById("screen-start");
const screenIdle = document.getElementById("screen-idle");
const screenCall = document.getElementById("screen-call");
const startBtn = document.querySelector(".start-btn");
const answerBtn = document.querySelector(".answer-btn");
const declineBtn = document.querySelector(".circle-btn--decline");
const hangupBtn = document.querySelector(".hangup-btn");

// 通話画面で流すBGM（bgm.mp3 を各自で配置）
const bgm = new Audio("bgm.mp3");

// 待機（着信）画面で流す着信音（携帯バイブレーション.mp3 を各自で配置）
const ringtone = new Audio("携帯バイブレーション.mp3");
ringtone.loop = true;

function stopBgm() {
  bgm.pause();
  bgm.currentTime = 0;
}

function stopRingtone() {
  ringtone.pause();
  ringtone.currentTime = 0;
}

// 着信音を再生。自動再生がブロックされた場合は、最初の操作で鳴らす。
function playRingtone() {
  ringtone.play().catch(() => {
    const resume = () => {
      ringtone.play().catch(() => {});
    };
    window.addEventListener("pointerdown", resume, { once: true });
  });
}

// 携帯バイブレーション（対応端末のみ。PC等では無視される）
function vibratePhone() {
  if (navigator.vibrate) {
    // 着信のように断続的に振動させる
    navigator.vibrate([600, 300, 600, 300, 600]);
  }
}

function showScreen(target) {
  for (const screen of [screenStart, screenIdle, screenCall]) {
    screen.classList.toggle("is-active", screen === target);
  }

  // 待機（着信）画面が開いたら、バイブレーションとともに着信音を再生
  if (target === screenIdle) {
    vibratePhone();
    playRingtone();
  }

  // 通話画面が開いたら、携帯バイブレーションを止めて BGM に切り替える
  if (target === screenCall) {
    stopRingtone();
    bgm.currentTime = 0;
    bgm.play().catch(() => {
      // 再生できなかった場合（ファイル未配置など）は無視
    });
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

// 開始する → 携帯バイブレーションとともに待機（着信）画面へ
startBtn.addEventListener("click", () => {
  showScreen(screenIdle);
});

// 応答 → 通話中画面へ切り替え、音声を再生
answerBtn.addEventListener("click", () => {
  showScreen(screenCall);
});

// 拒否 → 着信を切る（タブを閉じる）
declineBtn.addEventListener("click", () => {
  stopRingtone();
  stopBgm();
  endCall();
});

// 通話終了ボタン → タブを閉じる
hangupBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  stopRingtone();
  stopBgm();
  endCall();
});
