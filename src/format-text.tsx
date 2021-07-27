'use strict';

/* 
 関数概要：Google翻訳などのために改行を調整する関数 
引数：inputText：入力のテキスト 
　　　breakAtPeriod：ピリオド(.)で改行(\n\n)するかどうか。true又はfalse。 
     convertLinebreakToSpace：不適切な改行をスペースに変換するかどうか。true又はfalse。 
     breakAtLineheadUpperCharacter：行頭が大文字なら前の行末が不適切に改行されていていも改行する。true又はfalse。 
戻り値：改行が調整されたテキスト 
*/
function formatTextData(
  inputText,
  breakAtPeriod,
  convertLinebreakToSpace,
  breakAtLineheadUpperCharacter
) {
  var outputText = '';

  for (var i = 0; i < inputText.length; i++) {
    var currentChar = inputText[i];
    // ★改行の取扱
    if (isNewLineCharacter(currentChar)) {
      // 適切な改行なら採用する
      if (isAppropriateLineBreak(inputText, i, breakAtLineheadUpperCharacter)) {
        outputText = outputText + currentChar;

        // 次が大文字なら改行を一つ追加
        // if (i < inputText.length - 1 && isUpperCase(inputText[i + 1])) {
        //   outputText = outputText + "\n";
        // }
      } else {
        // 手前がハイフンなら削除する
        if (
          outputText.length != 0 &&
          outputText[outputText.length - 1] == '-'
        ) {
          outputText = outputText.slice(0, -1);
        }
        if (convertLinebreakToSpace) {
          outputText = outputText + ' ';
        }
      }
    }
    // ★スペース文字の取扱
    else if (is0x20Space(currentChar)) {
      // 「ピリオドで改行する」モードで手前が改行の場合
      if (
        breakAtPeriod &&
        outputText.length != 0 &&
        isNewLineCharacter(outputText[outputText.length - 1])
      ) {
        // 採用しない
      } else {
        outputText = outputText + currentChar;
      }
    }
    // ★"·"（ドット）の取扱
    else if (currentChar == '·') {
      // 手前が改行なら、先に改行する
      if (i != 0 && isNewLineCharacter(inputText[i - 1])) {
        outputText = outputText + '\n';
      }
      outputText = outputText + currentChar;
    }
    // ★ピリオドの取扱
    else if (currentChar == '.') {
      outputText = outputText + currentChar;

      // 「ピリオドで改行する」モードの場合
      if (breakAtPeriod && currentChar == '.') {
        // この文字の次が改行なら改行を1つ追加。
        if (i < inputText.length - 1 && isNewLineCharacter(inputText[i + 1])) {
          outputText = outputText + '\n';
        }
        // この文字の次がスペースなら改行を2つ追加。
        else if (i < inputText.length - 1 && is0x20Space(inputText[i + 1])) {
          outputText = outputText + '\n\n';
        }
        // その他
        else {
          // 改行を追加しない。
        }
      }
    }
    // ★その他の文字の取扱
    else {
      outputText = outputText + currentChar;
    }
  }

  return outputText;
}

// 文字が大文字かどうか調べる
function isUpperCase(aChar) {
  if (isWhiteSpace(aChar)) {
    return false;
  }
  if (aChar == aChar.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}

// 文字が改行文字かどうか調べる
function isNewLineCharacter(aChar) {
  if (aChar == '\r') {
    console.log('★CR');
    return true;
  } else if (aChar == '\n') {
    console.log('★LF');
    return true;
  } else {
    return false;
  }
}

//文字がホワイトスペースかどうか調べる
function isWhiteSpace(aChar) {
  var charCode = aChar.charCodeAt(0);
  if ((0x09 <= charCode && charCode <= 0x0d) || charCode == 0x20) {
    return true;
  }

  return false;
}
//文字がスペース文字(0x20)かどうか調べる
function is0x20Space(aChar) {
  var charCode = aChar.charCodeAt(0);
  if (charCode == 0x20) {
    return true;
  }

  return false;
}

// 翻訳のために適切な改行か調べる
function isAppropriateLineBreak(text, index, breakAtLineheadUpperCharacter) {
  // 手前の文字がホワイトスペースなら適切
  if (index != 0 && isWhiteSpace(text[index - 1])) {
    return true;
  }
  // 次の文字が改行文字なら適切
  if (index < text.length - 1 && isNewLineCharacter(text[index + 1])) {
    return true;
  }

  // breakAtLineheadUpperCharacterがtrueの場合ならば、次の文字が大文字なら適切
  if (
    breakAtLineheadUpperCharacter &&
    index < text.length - 1 &&
    isUpperCase(text[index + 1])
  ) {
    return true;
  }

  // 手前の文字がピリオドなら適切
  if (index != 0 && text[index - 1] == '.') {
    return true;
  }
  // 不要な改行と判断する
  console.log('不要な改行');
  return false;
}
