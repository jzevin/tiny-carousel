const log = console.log.bind(console);

const rnd = (()=>{
  const int = (min=0,max=1) => Math.floor(Math.random() * (max - min + 1) + min);
  const real = (min=0.0,max=1.0) => Math.random() * (max - min) + min;
  const pick = (array) => array[int(0,array.length-1)];
  return {
    int,
    real,
    pick
  };
})();


const ZevCarousel = (function () {
    
    let idNum = 0;
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const Slide = (function () {
        function Slide(parentEl, index) {
            const initEl = ()=>{
                console.dir(this.parentEl)
                log(this.parentEl.clientHeight)
                this.w = this.parentEl.clientWidth*0.925;
                this.h = this.parentEl.clientHeight;
                this.el = document.createElement('div');
                this.el.classList.add('slide');
                parentEl.appendChild(this.el);
            }
            this.parentEl = parentEl;
            initEl();
            this.origin = this.w * -2;
            this.x = this.w * index;
            this.moveDistance = this.w;
            // style
            this.el.style.transform = (`translateX(${this.x}px)`);
            this.el.style.transition = '325ms ease-in-out';
            this.el.style.width = `${this.w}px`;
        }
        Slide.prototype.move = function() {
            this.x += this.moveDistance;
            if(this.x >= this.moveDistance * 3) {
                this.x = this.origin;
            }
            this.el.style.transform = `translateX(${this.x}px)`;
        }
        return Slide;
    })();

    const getStyles = (id) => {
        return `
            #${id} * { box-sizing: border-box; }
            #${id} {
                position: relative;
                display: flex;
                justify-content: center;
            }
            #${id} .controls {
                position: absolute;
                z-index: 1;
                left: 0; top: 0; right: 0; bottom: 0;
                display: flex;
                justify-content: space-between;
            }
            #${id} .controls .controls__btn{
                flex: 0 0 7.5%;
                outline: 1px dashed hsla(40,80%,80%,0.2);
                background-color: hsla(0,0%,100%,0.1);
            }
            #${id} .slide{
                background-color: #111;
            }
        `;
    }

    const getControlsHtml = () => {
        return `
            <div class="controls">
                <div class="controls__btn controls__btn--prev" data-direction="prev">&lt;</div>
                <div class="controls__btn controls__btn--next" data-direction="next">&gt;</div>
            </div>
        `;
    }

    const view = (function () {
        const dom = {};
        function init(target, height) {
            dom.targetEl = target;
            dom.el = document.createElement('div');
            dom.el.id = `zev-carousel--${idNum}`;
            dom.targetEl.insertAdjacentElement('afterbegin', dom.el);
            // inject controls
            dom.el.insertAdjacentHTML('afterbegin', getControlsHtml());
            dom.h = height | 300;
            // init and inject styles
            dom.styleEl = document.createElement('style');
            dom.styleEl.innerHTML = getStyles(dom.el.id);
            dom.targetEl.insertAdjacentElement('beforebegin', dom.styleEl);
            // listeners
            dom.el.addEventListener('click', onClick);
            // slides
            dom.slides = [];
            dom.slides[0] = new Slide(dom.el, 0);
            // update view
            update();
        }
        function update() {
            dom.el.style.height = `${dom.h}px`;
        }
        function onClick(e) {
            const btn = e.target.closest('.controls__btn');
            if(!btn) {
                return;
            } else {
                // log(btn.dataset.direction)
                dom.slides.forEach(s=>s.move());
            }
        }
        return {
            dom,
            init
        }
    })();

    function ZevCarousel(targetElement, height) {
        this.view = view;
        view.init(targetElement, height);
    }
    return ZevCarousel;
})();


const zc = new ZevCarousel(
    document.querySelector('#trgt')
);

log(zc.view.dom);