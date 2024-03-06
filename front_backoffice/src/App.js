import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Parallax, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  const slides = [
    {
      title: "제목 1",
      subtitle: "부제 1",
      description: "설명 1",
      image: "/1번.png"
    },
    {
      title: "제목 2",
      subtitle: "부제 2",
      description: "설명 2",
      image: "/2번.png"
    },
    {
      title: "제목 3",
      subtitle: "부제 3",
      description: "설명 3",
      image: "/3번.png"
    }
  ];

  return (
    <Swiper
      speed={600}
      parallax={true}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
      className="mySwiper"
    >
      <div
        slot="container-start"
        className="parallax-bg"
        style={{ 'background-image': 'url(/4445.jpg)' }}
        data-swiper-parallax="-23%"
      ></div>
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="slide">
          <div className="slide-content">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="slide-image" />
            <div className="text-content">
              <h2 className="title">{slide.title}</h2>
              <h3 className="subtitle">{slide.subtitle}</h3>
              <p className="description">{slide.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}