digitalWrite(8, 1);
spinner.clear(1);
pinMode(2, 'input_pullup');

spinner.schedule(b, 1);
let lastTime = getTime();
setWatch((e) => {
  let delta = 1000 * (e.time - lastTime);
  if (delta && delta / 90.0 > 0.2) {
    spinner.reschedule(delta / 90.0);
  }
  lastTime = e.time;
}, 2, {edge: 'rising', repeat: true});
