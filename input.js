  // Replace with your own unique ID for the input device
  const peer = new Peer('input-device');
  let conn;

  // Connect to the render device when ready
  function connectToRender() {
    conn = peer.connect('render-device');
    conn.on('open', function() {
      // Send initial position
      sendPosition();
    });
  }

  // Send position data to render device
  function sendPosition() {
    if (!conn || conn.open === false) return;
    const x = parseFloat(document.getElementById('postion-x').value) || 0;
    const y = parseFloat(document.getElementById('postion-y').value) || 0;
    const z = parseFloat(document.getElementById('postion-z').value) || 0;
    conn.send({ x, y, z });
  }

  // Listen for input changes
  ['postion-x', 'postion-y', 'postion-z'].forEach(id => {
    document.getElementById(id).addEventListener('input', sendPosition);
  });

  peer.on('open', connectToRender);