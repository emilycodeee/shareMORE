export const settings = {
  infinite: true,
  lazyLoad: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 4000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
