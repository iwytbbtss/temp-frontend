<template>
  <div class="detail">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(img, i) in place.img" :key="i">
        <img class="slide-img" :src="require(`@/assets/place/${place.name}/${img}`)" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div class="intro">
      <h1>{{ place.title }}</h1>
      <p style="word-break: keep-all; line-height: 30px; margin-top:25px">{{ place.intro }}</p>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: { swiper, swiperSlide },
  data() {
    return {
      place: this.$store.getters.getPlaces.find(el => el.id==this.$route.params.id),
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.detail {
  display: flex;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  justify-content: center;
  flex-wrap: wrap;
}

.swiper {
  width: 29vw;
  height: 63vh;
  top: 5%;
  border-radius: 5px;
  margin: 0 2.5% 0 2.5%;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  color: salmon;
}

.intro {
  width: 27vw;
  height: auto;
  padding: 2.5%;
}

.intro h1 {
  text-align: center;
}

@media screen and (max-width: 1200px) {
  .swiper {
    width: 58vw;
  }
  .intro {
    width: 58vw;
    margin-top: 30px;
  }
}

@media screen and (max-width: 768px) {
  .swiper {
    width: 70vw;
    max-height: 40%;
    margin-top: 40px;
  }
  .intro {
    width: 70vw;
    margin-top: 30px;
  }
}
</style>
