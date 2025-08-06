  // Replace with your own unique ID for the render device
  const peer = new Peer('render-device');

  peer.on('connection', function(conn) {
    conn.on('data', function(data) {
      // data: { x, y, z }
      if (window.cube) {
        window.cube.position.set(data.x, data.y, data.z);
      }
    });
  });