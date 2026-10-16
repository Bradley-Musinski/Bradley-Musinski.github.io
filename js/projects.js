
const carousel = document.getElementById("projectCarousel");
const prevBtn = document.getElementById("prevProject");
const nextBtn = document.getElementById("nextProject");

function scrollProjects(direction) {
    const cards = carousel.querySelectorAll(".project-card");

    if (cards.length === 0) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    carousel.scrollBy({
        left: direction * (cardWidth + gap),
        behavior: reducedMotion ? "instant" : "smooth"
    });
}

prevBtn.addEventListener("click", () => scrollProjects(-1));
nextBtn.addEventListener("click", () => scrollProjects(1));

function updateButtons() {
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    prevBtn.disabled = carousel.scrollLeft <= 1;
    nextBtn.disabled = carousel.scrollLeft >= maxScroll - 1;
}

carousel.addEventListener("scroll", updateButtons, { passive: true });
window.addEventListener("resize", updateButtons);
updateButtons();
