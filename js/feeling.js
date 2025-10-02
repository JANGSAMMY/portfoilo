export const feeling = () => {
    document.addEventListener('DOMContentLoaded', () => {
        gsap.registerPlugin(ScrollTrigger);

        function animateChars(chars, reverse = false) {
            const staggerOptions = {
                each: 0.35,
                from: reverse ? 'start' : 'end',
                ease: 'linear',
            };

            gsap.fromTo(
                chars,
                { fontWeight: 100 },
                {
                    fontWeight: 900,
                    duration: 1,
                    ease: 'none',
                    stagger: staggerOptions,
                    scrollTrigger: {
                        trigger: chars[0].closest('.marquee-container'),
                        start: '50% bottom',
                        end: 'top top',
                        scrub: true,
                    },
                }
            );
        }

        const splitText = new SplitType('.item h1', { types: 'chars' });

        const marqueeContainers = document.querySelectorAll('.marquee-container');

        marqueeContainers.forEach((container, index) => {
            let start = '0%';
            let end = '-15%';

            if (index % 2 === 0) {
                start = '0%';
                end = '10%';
            }

            const marquee = container.querySelector('.marquee');
            const words = marquee.querySelectorAll('.item h1');

            gsap.fromTo(
                marquee,
                {
                    x: start,
                },
                {
                    x: end,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top bottom',
                        end: '150% top',
                        scrub: true,
                    },
                }
            );

            words.forEach((word) => {
                const chars = Array.from(word.querySelectorAll('.char'));
                if (chars.length) {
                    const reverse = index % 2 !== 0;
                    animateChars(chars, reverse);
                }
            });
        });

        document.fonts.ready.then(() => {
            const animateTexts = document.querySelectorAll('.animate-text');

            animateTexts.forEach((element) => {
                const originalSpans = element.querySelectorAll('span');
                originalSpans.forEach((span, index) => {
                    span.classList.add(`original-span-${index}`);
                });

                const split = new SplitType(element, {
                    types: 'words',
                    tagName: 'span',
                    splitChildren: true,
                });

                element.classList.add('split-ready');

                gsap.set(split.words, { opacity: 1 });

                gsap.from(split.words, {
                    duration: 0.8,
                    y: 20,
                    opacity: 0,
                    stagger: 0.03,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play reverse play reverse',
                    },
                });
            });
        });

        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    });
};
