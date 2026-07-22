(function() {
  const monkeyPng = "assets/monkey.png";

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '38%';
  container.style.right = '-14px';
  container.style.zIndex = '9999';
  container.style.cursor = 'pointer';
  container.style.transform = 'translateY(-50%)';
  container.style.transition = 'transform 0.2s cubic-bezier(.4,.4,0,1.6)';
  container.setAttribute('id', 'monkey-join-image-container');

  container.addEventListener('mouseenter', function() {
    container.style.transform = 'translateY(-50%) rotate(-7deg) scale(1.085)';
  });
  container.addEventListener('mouseleave', function() {
    container.style.transform = 'translateY(-50%)';
  });

  const img = document.createElement('img');
  img.src = monkeyPng;
  img.alt = "Join Monkey";
  img.style.width = "78px";
  img.style.height = "auto";
  img.style.display = "block";
  img.style.userSelect = "none";
  img.draggable = false;
  img.style.filter = "drop-shadow(2px 8px 16px #41270e55)";

  container.onclick = function() {
    window.location.href = "index.html";
  };

  container.setAttribute('title', 'Join us!');

  container.appendChild(img);
  document.body.appendChild(container);

  window.removeMonkeyJoin = function() {
    if (container.parentNode) container.parentNode.removeChild(container);
  };
})();