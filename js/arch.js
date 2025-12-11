document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.snap-section');
    const sectionLinks = document.querySelectorAll('.section-link');
    const blogItems = document.querySelectorAll('.blog-item');
    const blogContents = document.querySelectorAll('.blog-content');

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                sectionLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    blogItems.forEach(item => {
        item.addEventListener('click', function() {
            const contentId = this.getAttribute('data-content');

            blogItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            blogContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('data-id') === contentId) {
                    content.classList.add('active');
                }
            });
        });
    });

    const eventImages = document.querySelectorAll('#event .image-grid img');

    eventImages.forEach((img, index) => {
        const imageNumber = index + 1;
        const originalSrc = `img/ev${imageNumber}.jpeg`;
        const hoverSrc = `img/ev${imageNumber}-h.jpg`;

        img.addEventListener('mouseenter', function() {
            this.src = hoverSrc;
        });

        img.addEventListener('mouseleave', function() {
            this.src = originalSrc;
        });
    });

    const contestImages = document.querySelectorAll('#contest .image-grid img');

    contestImages.forEach((img, index) => {
        const imageNumber = index + 1;
        const originalSrc = `img/cts${imageNumber}.webp`;
        const hoverSrc = `img/cts${imageNumber}-h.jpg`;

        img.addEventListener('mouseenter', function() {
            this.src = hoverSrc;
        });

        img.addEventListener('mouseleave', function() {
            this.src = originalSrc;
        });
    });

});