
  // Create a PeerJS instance for the render page
  const peer = new Peer('render-device');

  peer.on('connection', function(conn) {
    conn.on('data', function(data) {
      // data: { dial } - using dial value for x position
      if (window.cube) {
        const dialValue = parseFloat(data.dial) || 0;
        window.cube.position.set(dialValue, window.cube.position.y, window.cube.position.z);
      }
    });
  });