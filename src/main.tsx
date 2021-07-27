'use strict';

const triangle_right = document.getElementById('help_triangle_right');
const help = document.getElementById('help');
const inputText = document.getElementById('input-text');
const clear = document.getElementById('clear');
const outputText = document.getElementById('output-text');
const breakAtPeriod = document.getElementById('break-at-period');
const convertLinebreakToSpace = document.getElementById(
  'convert-linebreak-to-space'
);
const breakAtLineheadUpperCharacter = document.getElementById(
  'break-at-linehead-upper-character'
);

triangle_right.addEventListener('click', () => {
  console.log('triangle_right');
  triangle_right.classList.toggle('show-help');
  help.classList.toggle('display-none');
});

inputText.addEventListener('input', () => formatText());

clear.addEventListener('click', () => {
  inputText.value = '';
  outputText.value = '';

  // フォーカスをinputTextに戻す
  inputText.focus();
});

breakAtPeriod.addEventListener('click', () => formatText());
convertLinebreakToSpace.addEventListener('click', () => formatText());
breakAtLineheadUpperCharacter.addEventListener('click', () => formatText());

function formatText() {
  // UIの設定を見て、テキストを整形する
  const input_text = inputText.value;
  if (input_text) {
    outputText.value = formatTextData(
      input_text,
      breakAtPeriod.checked,
      convertLinebreakToSpace.checked,
      breakAtLineheadUpperCharacter.checked
    );
  } else {
    outputText.value = '';
  }

  // 整形結果をクリップボードへコピーする
  copyTextToClipboard(outputText.value);

  // フォーカスをinputTextに戻す
  inputText.focus();
}

// https://webllica.com/copy-text-to-clipboard/より
/*
 * クリップボードコピー関数
 * 入力値をクリップボードへコピーする
 * [引数]   textVal: 入力値
 * [返却値] true: 成功　false: 失敗
 */
function copyTextToClipboard(textVal) {
  // テキストエリアを用意する
  var copyFrom = document.createElement('textarea');
  // テキストエリアへ値をセット
  copyFrom.textContent = textVal;

  // bodyタグの要素を取得
  var bodyElm = document.getElementsByTagName('body')[0];
  // 子要素にテキストエリアを配置
  bodyElm.appendChild(copyFrom);

  // テキストエリアの値を選択
  copyFrom.select();
  // コピーコマンド発行
  var retVal = document.execCommand('copy');
  // 追加テキストエリアを削除
  bodyElm.removeChild(copyFrom);
  // 処理結果を返却
  return retVal;
}
