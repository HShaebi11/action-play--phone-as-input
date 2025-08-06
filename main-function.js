alert("Hello World");


document.addEventListener("DOMContentLoaded", function() {
    // Try to find the element by id first, then by class
    let container = document.getElementById('three-render');
    if (!container) {
      container = document.querySelector('.three-render');
    }
    if (!container) {
      console.error('No element with id or class "three-render" found.');
      return;
    }
  
    // Set size to 100% of parent
    function setRendererSize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    // Create scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // aspect will be set later
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    setRendererSize();

    // Add a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    window.cube = cube;

// PeerJS: Listen for position updates from input device
const peer = new Peer('render-device');

peer.on('open', function(id) {
  console.log('Render PeerJS ID:', id);
});

peer.on('connection', function(conn) {
  console.log('Render: Connection received');
  conn.on('data', function(data) {
    console.log('Render: Data received', data);
    if (window.cube && data && typeof data.x === 'number' && typeof data.y === 'number' && typeof data.z === 'number') {
      window.cube.position.set(data.x, data.y, data.z);
    }
  });
});

    camera.position.z = 3;

    // Handle window resize
    window.addEventListener('resize', setRendererSize);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  });