const clipboard = require('electron').clipboard
const nativeImage = require('electron').nativeImage

const copyBtn = document.getElementById('copyable')

copyBtn.addEventListener('click', function () {
  var s = String(this.innerHTML)
  var matches = s.match(/"([^"]*)"/)[1];
  const toCopy = nativeImage.createFromPath(matches)
  console.log(matches);
  console.log(toCopy);
  console.log(toCopy.getSize());
  clipboard.writeImage(toCopy);
})
