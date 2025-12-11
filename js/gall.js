const items = document.querySelectorAll('.gallery .item');
const gridMargin = 50;
const gridGutter = 50;
const gridWidth = 1920 - (gridMargin * 10);
const columnWidth = (gridWidth - (gridGutter * 3)) / 4;

const col1Left = 0;
const col3Right = gridWidth;

const totalItems = items.length;
const initialOverlap = -113;
const selectedOverlap = -80;

document.addEventListener("click", function (e) {
    if (e.target === document.body) {
        window.location.reload();
    }
});

function setInitialPositions() {
    const totalSpread = (totalItems - 1) * Math.abs(initialOverlap);
    const startX = col1Left;
    const endX = col3Right;
    const availableSpace = endX - startX;
    const actualSpread = Math.min(totalSpread, availableSpace);
    const spacing = actualSpread / (totalItems - 1);

    items.forEach((item, index) => {
        const x = startX + (index * spacing);
        item.style.transform = `translateX(${x}px)`;
        item.style.zIndex = index + 1;
    });
}

items.forEach((item, clickedIndex) => {
    item.addEventListener('click', () => {
        const isAlreadyActive = item.classList.contains('active');

        if (isAlreadyActive) {
            const bookId = item.getAttribute('data-id').replace('bk', '');
            window.location.href = `dir.html#${bookId}`;
            return;
        }

        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        items.forEach((other, idx) => {
            if (idx === clickedIndex) {
                other.style.transform = `translateX(${col1Left}px)`;
                other.style.zIndex = 100;
            } else {
                const stackIndex = idx < clickedIndex ? idx : idx - 1;
                const remainingCount = totalItems - 1;
                const x = col3Right - ((remainingCount - stackIndex - 1) * Math.abs(selectedOverlap));
                other.style.transform = `translateX(${x}px)`;
                other.style.zIndex = 10 + stackIndex;
            }
        });
    });
});

setInitialPositions();