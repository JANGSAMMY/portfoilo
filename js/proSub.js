export const proSub = () => {
    document.querySelectorAll('.proSubs').forEach((item) => {
        item.addEventListener('mouseenter', function () {
            gsap.set(this.querySelectorAll('span'), { opacity: 0 });
            gsap.to(this.querySelectorAll('span'), {
                opacity: 1,
                duration: 0.075,
                stagger: {
                    from: 'random',
                    each: 0.02,
                },
                ease: 'power2.out',
            });
        });

        item.addEventListener('mouseleave', function () {
            gsap.to(this.querySelectorAll('span'), {
                opacity: 0,
                duration: 0.075,
                stagger: {
                    from: 'random',
                    each: 0.02,
                },
                ease: 'power2.in',
            });
        });
    });
};
