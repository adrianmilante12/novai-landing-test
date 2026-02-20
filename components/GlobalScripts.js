import { useEffect } from "react";

export default function GlobalScripts() {
  useEffect(() => {
    // ---------------- ScrollReveal (dynamic import) ----------------
    import("scrollreveal")
      .then(ScrollReveal => {
        if (typeof window !== "undefined") {
          ScrollReveal.default().reveal(".reveal", {
            distance: "60px",
            duration: 1200,
            easing: "ease-out",
            origin: "bottom",
            interval: 200,
          });
        }
      })
      .catch(err => console.log("ScrollReveal load error:", err));

    // ---------------- FAQ Toggle ----------------
    const faqButtons = document.querySelectorAll(".faq-question");
    faqButtons.forEach(button => {
      const answer = button.nextElementSibling;
      if (!answer) return;

      button.addEventListener("click", () => {
        answer.style.maxHeight =
          answer.style.maxHeight ? null : answer.scrollHeight + "px";
      });
    });

    // ---------------- 3D Floating Cards ----------------
    const floatingCards = document.querySelectorAll(".floating");
    floatingCards.forEach(card => {
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
      });
    });

    // ---------------- Mobile Menu ----------------
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });
      document.querySelectorAll("#navMenu a").forEach(link => {
        link.addEventListener("click", () => navMenu.classList.remove("active"));
      });
    }

    // ---------------- Loading Screen ----------------
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    if (loadingScreen && mainContent) {
      window.addEventListener("load", () => {
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
    }

    // ---------------- Particle Effect ----------------
    const canvas = document.getElementById("particles");
    if (canvas) {
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
          this.speedX = Math.random() - 0.5;
          this.speedY = Math.random() - 0.5;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      function initParticles() {
        for (let i = 0; i < 100; i++) particlesArray.push(new Particle());
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => {
          p.update();
          p.draw();
        });
        requestAnimationFrame(animateParticles);
      }

      initParticles();
      animateParticles();

      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    }

    // ---------------- Bottom Sheet ----------------
    const bottomSheet = document.getElementById("bottomSheet");
    const grabBtn = document.getElementById("grabBtn");
    if (bottomSheet && grabBtn) {
      let startY = 0,
        sheetStart = 0,
        isDragging = false,
        isClosing = false;

      function openSheet() {
        if (bottomSheet.classList.contains("active") || isClosing) return;
        isClosing = false;
        bottomSheet.style.transition = "none";
        bottomSheet.style.transform = "translateY(100%)";
        requestAnimationFrame(() => {
          bottomSheet.style.transition =
            "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
          bottomSheet.classList.add("active");
          bottomSheet.style.transform = "translateY(0)";
        });
      }

      function closeSheet() {
        if (!bottomSheet.classList.contains("active") || isClosing) return;
        isClosing = true;
        bottomSheet.style.transition =
          "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
        bottomSheet.style.transform = "translateY(100%)";
        bottomSheet.addEventListener(
          "transitionend",
          function handler() {
            bottomSheet.classList.remove("active");
            bottomSheet.style.transform = "";
            isClosing = false;
            bottomSheet.removeEventListener("transitionend", handler);
          }
        );
      }

      function dragStart(e) {
        if (isClosing) return;
        isDragging = true;
        bottomSheet.style.transition = "none";
        startY = e.type.includes("touch") ? e.touches[0].pageY : e.pageY;
        const matrix = new WebKitCSSMatrix(window.getComputedStyle(bottomSheet).transform);
        sheetStart = matrix.m42 || 0;
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("touchmove", onDrag, { passive: false });
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("touchend", dragEnd);
      }

      function onDrag(e) {
        if (!isDragging) return;
        const currentY = e.type.includes("touch") ? e.touches[0].pageY : e.pageY;
        const diff = currentY - startY;
        bottomSheet.style.transform =
          diff > 0 ? `translateY(${sheetStart + diff}px)` : `translateY(${sheetStart}px)`;
        if (e.type.includes("touch")) e.preventDefault();
      }

      function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("touchmove", onDrag);
        document.removeEventListener("mouseup", dragEnd);
        document.removeEventListener("touchend", dragEnd);
        const matrix = new WebKitCSSMatrix(window.getComputedStyle(bottomSheet).transform);
        const translateY = matrix.m42;
        bottomSheet.style.transition =
          "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
        if (translateY > 50) closeSheet();
        else bottomSheet.style.transform = "translateY(0)";
      }

      grabBtn.addEventListener("mousedown", dragStart);
      grabBtn.addEventListener("touchstart", dragStart, { passive: false });
      grabBtn.addEventListener("click", closeSheet);
    }

    // ---------------- Carousel ----------------
    function initCarousel(wrapperSelector, dotsSelector) {
      const wrapper = document.querySelector(wrapperSelector);
      if (!wrapper) return;

      const track = wrapper.querySelector(".slides");
      if (!track) return;

      const slides = Array.from(track.querySelectorAll(".slide"));
      if (slides.length === 0) return;

      const dotsContainer = document.querySelector(dotsSelector);
      if (!dotsContainer) return;

      const slidesWrapper = wrapper.querySelector(".slides-wrapper");
      if (!slidesWrapper) return;

      const gap = parseInt(getComputedStyle(track).gap) || 12;
      let index = 1;
      let autoScroll;

      const realSlideCount = slides.length - 2;
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

      function moveTo(newIndex) {
        index = newIndex;
        setPosition(true);
        updateDots();
        resetAutoScroll();
      }

      track.addEventListener("transitionend", () => {
        if (index <= 0) index = realSlideCount;
        if (index >= realSlideCount + 1) index = 1;
        setPosition(false);
      });

      wrapper.querySelector(".arrow.left")?.addEventListener("click", () => moveTo(index - 1));
      wrapper.querySelector(".arrow.right")?.addEventListener("click", () => moveTo(index + 1));

      function startAutoScroll() {
        autoScroll = setInterval(() => {
          index++;
          setPosition(true);
          updateDots();
        }, 3500);
      }
      function stopAutoScroll() { clearInterval(autoScroll); }
      function resetAutoScroll() { stopAutoScroll(); startAutoScroll(); }

      setPosition(false);
      updateDots();
      startAutoScroll();
      window.addEventListener("resize", () => setPosition(false));
    }

    initCarousel(".desktop-carousel", ".desktop-dots");
    initCarousel(".mobile-carousel", ".mobile-dots");
  }, []);

  return null;
  }
