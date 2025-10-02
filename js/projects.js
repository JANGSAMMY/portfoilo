export const projects = () => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray('.subs');
    const container = document.querySelector('.container2');

    const totalScrollDistance = () => container.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
        defaults: {
            ease: 'none',
        },
        scrollTrigger: {
            trigger: '.wrapper',
            pin: true,
            scrub: 1,
            end: () => '+=' + totalScrollDistance(),
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    });

    tl.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
    });
};
