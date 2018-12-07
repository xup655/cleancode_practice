
function spReverseString(text) {
  var splitText = text.split('');
  var reversedText = splitText.reverse().slice('').join('');
  
  return reversedText;
}

function regFindDel(text) {
  var reg = new RegExp('s', 'g');
  var replaceText = text.replace(reg, '_');
  
  return replaceText;
}