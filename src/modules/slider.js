import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

export const slider = () => {
    const swiper = new Swiper('.swiper', {
        modules: [Autoplay, Navigation, Pagination],
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}