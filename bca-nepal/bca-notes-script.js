  // Mobile menu functionality
        document.addEventListener('DOMContentLoaded', function() {
            const menuBtn = document.querySelector('.mobile-menu-btn');
            const closeBtn = document.querySelector('.close-menu');
            const mobileNav = document.getElementById('mobile-nav');
            const overlay = document.getElementById('overlay');
            
            function openMenu() {
                mobileNav.classList.add('show');
                overlay.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
            
            function closeMenu() {
                mobileNav.classList.remove('show');
                overlay.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
            
            menuBtn.addEventListener('click', openMenu);
            closeBtn.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);
            
            // Close menu when clicking on links
            const navLinks = document.querySelectorAll('.mobile-nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
            
            // Adjust for window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    closeMenu();
                }
            });
        });
        