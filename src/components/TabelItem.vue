<template>
  <div class="content">
    <img src="../../static/images/back-img.png" style="width:100%; height:100%; position: fixed; top: 0; left: 0; z-index: -100;">
    <div class="bg-title">
      <span class="title-text">全流程一览</span>
    </div>
    <!-- 第一种 -->
    <div class="tabel-wrap">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, i) in listData" :key="i">
            <div class="item" v-if="item.reptheTaskInfoBean">
              <div class="top-box">
                <span class="label" :class="{'blue':item.reptheTaskInfoBean.taskStatus==='已签', 'green':item.reptheTaskInfoBean.taskStatus==='已审', 'purpol':item.reptheTaskInfoBean.taskStatus==='已策'}">{{item.reptheTaskInfoBean.taskStatus}}</span>
                <!-- <span class="title">{{item.reptheTaskInfoBean.taskName}}</span> -->
              </div>
              <div style="height: 75px; margin-left: 2%">
                <span class="title">{{item.reptheTaskInfoBean.taskName}}</span>
              </div>
              <div style="overflow: hidden; margin-top: 2%;">
                <div class="person">
                  <span class="text-wrap">
                    <img src="../../static/images/header.png">
                    <span>创建者：{{item.reptheTaskInfoBean.createrName}}</span>
                  </span>
                  <span class="text-wrap">
                    <img src="../../static/images/header.png">
                    <span>报题者：{{item.reptheTaskInfoBean.userName}}</span>
                  </span>
                  <span class="text-wrap">
                    <img src="../../static/images/header.png">
                    <span>参与者：{{item.reptheTaskInfoBean.participantName !== '' ? item.reptheTaskInfoBean.participantName:'无'}}</span>
                  </span>
                </div>
                <div class="plat-timer">
                  <span class="text-wrap">
                    <img src="../../static/images/platform.png">
                    <span>发布平台：{{item.reptheTaskInfoBean.taskChannel}}</span>
                  </span>
                  <span class="text-wrap">
                    <img src="../../static/images/timer.png">
                    <span>创建时间：{{item.reptheTaskInfoBean.taskTime}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-pagination" id="swiperPagination"></div>
      </div>
    </div>

    <!-- tree -->
    <div class="swiper-container3">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in listData" :key="i">
          <TreeItem :item="item" :id="i"></TreeItem>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts'
import Swiper from 'swiper'
// import '../../node_modules/swiper/dist/css/swiper.min.css'
import 'swiper/dist/css/swiper.min.css'
import textData from '../../static/textData'
import TreeItem from '../components/TreeItem.vue'
import axios from 'axios'
export default {
  name: 'TabelItem',
  data () {
    return {
      listData: [],
      judgeData: false,
      autoplay: 6000,
    }
  },
  mounted () {
    this.getData()
    setInterval(() => {
      console.log("0.5小时刷新")
      location.reload()
    }, 1000 * 60 * 60 * 0.5) 
  },
  methods: {
    getData () {
      // axios.get(`/api/newsbdzh/api/bscreen/bdzh/repthe/process`).then((resp) => {
      //   resp.data.data.forEach ((val, i) => {
      //     if (val.reptheTaskInfoBean) {
      //       this.judgeData = true
      //       if(resp.data.data.length > 10) {
      //         this.listData = resp.data.data.slice(0, 10)
      //       } else {
      //         this.listData = resp.data.data
      //       }
            
      //     }
      //   })
      // })
      this.listData = textData.data.splice(0, 10)
    }
  },
  components: {
    TreeItem
  },
  updated () {
    this.$nextTick(() => {
      new Swiper('.swiper-container', {
        autoplay: this.autoplay,
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        observer:true,
        observeParents:true,
      })
      new Swiper('.swiper-container3', {
        autoplay: this.autoplay,
        effect : 'fade',
        fade: {
          crossFade: true,
        },
        observer:true,
        observeParents:true,
      })
    })
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
.bg-title {
  margin-top: 1%;
  width: 100%;
  height: 8%;
  background-size: 100% 100%;
  background-image: url('../../static/images/bg-title.png');
}
.title-text {
  font-size: 45px;
  font-family: fantasy;
  text-align: center;
  display: inline-block;
  font-weight: 600;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #fff, #0baaff);
  -webkit-background-clip: text;
  color: transparent;
}
.tabel-wrap {
  width: 38%;
  height: 30%;
  margin: 0 0 0 2%;
  border: 3px solid #254e95;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  color: #fff;
  position: absolute;
}
.leftTopArrow {
  position: absolute;
  left: -3px;
  top: -8px;
}
.rightBottomArrow {
  position: absolute;
  right: -3px;
  bottom: -8px;
}
.label {
  width: 10%;
  padding-bottom: 1%;
  padding-top: 1%;
  text-align: center;
  display: block;
  margin: 2% 0 1.5% 2%;
  font-size: 24px;
  font-weight: bold;
  color: white;
  background: #165bd1;
}
.title {
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  font-size: 32px;
  color: yellow;
  margin-right: 1%;
}
.text-wrap {
  display: flex;
  align-items: center;
  margin-top: 2.5%;
}
.text-wrap img {
  min-width: 25px;
  width: 25px;
  height: 25px;
}
.text-wrap span {
  color: #8498dc;
  font-size: 23px;
  margin-left: 2%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.person {
  width: 54%;
  margin-left: 2%;
  float: left;
}
.plat-timer {
  width: 40%;
  float: right;
  margin-right: 2%;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-container3 {
  width: 100%;
  height: 70%;
  position: absolute;
  top: 50%;
  transform: translate(0,-28%);
}
.green {
  background: green;
}
.purpol {
  background: #9467b4;
}
.blue {
 background: #165bd1;
}
</style>
<style>
#swiperPagination {
  position: absolute;
  text-align:end;
  margin-right: 5%;
  right: 5%;
  bottom: 2%;
}
#swiperPagination span:last-child {
  margin-right: 4%;
}
#swiperPagination .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 100%;
  background: #fff;
  opacity: 0.2;
  margin-right: 1%;
}
#swiperPagination .swiper-pagination-bullet-active {
  background: #2F5EAC;
  opacity: 1;
}
</style>