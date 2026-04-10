const world = document.getElementById('game-world');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const msgEl = document.getElementById('msg');

let currentTree = 0;
const totalTrees = 10;
const treeSpacing = 1;
const startX = -4.5;

// 🌳 GENERATE TREES
for (let i = 0; i < totalTrees; i++) {
  let tree = document.createElement('a-cylinder');
  tree.setAttribute('position', `${startX + i * treeSpacing} 0.5 0`);
  tree.setAttribute('height', '1');
  tree.setAttribute('radius', '0.2');
  tree.setAttribute('color', i === totalTrees - 1 ? 'gold' : 'green');
  world.appendChild(tree);
}

// 🔊 AUDIO CONTEXT
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// ✅ SUCCESS SOUND
function playSuccessSound() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.frequency.value = 800;
  gain.gain.value = 0.1;

  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

// ❌ FAIL SOUND
function playFailSound() {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.frequency.value = 200;
  gain.gain.value = 0.2;

  osc.start();
  osc.stop(audioCtx.currentTime + 0.5);
}

// 🎮 GAME LOGIC
window.addEventListener('click', () => {

  // RANDOM FAIL (simulacija padca)
  let success = Math.random() > 0.2;

  if (success && currentTree < totalTrees - 1) {

    currentTree++;
    let newX = startX + currentTree * treeSpacing;

    player.setAttribute('animation',
      `property: position; to: ${newX} 1.2 0; dur: 400`);

    // 🔊 success sound
    playSuccessSound();

    scoreEl.innerText = "Score: " + (currentTree * 2);

    // 🎉 WIN
    if (currentTree === totalTrees - 1) {
      msgEl.style.display = "block";
    }

  } else {
    // ❌ FAIL
    playFailSound();

    player.setAttribute('animation',
      `property: position; to: ${startX} 0 0; dur: 500`);

    currentTree = 0;
    scoreEl.innerText = "Score: 0";
  }
});