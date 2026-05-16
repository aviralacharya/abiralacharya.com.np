    // Sticky Navigation Menu
    let nav = document.querySelector("nav");
    let scrollBtn = document.querySelector(".scroll-button a");

    // Show/hide sticky navigation/ scroll button
    window.onscroll = function() {
      if(document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
        scrollBtn.style.display = "block";
      } else {
        nav.classList.remove("sticky");
        scrollBtn.style.display = "none";
      }
    }

    // Side Navigation Menu
    let body = document.querySelector("body");
    let navBar = document.querySelector(".navbar");
    let menuBtn = document.querySelector(".menu-btn");
    let cancelBtn = document.querySelector(".cancel-btn");

    // Open side navigation
    menuBtn.onclick = function() {
      navBar.classList.add("active");
      menuBtn.style.opacity = "0";
      menuBtn.style.pointerEvents = "none";
      body.style.overflow = "hidden";
      scrollBtn.style.pointerEvents = "none";
    };

    const hideNavMenu = () => {
      navBar.classList.remove("active");
      menuBtn.style.opacity = "1";
      menuBtn.style.pointerEvents = "auto";
      body.style.overflow = "auto";
      scrollBtn.style.pointerEvents = "auto";
    };

    // Close side navigation
    cancelBtn.onclick = hideNavMenu;

    // Close side navigation when a menu link is clicked
    let navLinks = document.querySelectorAll(".menu li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", hideNavMenu);
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      });
    });

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Animate progress bars
    window.addEventListener('load', function() {
      document.querySelectorAll('.progress-bar').forEach(bar => {
        bar.style.setProperty('--percentage', bar.style.getPropertyValue('--percentage'));
      });
    });

    // Add focus styles for keyboard navigation
    document.addEventListener('keyup', function(e) {
      if(e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-nav');
      }
    });

    document.addEventListener('mousedown', function() {
      document.documentElement.classList.remove('keyboard-nav');
    });

    // Prevent context menu
    document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
    });

    /* ── Form validation + AJAX submit for Contact Section ── */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      const submitBtn = document.getElementById('submitBtn');
      const successBanner = document.getElementById('successBanner');
      const errorBanner = document.getElementById('errorBanner');

      function validateField(el) {
        const isEmpty = !el.value.trim();
        const isInvalid = el.required && (isEmpty || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)));
        el.classList.toggle('error', isInvalid);
        return !isInvalid;
      }

      function updateCount(el) {
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = el.value.length;
      }

      const msgField = document.getElementById('message');
      if (msgField) {
        msgField.addEventListener('input', function() {
          updateCount(this);
        });
      }

      // Live validation on blur
      contactForm.querySelectorAll('input[required], select[required], textarea[required]').forEach(el => {
        el.addEventListener('blur', () => validateField(el));
        el.addEventListener('input', () => { if (el.classList.contains('error')) validateField(el); });
      });

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all required fields
        let valid = true;
        contactForm.querySelectorAll('input[required], select[required], textarea[required]').forEach(el => {
          if (!validateField(el)) valid = false;
        });

        // Check consent
        const consent = document.getElementById('consent');
        if (consent && !consent.checked) {
          consent.classList.add('error');
          valid = false;
        } else if (consent) {
          consent.classList.remove('error');
        }

        // Message min length
        const msg = document.getElementById('message');
        if (msg && msg.value.trim().length < 20) {
          msg.classList.add('error');
          valid = false;
        }

        if (!valid) return;

        // Loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        successBanner.classList.remove('show');
        errorBanner.classList.remove('show');

        try {
          const formData = new FormData(contactForm);
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();

          if (data.success) {
            successBanner.classList.add('show');
            contactForm.reset();
            const charCount = document.getElementById('charCount');
            if (charCount) charCount.textContent = '0';
          } else {
            errorBanner.classList.add('show');
          }
        } catch (err) {
          errorBanner.classList.add('show');
        } finally {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }
      });
    }
