<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to='/goods'>
                商品
            </router-link>
        </div>
        <div class="tab-item">
            <router-link to='/ratings'>
                评论
            </router-link>
        </div>
        <div class="tab-item">
            <router-link to='/seller'>
                商家
            </router-link>
        </div>
    </div>
    <keep-alive>
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<script>
    import header from './components/header/head.vue';

    const ERR_OK = 0;
    export default{
        data() {
            return {
                seller: {}
            }
        },
        created() {
            this.$http.get('/api/seller').then(response => {
                // get body data
                if(response.body.errno == ERR_OK){
                    this.seller = response.body.data;
                }
            });
        },
        components: {
            'v-header': header
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
        @import "./common/stylus/mixin.styl"
        .tab
            display: flex
            width: 100%
            height: 40px
            line-height: 40px
            border-1px(rgba(7,17,27,0.1))
            .tab-item
                flex: 1
                text-align: center
                & > a
                    display: block
                    font-size: 14px
                    color: rgb(77,85,93)
                    text-de
                    &.active
                        color: rgb(240,20,20)

</style>
<!-- border-bottom: 1px solid rgba(7,17,27,0.1) -->
                    <!-- text-decoration: none -->
