// Typewriter effect for the tagline
const taglineText = "Computing and Data Science Student | Aspiring Innovator";
const taglineElement = document.getElementById("typed-tagline");
const cursorElement = document.querySelector(".cursor");
let charIndex = 0;
function typeWriter() {
  if (charIndex < taglineText.length) {
    taglineElement.textContent += taglineText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 100);  // typing speed (100ms per character)
  } else {
    // Remove cursor after finishing typing (optional)
    cursorElement.style.display = "none";
  }
}
// Start typing after a brief delay when page loads
window.addEventListener("load", () => {
  setTimeout(typeWriter, 1000);
});

// Three.js 3D Background Animation (rotating wireframe globe + stars)
const canvas = document.getElementById("bg-canvas");
let scene, camera, renderer;
function init3DBackground() {
  scene = new THREE.Scene();
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Neon wireframe sphere (globe)
  const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    wireframe: true
  });
  const sphere = new THREE.Mesh(sphereGeometry, wireMaterial);
  scene.add(sphere);

  // Add some stars as Points
  const starGeometry = new THREE.BufferGeometry();
  const starCount = 200;
  const starPositions = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount * 3; i++) {
    // random positions in a cube, then we can set far away
    starPositions[i] = (Math.random() - 0.5) * 400;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMaterial = new THREE.PointsMaterial({ color: 0xaaaaaa, size: 1.5 });
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    // Rotate the sphere slowly
    sphere.rotation.y += 0.001;
    sphere.rotation.x += 0.0005;
    // Slight rotation for star field to create a drifting effect
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
  }
  animate();

  // Handle canvas resize
  window.addEventListener('resize', () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });
}
init3DBackground();

// GSAP Animations on Scroll
gsap.registerPlugin(ScrollTrigger);

// Fade/slide in sections from bottom when they enter viewport
gsap.utils.toArray('.section').forEach(section => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: section,
      start: "top 80%",  // trigger when section is 20% from bottom of viewport
      toggleActions: "play none none none"
    }
  });
});

// Animate skill progress bars width when the Skills section becomes visible
ScrollTrigger.create({
  trigger: "#skills",
  start: "top 75%",
  once: true,  // only animate once
  onEnter: () => {
    const bars = document.querySelectorAll(".progress-bar");
    bars.forEach(bar => {
      // Read target percent from data attribute
      const targetPercent = bar.getAttribute("data-percent");
      // GSAP animate width from 0% to target%
      gsap.to(bar, {
        duration: 1.5,
        width: targetPercent + "%",
        ease: "power3.out"
      });
      // Animate the neon glow (opacity of the ::after pseudo-element) slightly after fill
      gsap.to(bar, {
        duration: 1.0,
        delay: 0.5,
        onStart: () => {
          bar.style.setProperty("--glow-opacity", "1");
        }
      });
    });
  }
});

// Sticky Navbar scroll behavior
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu when a link is clicked (for better UX)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Contact Form Validation and Submission Handling
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function(e) {
  e.preventDefault();
  // Use HTML5 form validation
  if (!contactForm.checkValidity()) {
    // If form is invalid, let the browser show built-in messages
    contactForm.reportValidity();
  } else {
    // Simulate successful form submission
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  }
});
