<template lang="html">

  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" @click="menuClick(index,$event)" :class="index==menuCurrentIndex?'menu-item-selected':'menu-item'">
          <span class="text">
            <iconMap v-show="item.type>0" :iconType="item.type"></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
            <li v-for="item in goods" class="food-list food-list-hook">
                <h1 class="title">{{item.name}}</h1>
				<ul>
					<li v-for="food in item.foods" class="food-item" @click="goDetail(food)">
						  <div class="icon">
						        <img width="57" height="57" :src="food.icon"/>
						  </div>
						  <div class="content">
							    <h2 class="name">{{food.name}}</h2>
							    <p class="desc" v-show="item.description">{{food.description}}</p>
							    <div class="extra">
								     <span class="count">月售{{food.sellCount}}份</span>
								     <span class="rating">好评率{{food.rating}}%</span>
							    </div>
							    <div class="price">
								     <span class="now"><span class="unit">￥</span>{{food.price}}</span>
								     <span v-show="item.oldPrice" class="old">￥{{food.oldPrice}}</span>
							    </div>
							    <div class="cartcontrol-wrapper">
							        <!--在goods列表中的foods列表中的每一项food-->
							        <cartcontrol :food="food"></cartcontrol>
							
							    </div>
						  </div>
					</li>
				</ul>
            </li>
      </ul>
    </div>

	<!--往购物车子组件中加 配送费，起送价，用户选择的foods-->
    <shopCart :deliveryPrice="seller.deliveryPrice" :minPrice = "seller.minPrice" :selectFoods="selectFoods"></shopCart>
    <!--<foodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></foodDetail>-->
  </div>

</template>

<script>
import iconMap from '../iconMap/iconMap'
import BScroll from 'better-scroll'
import shopCart from '../shopCart/shopCart'
import cartcontrol from '../cartcontrol/cartcontrol'
import foodDetail from '../foodDetail/foodDetail'
//import Vue from 'vue'

//const ERR_OK = 0
//const eventHub = new Vue()
export default {
  props: {
    seller: Object
  },
  created() {
      this.$http.post("http://localhost:80/elemserver/goods.php",{},{
      }).then((res)=>{
	      //console.log(res.data);
	      this.goods = res.data;
	      console.log(this.goods);
	      this.$nextTick(()=>{
		      this._initScroll();
		      this._calculateHeight();
	      });

      }).catch((err)=>{
          console.log(err);
      });
  },
  data() {
    return {
        goods: [],
	    selectedFood:[],
        foodsScrollY:0,
        listHeight: [],
    }
  },
  computed: {
		menuCurrentIndex(){
		    for(let i=0;i<this.listHeight.length;i++){
		        let topHeight = this.listHeight[i];
		        let bottomHeight = this.listHeight[i+1];
		        if (!bottomHeight || (this.foodsScrollY >= topHeight && this.foodsScrollY < bottomHeight)) {
		            return i;
		        }
		    }
		    return 0;
		},
	  selectFoods(){
		  let foods = [];
		  //遍历goods
		  this.goods.forEach((good)=>{
			    //遍历foods
		  	    good.foods.forEach((food)=>{
		  	    	if(food.count){
		  	    		foods.push(food);
			        }
		        });
		  });
		  return foods;
	  }
  },
  methods: {
     _initScroll(){
         this.menuWrapper = new BScroll(this.$refs.menuWrapper,{
             click:true
         });
         this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
             click:true,
             probeType: 3
         });
         this.foodsScroll.on('scroll',(pos)=>{
             //console.log(Math.abs(Math.round(pos.y)));
             this.foodsScrollY = Math.abs(Math.round(pos.y));

         });
     },
      _calculateHeight(){
            //querySelectorAll 得到所有li元素，有点像jquery的class选择器
            let foodList = this.$refs.foodsWrapper.querySelectorAll('.food-list-hook');
          //console.log(foodList);
            let height = 0;
            this.listHeight.push(height);
            //获得每一个li的高度并存储在listHeight数组里
            for(let i=0,l=foodList.length;i<l;i++){
                //foodList[i].clientHeight  li自身的高度
                height += foodList[i].clientHeight;
                this.listHeight.push(height);
            }
      },

      menuClick(index,event){
	      if (!event._constructed) {
		      return;
	      }
	      this.foodsScroll.scrollTo(0,-this.listHeight[index],500);
      },
	
	  goDetail(food) {
//		  this.selectedFood = food;
//		  this.$nextTick(() => {
//			  this.$refs.myFood.showToggle()
//		  })
	  }
  },
  components: {
    iconMap,
    shopCart,
    cartcontrol,
    foodDetail
  }
}

</script>

<style lang="scss">
@import '../../assets/scss/mixin';
.goods {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 80px;
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;
        .menu-item-selected{
            background:white;
            font-weight:700;
            margin-top:-1px;
        }
        .menu-item,.menu-item-selected{
            display: table;
            height: 54px;
            width: 56px;
            padding: 0 12px;
            line-height: 14px;
            .text {
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                position: relative;
                font-size: 12px;
                &:after {
                    display: block;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    border-top: 1px solid rgba(7, 17, 27, 0.1);
                    content: ' ';
                }
            }
        }
	    .menu-item-selected{
		    .text {&:after {border-top: 1px solid #fff;}}
	    }
    }
    .foods-wrapper {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        .title {
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            border-left: 2px solid #d9dde1;
            font-size: 12px;
            color: #93999f;
            background: #f3f5f7;
        }
        .food-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            position: relative;
            &:after {
                display: block;
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                border-top: 1px solid rgba(7, 17, 27, 0.1);
                content: ' ';
            }
            &:last-child {
                margin-bottom: 0;
                &:after {
                    display: none;
                }
            }
            .icon {
                -webkit-box-flex: 0;
                -ms-flex: 0 0 57px;
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                -webkit-box-flex: 1;
                -ms-flex: 1;
                flex: 1;
                .name {
                    margin: 2px 0 8px 0;
                    height: 14px;
                    line-height: 14px;
                    font-size: 14px;
                    color: #07111b;
                }
                .desc, .extra {
                    line-height: 10px;
                    font-size: 10px;
                    color: #93999f;
                }
                .desc {
                    line-height: 12px;
                    margin-bottom: 8px;
                }
                .extra .count {
                    margin-right: 12px;
                }
                .price {
                    font-weight: 700;
                    line-height: 24px;
                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: #f01414;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: #93999f;
                    }
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 12px;
                }
            }
        }
    }
}


</style>
