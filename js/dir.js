const dirItems = document.querySelectorAll('.dir-item[data-id]');

dirItems.forEach(item => {
    const row = item.querySelector('.dir-row');
    const content = item.querySelector('.dir-content');

    row.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        if (isOpen) {
            item.classList.remove('active');

            if (row) {
                row.style.transition = 'background-color 0.5s ease, color 0.5s ease';
                row.style.backgroundColor = '';
                row.style.color = '';
            }

            if (content) {
                content.style.transition = 'max-height 0.5s ease, opacity 0.5s ease, padding 0.5s ease, background-color 0.5s ease, color 0.5s ease';
                content.style.backgroundColor = '';
                content.style.color = '';
                content.style.opacity = '';
                content.style.display = '';
            }

            return;
        }

        dirItems.forEach(i => {
            if (i === item) return;
            i.classList.remove('active');
            const r = i.querySelector('.dir-row');
            const c = i.querySelector('.dir-content');
            if (r) {
                r.style.transition = 'background-color 0.5s ease, color 0.5s ease';
                r.style.backgroundColor = '';
                r.style.color = '';
            }
            if (c) {
                c.style.transition = 'max-height 0.5s ease, opacity 0.5s ease, padding 0.5s ease, background-color 0.5s ease, color 0.5s ease';
                c.style.backgroundColor = '';
                c.style.color = '';
                c.style.opacity = '';
                c.style.display = '';
            }
        });

        item.classList.add('active');

        if (row) {
            row.style.transition = 'background-color 0.5s ease, color 0.5s ease';
            row.style.backgroundColor = '#ECB500';
            row.style.color = '#5F2D8F';
        }
        if (content) {
            content.style.transition = 'max-height 0.5s ease, opacity 0.5s ease, padding 0.5s ease, background-color 0.5s ease, color 0.5s ease';
            content.style.backgroundColor = '#ECB500';
            content.style.color = '#5F2D8F';
        }

        setTimeout(() => {
            const itemRect = item.getBoundingClientRect();
            const itemTop = itemRect.top + window.pageYOffset;
            const itemHeight = itemRect.height;
            const windowHeight = window.innerHeight;
            const scrollTo = itemTop - (windowHeight / 2) + (itemHeight / 2);

            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        }, 500);
    });
});

const body = document.body;

const galleries = {
    'tp': ['thb1.jpg', 'thb2.jpg', 'thb3.jpg', 'thb4.jpg', 'thb5.jpg', 'thb6.jpg', 'thb7.jpg'],
    'wah': ['wah1.jpg', 'wah2.jpg', 'wah3.jpg', 'wah4.jpg', 'wah5.jpg', 'wah6.jpg', 'wah7.jpg', 'wah8.jpg', 'wah9.jpg', 'wah10.jpg', 'wah11.jpg', 'wah12.jpg'],
    'oct': ['oct1.jpg', 'oct2.jpg', 'oct3.jpg', 'oct4.jpg', 'oct5.jpg', 'oct6.jpg']
};

let currentGallery = null;
let currentGalleryKey = null;
let currentPage = 0;

const tpImg = document.querySelector('.dir-img.tp');
const wahImg = document.querySelector('.dir-img.wah');
const octImg = document.querySelector('.dir-img.oct');

if (tpImg) {
    tpImg.addEventListener('click', (e) => {
        e.stopPropagation();
        currentGalleryKey = 'tp';
        currentGallery = galleries['tp'];
        currentPage = 0;
        showPreview();
    });
}

if (wahImg) {
    wahImg.addEventListener('click', (e) => {
        e.stopPropagation();
        currentGalleryKey = 'wah';
        currentGallery = galleries['wah'];
        currentPage = 0;
        showPreview();
    });
}

if (octImg) {
    octImg.addEventListener('click', (e) => {
        e.stopPropagation();
        currentGalleryKey = 'oct';
        currentGallery = galleries['oct'];
        currentPage = 0;
        showPreview();
    });
}

function showPreview() {
    let overlay = document.querySelector('.preview-overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'preview-overlay';
        body.appendChild(overlay);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }

    const container = document.createElement('div');
    container.className = 'preview-container';

    const startIdx = currentPage * 2;
    const endIdx = Math.min(startIdx + 2, currentGallery.length);
    const maxPage = Math.floor((currentGallery.length - 1) / 2);
    const isLastPage = currentPage === maxPage;

    for (let i = startIdx; i < endIdx; i++) {
        const img = document.createElement('img');
        img.src = 'img/' + currentGallery[i];

        if (currentGalleryKey === 'oct') {
            img.style.width = '405px';
            img.style.height = 'auto';
            container.style.gridTemplateColumns = '405px 405px';
        }

        if (i === startIdx) {
            if (currentPage === 0) {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    overlay.classList.remove('active');
                });
            } else {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentPage--;
                    showPreview();
                });
            }
        }

        if (i === startIdx + 1) {
            if (currentPage < maxPage) {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    currentPage++;
                    showPreview();
                });
            } else {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    overlay.classList.remove('active');
                });
            }
        }

        if (isLastPage && i === currentGallery.length - 1 && currentGallery.length % 2 === 1) {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                overlay.classList.remove('active');
            });
        }

        container.appendChild(img);
    }

    overlay.innerHTML = '';
    overlay.appendChild(container);
    overlay.classList.add('active');
}

if (tpImg) {
    const originalSrc = tpImg.src;
    const hoverSrc = 'img/thb1-read.jpg';

    tpImg.addEventListener('mouseenter', () => {
        tpImg.src = hoverSrc;
    });

    tpImg.addEventListener('mouseleave', () => {
        tpImg.src = originalSrc;
    });
}

if (wahImg) {
    const originalSrc = wahImg.src;
    const hoverSrc = 'img/wah1-read.jpg';

    wahImg.addEventListener('mouseenter', () => {
        wahImg.src = hoverSrc;
    });

    wahImg.addEventListener('mouseleave', () => {
        wahImg.src = originalSrc;
    });
}

if (octImg) {
    const originalSrc = octImg.src;
    const hoverSrc = 'img/oct1-read.png';

    octImg.addEventListener('mouseenter', () => {
        octImg.src = hoverSrc;
    });

    octImg.addEventListener('mouseleave', () => {
        octImg.src = originalSrc;
    });
}

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        setTimeout(() => {
            const targetItem = document.querySelector(`.dir-item[data-id="${hash}"]`);
            if (targetItem) {
                const row = targetItem.querySelector('.dir-row');
                if (row) {
                    row.click();
                }
            }
        }, 100);
    }
});