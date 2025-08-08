  // Replace with your own unique ID for the input device
  const peer = new Peer('iphone');
  let conn;

  // Connect to the render device when ready
  function connectToRender() {
    conn = peer.connect('macbook');
    conn.on('open', function() {
      // Send initial dial value
      sendDialValue();
    });
  }

  // Listen for dial input changes
  document.getElementById('value').addEventListener('input', sendDialValue);

  // Send dial value to render device
  function sendDialValue() {
    if (!conn || conn.open === false) return;
    const dialValue = parseFloat(document.getElementById('value').value) || 0;
    conn.send({ dial: dialValue });
  }

  peer.on('open', connectToRender);