<template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="" />
                    <div class="back" @click="back()">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food="food"></cartcontrol>
                    </div>
                    <div class="buy" v-show="!food.count || food.count === 0" @click="addFirst($event)">加入购物车</div>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                </div>
                <ratingselect @increment='incrementTotal' :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
                <div class="rating-wrapper">
                    <ul v-show="food.rating && food.ratings.length">
                        <li v-for="rating in food.ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img src="" alt="" class="avatar" width="12" height="12" :src="rating.avatar"/>
                            </div>
                            <div class="time">{{rating.rateTime | formatDate}}</div>
                            <p class="text">
                                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.rating || !food.ratings.length">暂无评价</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from "better-scroll";
    import Vue from "vue";
    //引入的js文件中使用export方法输出函数，可能会输出多个，所以用{}
    import {formatDate} from "common/js/date.js";
    import cartcontrol from "components/cartcontrol/cartcontrol";
    import split from "components/split/split";
    import ratingselect from "components/ratingselect/ratingselect";

    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: "全部",
                    positive: "推荐",
                    negative: "吐槽"
                }
            }
        },
        // created() {
        //     this.$root.eventHub.$on('ratingType.select',(target) => {
        //         this.changeRating(target)
        //     });
        //     this.$root.eventHub.$on('content.toggle',(target) => {
        //         this.toggleContents(target)
        //     });
        // },
        // beforeDestroy: function () {
        //   this.$root.eventHub.$off('ratingType.select', this.changeRating)
        //   this.$root.eventHub.$off('content.toggle', this.toggleContents)
        // },
        methods: {
            show() {
                this.showFlag = true;
                this.selectType = ALL;
                this.onlyContent = true;
                this.$nextTick(() => {
                    if(!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food,{
                            click: true
                        })
                    } else {
                        this.scroll.refresh();
                    }
                })
            },
            back() {
                this.showFlag = false;
            },
            addFirst(event) {
                Vue.set(this.food,"count",1);
            },
            selectChange(val) {
                this.selectType = val;
            },
            onlyChange(val) {
                this.onlyContent = val;
            },
            needShow(type,text) {
                if (this.onlyContent && !text) {
                    return false;
                }
                if(this.selectType === ALL) {
                    return true;
                } else {
                    return type === this.selectType;
                }
            },
            toggleContents(target) {
                this.onlyContent = !target;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            changeRating(target) {
                this.selectType = target;
                this.$nextTick(() => {
                    this.scroll.refresh();
                })
            },
            incrementTotal(type, data) {
                this[type] = data;
                this.$nextTick(() => {
                    this.scroll.refresh();
                });
            },
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date,"yyyy-MM-dd hh:mm");
            }
        },
        components: {
            cartcontrol,split,ratingselect
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin"
    .food
        position: fixed
        top: 0
        left: 0
        bottom: 48px
        z-index: 30
        width: 100%
        background: #fff
        transform: translate3d(0, 0, 0)
        &.move-enter-active, &.move-leave-active
                transition: all .3s linear
        &.move-enter, &.move-leave-active
                transform: translate3d(100%,0,0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 20px
                    color: #fff
        .content
            padding: 18px
            position: relative
            .title
                line-height: 14px
                margin-bottom: 8px
                font-size: 14px
                font-weight: 700
                color: rgb(7,17,27)
            .detail
                margin-bottom: 18px
                line-height: 14px
                font-size: 0
                height: 10px
                .sell-count, .rating
                    font-size: 10px
                    color: rgb(147, 153, 159)
                .sell-count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 18px
                    font-size: 14px
                    color: rgb(240,20,20)
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147,153,159)
            .cartcontrol-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                font-size: 10px
                border-radius: 12px
                color: #fff
                background: rgb(0,160,220)
        .info
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7,17,27)
            .text
                line-height: 24px
                padding: 0 8px
                font-size: 12px
                color: rgb(77,85,93)
        .rating
            padding-top: 18px
            .title
                line-height: 14px
                margin-left: 18px
                font-size: 14px
                color: rgb(7,17,27)
        .rating-wrapper
            padding: 0 18px
            .rating-item
                position: relative
                padding: 16px 0
                border-1px(rgba(7,17,27,0.1))
                .user
                    position: absolute
                    right: 0
                    top: 16px
                    line-height: 12px
                    font-size: 0
                    .name
                        display: inline-block
                        vertical-align: top
                        font-size: 10px
                        color: rgb(147,153,159)
                    .avatar
                        border-radius: 50%
                .time
                    margin: 0 0 6px 0
                    line-height: 12px
                    font-size: 10px
                    color: rgb(147,153,159)
                .text
                    line-height: 16px
                    font-size: 12px
                    color: rgb(7,17,27)
                    .icon-thumb_up , .icon-thumb_down
                        margin-right: 4px
                        line-height: 24px
                        font-size: 12px
                    .icon-thumb_up
                        color: rgb(0,160,220)
                    .icon-thumb_down
                        color: rgb(147,153,159)
            .no-rating
                padding: 16px 0
                font-size: 12px
                color: rgb(147,153,159)


</style>
