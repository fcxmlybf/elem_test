<template>
    <div id="app">
        <bheader :seller="seller"></bheader>
        <div class="tab">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
    import header from '@/components/header/header.vue'
    export default {
        name:'app',
        data(){
            return{
                seller:{}
            }
        },
        created(){
            this.$http.get("http://localhost:9080/getdata").then((res)=>{
                //console.log(res);
                this.seller = res.data.seller
                //console.log(this.seller);
            }).catch((err)=>{
                console.log(err);
            });
        },
        components:{
            'bheader':header
        }
    }
</script>

<style lang="scss">
    @import "./assets/scss/index.scss";
    @import "./assets/icon.css";
    .tab{
        display:flex;
        width:100%;
        height:40px;
        line-height:40px;
        @include border-1px(rgba(7,17,27,0.1));
        .tab-item{
            flex:1;
            text-align:center;
            a{
                display:block;
                font-size:14px;
                color:rgb(77,85,93);
                &.active{
                     font-size:14px;
                     color:rgb(240,20,20);
                 }
            }
        }
    }
</style>
