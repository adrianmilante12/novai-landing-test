// FAQ toggle
document.querySelectorAll(".faq-question").forEach(button=>{
  button.addEventListener("click",()=>{
    const answer = button.nextElementSibling;
    answer.style.maxHeight =
      answer.style.maxHeight ? null : answer.scrollHeight + "px";
  });
});

// Scroll Reveal Animations
ScrollReveal().reveal('.reveal', {
  distance: '60px',
  duration: 1200,
  easing: 'ease-out',
  origin: 'bottom',
  interval: 200
});

// 3D Floating Effect
document.querySelectorAll(".floating").forEach(card=>{
  card.addEventListener("mousemove", (e)=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});


// Mobile Toggle
document.addEventListener("DOMContentLoaded", function(){
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", ()=>{
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking a link
  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', ()=>{
      navMenu.classList.remove('active');
    });
  });
});

// JavaScript: Loading screen fade-out & particle animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const mainContent = document.getElementById("main-content");

  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.8s";
    setTimeout(() => {
      loadingScreen.style.display = "none";
      mainContent.style.display = "block";
      document.body.style.overflow = "auto";
    }, 800);
  }, 2000);
});

// Particle effect
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const colors = ["#ff6ec4", "#7873f5", "#42e695", "#fff"];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  for(let i = 0; i < 100; i++) particlesArray.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", function() {
      const hamburger = document.getElementById("hamburger");
      const bottomSheet = document.getElementById("bottomSheet");
      const grabBtn = document.getElementById("grabBtn");
      
      let startY = 0;
      let sheetStart = 0;
      let isDragging = false;
      let isClosing = false;
      
      function openSheet() {
        if (bottomSheet.classList.contains("active") || isClosing) return;
        isClosing = false;
        
        bottomSheet.style.transition = "none";
        bottomSheet.style.transform = "translateY(100%)";
        
        requestAnimationFrame(() => {
          bottomSheet.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
          bottomSheet.classList.add("active");
          bottomSheet.style.transform = "translateY(0)";
        });
      }
      
      function closeSheet() {
        if (!bottomSheet.classList.contains("active") || isClosing) return;
        isClosing = true;
        
        bottomSheet.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
        bottomSheet.style.transform = "translateY(100%)";
        
        bottomSheet.addEventListener("transitionend", function handler() {
          bottomSheet.classList.remove("active");
          bottomSheet.style.transform = "";
          isClosing = false;
          bottomSheet.removeEventListener("transitionend", handler);
        });
      }
      
      // Hamburger toggle
      hamburger.addEventListener("click", () => {
        if (bottomSheet.classList.contains("active")) {
          closeSheet();
        } else {
          openSheet();
        }
      });
      
      // Drag start
      function dragStart(e) {
        if (isClosing) return;
        isDragging = true;
        bottomSheet.style.transition = "none";
        
        startY = e.type.includes("touch") ? e.touches[0].pageY : e.pageY;
        
        // Read the current transform to get the starting sheet position
        const computedStyle = window.getComputedStyle(bottomSheet);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        sheetStart = matrix.m42 || 0; // current offset
        
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("touchmove", onDrag, { passive: false }); // prevent scrolling
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("touchend", dragEnd);
      }
      
      function onDrag(e) {
        if (!isDragging) return;
        
        const currentY = e.type.includes("touch") ? e.touches[0].pageY : e.pageY;
        let diff = currentY - startY;
        
        if (diff > 0) { // only drag down
          bottomSheet.style.transform = `translateY(${sheetStart + diff}px)`;
        } else {
          bottomSheet.style.transform = `translateY(${sheetStart}px)`;
        }
        
        // Prevent page scrolling during drag
        if (e.type.includes("touch")) e.preventDefault();
      }
      
      function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("touchmove", onDrag);
        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener("touchend", dragEnd);
        
        // Get final transform
        const computedStyle = window.getComputedStyle(bottomSheet);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        const translateY = matrix.m42;
        
        bottomSheet.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
        
        if (translateY > 50) { // hide if dragged far
          closeSheet();
        } else {
          bottomSheet.style.transform = "translateY(0)"; // snap back
        }
      }
      
      grabBtn.addEventListener("mousedown", dragStart);
      grabBtn.addEventListener("touchstart", dragStart);
      
      // Close by clicking grab button
      grabBtn.addEventListener("click", closeSheet);
    });
    
    function initCarousel(wrapperSelector, dotsSelector) {
      const wrapper = document.querySelector(wrapperSelector);
      if (!wrapper) return;
      
      const track = wrapper.querySelector(".slides");
      const slides = Array.from(track.querySelectorAll(".slide"));
      const dotsContainer = document.querySelector(dotsSelector);
      const slidesWrapper = wrapper.querySelector(".slides-wrapper");
      
      const gap = parseInt(getComputedStyle(track).gap) || 12;
      
      let index = 1;
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationID;
      let autoScroll;
      
      const realSlideCount = slides.length - 2;
      
      /* ---------------- DOTS ---------------- */
      
      dotsContainer.innerHTML = "";
      for (let i = 0; i < realSlideCount; i++) {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => moveTo(i + 1));
        dotsContainer.appendChild(dot);
      }
      const dots = dotsContainer.querySelectorAll("span");
      
      function updateDots() {
        dots.forEach(d => d.classList.remove("active"));
        let realIndex = index - 1;
        if (realIndex < 0) realIndex = realSlideCount - 1;
        if (realIndex >= realSlideCount) realIndex = 0;
        dots[realIndex].classList.add("active");
        
        slides.forEach(s => s.classList.remove("active"));
        slides[index].classList.add("active");
      }
      
      /* ---------------- POSITION ---------------- */
      
      function getSlideWidth() {
        return slides[0].offsetWidth + gap;
      }
      
      function setPosition(animate = true) {
        const slideWidth = getSlideWidth();
        const centerOffset =
          (slidesWrapper.offsetWidth - slides[index].offsetWidth) / 2;
        
        const position = -index * slideWidth + centerOffset;
        
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${position}px)`;
      }
      
      /* ---------------- MOVE ---------------- */
      
      function moveTo(newIndex) {
        index = newIndex;
        setPosition(true);
        updateDots();
        resetAutoScroll();
      }
      
      track.addEventListener("transitionend", () => {
        if (index <= 0) {
          index = realSlideCount;
          setPosition(false);
        }
        if (index >= realSlideCount + 1) {
          index = 1;
          setPosition(false);
        }
      });
      
      /* ---------------- ARROWS ---------------- */
      
      wrapper.querySelector(".arrow.left")
        .addEventListener("click", () => moveTo(index - 1));
      
      wrapper.querySelector(".arrow.right")
        .addEventListener("click", () => moveTo(index + 1));
      
      /* ---------------- DRAG ---------------- */
      
      function startDrag(e) {
        stopAutoScroll();
        isDragging = true;
        
        startX = e.type.includes("mouse") ?
          e.pageX :
          e.touches[0].clientX;
        
        track.style.transition = "none";
      }
      
      
      function drag(e) {
        if (!isDragging) return;
        
        const currentX = e.type.includes("mouse") ?
          e.pageX :
          e.touches[0].clientX;
        
        const diff = currentX - startX;
        
        track.style.transform = `translateX(${baseTranslate + diff}px)`;
      }
      
      
      function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.type.includes("mouse") ?
          e.pageX :
          (e.changedTouches ? e.changedTouches[0].clientX : startX);
        
        const diff = endX - startX;
        
        if (diff < 0) {
          index++;
        } else if (diff > 0) {
          index--;
        }
        
        // Always snap clean
        setPosition(true);
        updateDots();
        resetAutoScroll();
      }
      
      
      
      function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
      }
      
      track.addEventListener("mousedown", startDrag);
      track.addEventListener("touchstart", startDrag, { passive: true });
      
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag, { passive: true });
      
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchend", endDrag);
      
      /* ---------------- AUTO SCROLL ---------------- */
      
      function startAutoScroll() {
        autoScroll = setInterval(() => {
          index++;
          setPosition(true);
          updateDots();
        }, 3500);
      }
      
      function stopAutoScroll() {
        clearInterval(autoScroll);
      }
      
      function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
      }
      
      /* ---------------- INIT ---------------- */
      
      setPosition(false);
      updateDots();
      startAutoScroll();
      
      window.addEventListener("resize", () => {
        setPosition(false);
      });
    }
    
    /* INIT BOTH */
    initCarousel(".desktop-carousel", ".desktop-dots");
    initCarousel(".mobile-carousel", ".mobile-dots");
    
