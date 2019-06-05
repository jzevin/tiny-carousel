(function () {
    // TODO: Support for 3 to (n) images
    
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    function Slide(index) {
        this.id = index;
        this.isMoving = false;
        this.el = $$('.slide')[index];
        this.img = this.el.querySelector('img');
        this.boundary = 400 - (index * 100);
        this.origin = 0 - (index * 100)
        this.current = 0;
        this.el.addEventListener('transitionend', e => {
            this.isMoving = false;
            this.img.style.visibility = 'visible';
        });
        this.move = (direction) => {
            if (this.isMoving) return;
            const dir = direction === 'previous' ? -1 : direction === 'next' ? 1 : -1;
            this.isMoving = true;
            this.current += (100 * dir);
            if (this.current > this.boundary) {
                this.current = this.origin;
                this.img.style.visibility = 'hidden';
            }
            if (this.current < this.origin) {
                this.current = this.boundary;
                this.img.style.visibility = 'hidden';
            }
            this.el.style.transform = `translatex(${this.current}%)`;
        }
    }

    const slides = [];
    for (const i of [0, 1, 2, 3, 4]) {
        slides[i] = new Slide(i);
    }

    $('.carousel .controls').addEventListener('click', e => {
        slides.forEach(s => s.move(e.target.dataset.btnType))
    });
})();
