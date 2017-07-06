<template>
  <div class='ratings'>
    <div>
      <div class="ratings-content">
        <div class='overview'>
          <div class='overview-left'>
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class='overview-right'>
            <div class='score-wrapper'>
              <span class="title">服务态度</span>
              <star :size='36' :score='seller.serviceScore'></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class='score-wrapper'>
              <span class="title">商品评分</span>
              <star :size='36' :score='seller.foodScore'></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class='delivery-wrapper'>
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @increment='incrementTotal' :select-type='selectType' :only-content='onlyContent' :ratings='ratings'></ratingselect>
      <div class='rating-wrapper'>
        <ul>
          <li v-for='rating in ratings' class='rating-item border-1px' v-show='needShow(rating.rateType, rating.text)'>
            <div class="avatar">
              <img :src="rating.avatar" width='28' height='28' alt="">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class='star-wrapper'>
                <star :size='24' :score='rating.score'></star>
                <span class='delivery' v-show='rating.deliveryTime'>
                  {{rating.deliveryTime}}
                </span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show='rating.recommend && rating.recommend.length'>
                <i class='icon-thumb_up'></i>
                <span class='item' v-for='item in rating.recommend'>{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    const ERR_OK = 0;
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    import BScroll from 'better-scroll';
    import star from 'components/star/star';
    import { formatDate } from 'common/js/date';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';

    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          ratings: [],
          selectType: ALL,
          onlyContent: true
        };
      },
      created() {
        this.$http.get('/api/ratings').then((response) => {
            console.info("$el",this.$el)
          response = response.body;
          if(response.errno === ERR_OK){
            this.ratings = response.data;
            this.$nextTick(() => {
                if(!this.scroll){
                    this.scroll = new BScroll(this.$el, {
                        click: true
                    });
                }else{
                    this.scroll.refresh();
                }
            });
          }
        });
      },
      methods: {
        incrementTotal(type, data) {
            this[type] = data;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        needShow(type, text){
          if(this.onlyContent && !text){
            return false;
          }
          if(this.selectType === ALL){
            return true;
          }else{
            return type === this.selectType;
          }
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      components: {
        star,
        split,
        ratingselect
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
    .ratings
        position: absolute
        top: 174px
        bottom: 0
        left: 0
        width: 100%
        overflow: hidden
        .overview
            display: flex
            padding: 18px 0
            .overview-left
                flex: 0 0 137px
                padding: 6px 0
                width: 137px
                border-right: 1px solid rgba(7,17,27,0.3)
                text-align: center
                @media only screen and (max-width:320px)
                    flex: 0 0 110px
                    width: 110px
                    // padding: 6px 0
                .score
                    margin-bottom: 6px
                    line-height: 28px
                    font-size: 24px
                    color: rgb(255,153,0)
                .title
                    margin-bottom: 8px
                    line-height: 12px
                    font-size: 12px
                    color: rgb(7,17,27)
                .rank
                    padding-bottom: 6px
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147,153,159)
            .overview-right
                flex: 1
                padding: 6px 0 6px 24px
                @media only screen and (max-width:320px)
                    padding-left: 6px
                .score-wrapper
                    margin-bottom: 6px
                    font-size: 0
                    .title
                        display: inline-block
                        vertical-align: top
                        line-height: 18px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .star
                        display: inline-block
                        line-height: 18px
                        padding: 0 12px
                        vertical-align: top
                    .score
                        display: inline-block
                        vertical-align: top
                        font-size: 12px
                        color: rgb(255, 153, 0)
                .delivery-wrapper
                    font-size: 0
                    .title
                        line-height: 18px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                    .delivery
                        margin-left: 12px
                        font-size: 12px
                        color: rgb(147, 153, 159)
        .rating-wrapper
            padding: 0 18px;
            .rating-item
                display: flex
                padding: 18px 0
                border-1px(rgba(7,17,27,0.1))
                .avatar
                    flex: 0 0 28px
                    width: 28px
                    margin-right: 12px
                    img
                        border-radius: 50%
                .content
                    position: relative
                    flex: 1
                    .name
                        margin-bottom: 4px
                        font-size: 10px
                        line-height: 12px
                        color: rgb(7,17,27)
                    .star-wrapper
                        margin-bottom: 6px
                        font-size: 0
                        .star
                            display: inline-block
                            line-height: 18px
                            margin-right: 6px
                            vertical-align: top
                        .delivery
                            display: inline-block
                            vertical-align: top
                            color: rgb(147,153,159)
                            font-size: 10px
                    .text
                        margin-bottom: 8px
                        line-height: 18px
                        color: rgb(7,17,27)
                        font-size: 12px
                    .recommend
                        line-height: 16px
                        font-size: 0
                        .icon-thumb_up, .item
                            display: line-height
                            margin: 0 8px 4px 0
                            font-size: 9px
                        .icon-thumb_up
                            color: rgb(0,160,220)
                        .item
                            padding: 0 6px
                            border: 1px solid rgba(7,17,27,0.1)
                            border-radius: 1px
                            color: rgb(147, 153, 159)
                            background: #fff
                    .time
                        position: absolute
                        top: 0
                        right: 0
                        font-size: 12px
                        color: rgb(147, 153, 159)









</style>