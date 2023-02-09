// const densityString = "█▓▒░:.";
// const densityString = "@#O%+=|i-:.";
const densityString = "Ñ@#W$9876543210?!abc;:+=-,._";
const defaultDensity = 10;
let density = densityString + Array(parseInt(defaultDensity)).fill(null).map(() => ' ').join('')
// const density = '       .:-i|=+%O#@'
// const density = '        .:░▒▓█';
let video;
let asciiDiv;
let videoScale = .3;
const fontSize = `${1/videoScale}px`
document.querySelector(':root').style.setProperty('--font-size', fontSize)

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(1920 * videoScale, 1080 * videoScale);
  asciiDiv = createDiv();
  asciiDiv.addClass('ascii-container')
}

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      const c = density.charAt(charIndex);
      if (c == " ") asciiImage += "&nbsp;";
      // else asciiImage += `<span style="color: rgb(${r},${g},${b})">${c}</span>`
      else asciiImage += c
    }
    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}

const exposureSlider = document.getElementById('exposure')
const exposureLabel = document.getElementById('exposureLabel')
exposureLabel.innerText = defaultDensity;
exposureSlider.value = defaultDensity;
exposureSlider.oninput = function() {
  // console.log(this.value)
  density = densityString + Array(parseInt(this.value)).fill(null).map(() => ' ').join('')
  exposureLabel.innerText = this.value;
}