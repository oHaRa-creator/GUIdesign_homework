// 電話してるフリ: 画面1（待機）⇄ 画面2（通話中）の切り替え

const screenIdle = document.getElementById("screen-idle");
const screenCall = document.getElementById("screen-call");
const hangupBtn = document.querySelector(".hangup-btn");

function showScreen(target) {
  for (const screen of [screenIdle, screenCall]) {
    screen.classList.toggle("is-active", screen === target);
  }
}

// 画面1をタップ → 発信（通話中画面へ）
screenIdle.addEventListener("click", () => {
  showScreen(screenCall);
});

// 赤いボタンをタップ → 通話終了（待機画面へ戻る）
hangupBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  showScreen(screenIdle);
});
