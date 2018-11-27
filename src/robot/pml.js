function work(actionString) {
  // The robot ignores any command that is not 'P', 'M' or 'L'
  const actions = actionString
    .split('')
    .filter(action => 'PML'.indexOf(action) !== -1);

  // Create the store
  let store = [];
  for (let i = 0, j = 10; i < j; i++) {
    store[i] = 0;
  }

  let position = 0;
  let hold = false;
  for (let i of actions) {
    // If the robot already holds a block, Pickup will reset the robot to position 0.
    if (i === 'P') {
      position = 0;
      hold = true;
      continue;
    }
    // The robot will not go beyond position 9. Trying to Move it further does nothing.
    if (i === 'M' && position < store.length) {
      position = position + 1;
      continue;
    }
    // Lowering without a block does nothing.
    // Lowering a block on a pile of 15 blocks does nothing (and the robot will keep any block it holds).
    if (i === 'L' && hold && store[position] < 15) {
      store[position] = store[position] + 1;
      hold = false;
      position = 0;
      continue;
    }
  }

  return store.map((item, i) => `${i}x${Number(item).toString(16)}`).join(',');
}

console.log(work('PLPLPLPLPLPLPLPLPLPLPL'));
console.log(
  work('PLPLPLPLPLPLPLPLPLPLPLPLPLPLPLPMLPMLPMLPMLPMLPMLPMLPMLPMLLLPMMMMMMMML')
);
console.log(work('PMLPLPLPLPLPLPLPLPLPLPL'));
