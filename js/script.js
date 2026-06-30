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

// 赤いボタンをタップ → ブラウザ（タブ）を閉じる
hangupBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  // window.close() はスクリプトで開いたウィンドウにしか効かないブラウザが多いため、
  // 閉じられなかった場合は about:blank に遷移して「閉じた」状態にフォールバック。
  window.close();
  window.open("", "_self");
  window.close();
  window.location.href = "about:blank";
});
