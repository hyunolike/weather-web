'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './ServiceNoticeSlider.module.scss'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'

export default function ServiceNoticeSlider() {
  return (
    <div className={styles.main}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
      >
        <SwiperSlide className={styles.slider}>
          새로운 차원의 경험 오직 날씨의속삭임🌤️에서만
        </SwiperSlide>
        <SwiperSlide className={styles.slider}>
          24년 07월 서비스 오픈 예정 🚀
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
