const observerOptions = {
    threshold: 0.5
};

const section2Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('.sliding-images img');
            images.forEach((img, index) => {
                setTimeout(() => {
                    img.style.transition = 'all 1s ease-out';
                    img.style.opacity = '1';
                    img.style.transform = 'translateX(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

const section2 = document.querySelector('#section2');
if (section2) {
    section2Observer.observe(section2);
}

const section3Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const images = entry.target.querySelectorAll('.falling-images img');
            images.forEach((img, index) => {
                setTimeout(() => {
                    img.style.transition = 'all 2s ease-out';
                    img.style.opacity = '1';
                    img.style.transform = 'translateY(0)';
                }, index * 150);
            });
        }
    });
}, observerOptions);

const section3 = document.querySelector('#section3');
if (section3) {
    section3Observer.observe(section3);
}


const section3Parallax = document.querySelector('#section3');
const fallingImagesContainer = document.querySelector('.falling-images');

if (section3Parallax && fallingImagesContainer) {
    let animationComplete = false;

    const checkAnimationComplete = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animationComplete = true;
                }, 150 * 14 + 1500);
            }
        });
    }, observerOptions);

    checkAnimationComplete.observe(section3Parallax);

    section3Parallax.addEventListener('mousemove', (e) => {
        if (!animationComplete) return;

        const rect = section3Parallax.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;

        if (mouseX > rect.width / 2) {
            const images = fallingImagesContainer.querySelectorAll('img');
            const centerX = rect.width * 0.75;
            const centerY = rect.height / 2;

            const offsetX = (e.clientX - rect.left - centerX) / centerX;
            const offsetY = (e.clientY - rect.top - centerY) / centerY;

            images.forEach((img, index) => {
                const depth = (index % 3 + 1) * 20;
                const moveX = offsetX * depth;
                const moveY = offsetY * depth;

                const currentTransform = img.style.transform;
                const translateYMatch = currentTransform.match(/translateY\(([^)]+)\)/);
                const currentY = translateYMatch ? translateYMatch[1] : '0';

                img.style.transform = `translateY(${currentY}) translate(${moveX}px, ${moveY}px)`;
                img.style.transition = 'transform 0.3s ease-out';
            });
        }
    });

    section3Parallax.addEventListener('mouseleave', () => {
        if (!animationComplete) return;

        const images = fallingImagesContainer.querySelectorAll('img');
        images.forEach(img => {
            img.style.transform = 'translateY(0) translate(0, 0)';
            img.style.transition = 'transform 0.5s ease-out';
        });
    });
}