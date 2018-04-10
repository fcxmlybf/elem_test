<template lang="html">
  <transition name="move">
    <div class="food" ref="detailWrapper" v-show="showDetail">
        <div class="detail-content">
	      <div class="image-header">
	        <div class="back" @click="showToggle()">
	          <i class="icon-arrow_lift"></i>
	        </div>
	        <img :src="food.image" height="425" width="100%">
	        <div class="content">
	          <div class="title">{{food.name}}</div>
	          <div class="detail">
	            <span class="sell-count">月售{{food.sellCount}}</span>
	            <span>好评率{{food.rating}}%</span>
	          </div>
	          <div class="price">
	            <span class="unit">￥</span>{{food.price}}
	            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
	          </div>
	          <div class="cartcontrol-wrapper">
	            <transition name="fade">
	              <div class="buy" @click="addCart($event)" v-show="!food.count">加入购物车</div>
	            </transition>
	          </div>
	          <cartcontrol :food="food"></cartcontrol>
	        </div>
	        <div class="divider"></div>
	        <div class="info">
	          <div class="title">商品介绍</div>
	          <div class="text">{{food.info}}</div>
	        </div>
	        <div class="divider"></div>
	        <div class="rating">
	          <div class="title">
	            商品评价
	          </div>
	          <div class="ratingselect">
		          <div class="rating-type border-1px">
		            <span v-for="(item,index) in classifyArr" class="" :class="{'active':item.active,'bad':index==2,'badActive':item.active&&index==2}" @click="filterEvel(item)">
		              {{item.name}}<span class="count">{{item.count}}</span>
		            </span>
		          </div>
		          <div class="switch" @click="evelflag=!evelflag">
		            <span class="icon-check_circle" :class="{'on':evelflag}"></span>
		            <span class="text">只看有内容的评价</span>
		          </div>
	          </div>
	          <div class="rating-wrapper">
	            <ul>
	              <li class="rating-item" v-for="evel in evelArr">
	                <div class="user">
	                  <div class="time">{{evel.rateTime | time}}</div>
	                  <div class="user">
	                    <span class="name">{{evel.username}}</span>
	                    <span class="avatar"><img :src="evel.avatar" width="12" height="12"></span>
	                  </div>
	                </div>
	                <div class="text">
	                  <span class="icon" :class="evel.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
	                  <span class="">{{evel.text}}</span>
	                </div>
	              </li>
	            </ul>
	            <div class="no-rating" style="display: none;">暂无评价</div>
	          </div>
	        </div>
	      </div>
        </div>
    </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
	export default {
		components: {
			cartcontrol
		},
		props: {
			food: Object
		},
		data() {
			return {
				showDetail: false,
				classifyArr: [{
					name: '全部',
					count:0,
					//count: this.food.ratings.length,
					active: true
				}, {
					name: '推荐',
					count:0,
					//count: this.food.ratings.filter((data) => data.rateType === 0).length,
					active: false
				}, {
					name: '吐槽',
					count:0,
					//count: this.food.ratings.filter((data) => data.rateType).length,
					active: false
				}],
				evelflag: true
			}
		},
		computed:{
			evelArr() {
				let selectIndex = 0;
				this.classifyArr.forEach((data, index) => {
					if (data.active) {
						selectIndex = index
					}
				});
				if (this.detailWrapper) {
					this.$nextTick(() => {
						this.detailWrapper.refresh()
					})
				}
				//return selectIndex ? this.food.ratings.filter((data) => this.evelflag ? data.rateType === selectIndex - 1 && data.text : data.rateType === selectIndex - 1) : this.food.ratings.filter((data) => this.evelflag ? data.text : true)
			}
		},
		methods:{
			showToggle() {
				this.showDetail = !this.showDetail;
				if (this.showDetail) {
					this.$nextTick(() => {
						this._initScroll()
					})
				}
			},
			_initScroll() {
				if (!this.detailWrapper) {
					this.detailWrapper = new BScroll(this.$refs.detailWrapper, {
						click: true
					});
				} else {
					this.detailWrapper.refresh();
				}
			},
			addCart(event) {
				if (!event._constructed) {
					return
				}
				this.$set(this.food, 'count', 1);
				this.$root.eventHub.$emit('cart.add', event.target)
			},
			filterEvel(item) {
				this.classifyArr.forEach((data) => {
					data.active = false
				});
				item.active = true
			}
		}
	}
	
</script>

<style lang="scss">
	.food {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		z-index: 30;
		width: 100%;
		background: #fff;
		&.move-transition {
			-webkit-transition: all 0.2s linear;
			transition: all 0.2s linear;
			-webkit-transform: translate3d(0, 0, 0);
			transform: translate3d(0, 0, 0);
		}
		&.move-enter, &.move-leave {
			-webkit-transform: translate3d(100%, 0, 0);
			transform: translate3d(100%, 0, 0);
		}
		.image-header {
			position: relative;
			width: 100%;
			//height: 0;
			//padding-top: 100%;
			img {
				//position: absolute;
				//top: 0;
				//left: 0;
				width: 100%;
				height: 100%;
			}
			.back {
				position: absolute;
				top: 10px;
				left: 0;
				z-index: 33;
				.icon-arrow_lift {
					display: block;
					padding: 10px;
					font-size: 20px;
					color: #fff;
				}
			}
		}
		.content {
			position: relative;
			padding: 18px;
			.title {
				line-height: 14px;
				margin-bottom: 8px;
				font-size: 14px;
				font-weight: 700;
				color: #07111b;
			}
			.detail {
				margin-bottom: 18px;
				line-height: 10px;
				height: 10px;
				font-size: 0;
				.sell-count, .rating {
					font-size: 10px;
					color: #93999f;
				}
				.sell-count {
					margin-right: 12px;
				}
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
				right: 12px;
				bottom: 12px;
			}
			.buy {
				position: absolute;
				right: 18px;
				bottom: 18px;
				z-index: 10;
				height: 24px;
				line-height: 24px;
				padding: 0 12px;
				box-sizing: border-box;
				border-radius: 12px;
				font-size: 10px;
				color: #fff;
				background: #00a0dc;
				&.fade-transition {
					-webkit-transition: all 0.2s;
					transition: all 0.2s;
					opacity: 1;
				}
				&.fade-enter, &.fade-leave {
					opacity: 0;
					z-index: -1;
				}
			}
		}
		.info {
			padding: 18px;
			.title {
				line-height: 14px;
				margin-bottom: 6px;
				font-size: 14px;
				color: #07111b;
			}
			.text {
				line-height: 24px;
				padding: 0 8px;
				font-size: 12px;
				color: #4d555d;
			}
		}
		.rating {
			padding-top: 18px;
			.title {
				line-height: 14px;
				margin-left: 18px;
				font-size: 14px;
				color: #07111b;
			}
			.rating-wrapper {
				padding: 0 18px;
				.rating-item {
					position: relative;
					padding: 16px 0;
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
					.user {
						position: absolute;
						right: 0;
						top: 16px;
						line-height: 12px;
						font-size: 0;
						.name {
							display: inline-block;
							margin-right: 6px;
							vertical-align: top;
							font-size: 10px;
							color: #93999f;
						}
						.avatar {
							border-radius: 50%;
						}
					}
					.time {
						margin-bottom: 6px;
						line-height: 12px;
						font-size: 10px;
						color: #93999f;
					}
					.text {
						line-height: 16px;
						font-size: 12px;
						color: #07111b;
						.icon-thumb_up, .icon-thumb_down {
							margin-right: 4px;
							line-height: 16px;
							font-size: 12px;
						}
						.icon-thumb_up {
							color: #00a0dc;
						}
						.icon-thumb_down {
							color: #93999f;
						}
					}
				}
				.no-rating {
					padding: 16px 0;
					font-size: 12px;
					color: #93999f;
				}
			}
		}
	}
</style>
