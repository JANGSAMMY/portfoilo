export const interest = () => {
    gsap.registerPlugin(ScrollTrigger);

    const stickySection = document.querySelector('.con3 .steps');
    if (!stickySection) return;

    const cards = document.querySelectorAll('.con3 .incards .incard');
    const countContainer = document.querySelector('.con3 .count-container');
    const totalCards = cards.length;
    const stepHeight = window.innerHeight * 5;

    const arcAngle = Math.PI * 0.4;
    const startAngle = Math.PI / 2 - arcAngle / 2;
    const getRadius = () =>
        window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5;

    function positionCards(progress = 0) {
        const radius = getRadius();
        const totalTravel = 1 + totalCards / 7.5;
        const adjustedProgress = (progress * totalTravel - 1) * 0.75;

        cards.forEach((card, i) => {
            const normalizedProgress = (totalCards - 1 - i) / totalCards;
            const cardProgress = normalizedProgress + adjustedProgress;
            const angle = startAngle + arcAngle * cardProgress;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const rotation = (angle - Math.PI / 2) * (180 / Math.PI);

            gsap.set(card, {
                x,
                y: -y + radius,
                rotation: -rotation,
                transformOrigin: 'center center',
            });
        });
    }

    function updateCounter(progress) {
        if (!countContainer) return;

        const currentIndex = Math.floor(progress * totalCards);

        gsap.to(countContainer, {
            y: 100 - currentIndex * 100,
            duration: 0.3,
            ease: 'power1.out',
        });
    }

    ScrollTrigger.create({
        trigger: stickySection,
        start: 'top top',
        end: `+=${stepHeight}px`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
            positionCards(self.progress);
            updateCounter(self.progress);
        },
    });

    positionCards(0);
    updateCounter(0);

    window.addEventListener('resize', () => {
        positionCards(0);
        updateCounter(0);
    });
};
