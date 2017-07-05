const style = require('ansi-styles');
const player = require('play-sound')(opts = {});

console.log(style.bgColor.ansi.hex('#fff')+ style.color.yellow.open + style.modifier.italic.open + 'hello!' + style.modifier.italic.close + style.yellow.close + style.bgColor.close + '\n now you are listening' + style.modifier.italic.open + ' Bolero of Moris Ravel'+ style.modifier.italic.close);
player.play('Bolero.mp3');
