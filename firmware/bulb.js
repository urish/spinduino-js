var bulbDevice = null;
var bulbChar = null;

function setColor(r, g, b) {
  try {
    bulbChar.writeValue(new Uint8Array([0x56, r, g, b, 0, 0xf0, 0xaa]));
  } catch (e) {
  }
}

let lastTime = getTime();
let startTime = null;

function onSpin(e) {
  let delta = getTime() - lastTime;
  lastTime = getTime();
  if (!startTime) {
    startTime = getTime();
  }
  let runTime = getTime() - startTime;
  setColor(Math.round(runTime * 5),
           runTime > 3 ? Math.round(4 * (runTime - 3)) : 0,
           runTime > 5 ? Math.round(4 * (runTime - 5)) : 0);
}

function enable() {
  pinMode(D5, 'input_pullup');
  digitalWrite(D4, 1);
}

function disable() {
  digitalWrite(D4, 0);
  pinMode(D5, 'input');
}

function bulb() {
  enable();
  NRF.requestDevice({ filters: [{ services: ['ffe5'] }] })
    .then(device => {
      bulbDevice = device;
      return device.gatt.connect();
    })
    .then(gatt => gatt.getPrimaryService('ffe5'))
    .then(service => service.getCharacteristic('ffe9'))
    .then(char => bulbChar = char);

  const watch = setWatch(onSpin, D5, { repeat: true, edge: 'rising' });

  const interval = setInterval(() => {
    if (getTime() - lastTime > 0.3) {
      setColor(0, 0, 0);
      startTime = null;
    }
  }, 100);

  return () => {
    clearWatch(watch);
    clearInterval(interval);
    try {
      bulbDevice.gatt.disconnect();
    } catch (e) { }
  };
}
