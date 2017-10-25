<template lang="html">
	<div>
		<div class="shopcart">
			<div class="content">
				<div class="content-left" @click="listToggle">
					<div class="logo-wrapper">
						<div class="badge" v-show="totalCount">
							{{totalCount}}
						</div>
						<div class="logo" :class="{'active':totalPrice}">
							<i class="icon-shopping_cart" :class="{'active':totalPrice}"></i>
					    </div>
					</div>
				
					<div class="price" :class="{'active':totalPrice}">
					    ￥{{totalPrice}}
					</div>
					<div class="desc">
					    另需要配送费￥{{deliveryPrice}}元
					</div>
				</div>
				<div class="content-right"><div class="pay not-enough" :class="{'enough':totalPrice>=minPrice}">{{payDesc}}</div></div>
		    </div>
		</div>
		<!--<div class="ball-container">-->
			<!--<transition name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="(ball,index) in balls">-->
				<!--<div class="ball" v-show="ball.show">-->
					<!--<div class="inner inner-hook"></div>-->
				<!--</div>-->
			<!--</transition>-->
	    <!--</div>-->
	</div>
</template>
<script>
	export default {
		props: {
			selectFoods: {
				type: Array,
				default: []
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data(){
			return{
			
			}
		},
		computed:{
			totalCount(){
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count+=food.count;
				});
				return count;
			},
			totalPrice(){
				let price = 0;
				this.selectFoods.forEach((food)=>{
					if(food.count){
						price += food.count*food.price;
					}
				});
				return price;
			},
			payDesc(){
				if(!this.totalPrice){
					return this.minPrice+"元起送";
				}else if(this.totalPrice<this.minPrice){
					return "还差￥"+(this.minPrice-this.totalPrice)+"元";
				}else{
					return "去结算"
				}
			}
		},
		methods:{
			listToggle(){
			
			},
			
			beforeEnter(){
			
			},
			enter(){
			
			},
			afterEnter(){
			
			}
		}
	}
</script>
<style lang="scss">
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	.content {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			background: #141d27;
			font-size: 0;
			color: rgba(255, 255, 255, 0.4);
		.content-left {
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
			.logo-wrapper {
					display: inline-block;
					vertical-align: top;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					border-radius: 50%;
					background: #141d27;
				.logo {
						width: 100%;
						height: 100%;
						border-radius: 50%;
						text-align: center;
						background: #2b343c;
					&.active {
							background: #00a0dc;
						}
					.icon-shopping_cart {
							line-height: 44px;
							font-size: 24px;
							color: #80858a;
						&.active {
								color: #fff;
							}
						}
					}
				.num {
						position: absolute;
						top: 0;
						right: 0;
						width: 24px;
						height: 16px;
						line-height: 16px;
						text-align: center;
						border-radius: 16px;
						font-size: 9px;
						font-weight: 700;
						color: #fff;
						background: #f01414;
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
					}
				}
			.price {
					display: inline-block;
					vertical-align: top;
					margin-top: 12px;
					line-height: 24px;
					padding-right: 12px;
					box-sizing: border-box;
					border-right: 1px solid rgba(255, 255, 255, 0.1);
					font-size: 16px;
					font-weight: 700;
				&.highlight {
						color: #fff;
					}
				}
			.desc {
					display: inline-block;
					vertical-align: top;
					margin: 12px 0 0 12px;
					line-height: 24px;
					font-size: 10px;
				}
			}
		.content-right {
				-webkit-box-flex: 0;
				-ms-flex: 0 0 105px;
				flex: 0 0 105px;
				width: 105px;
			.pay {
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
				&.not-enough {
						background: #2b333b;
					}
				&.enough {
						background: #00b43c;
						color: #fff;
					}
				}
			}
		}
	.ball-container .ball {
			position: fixed;
			left: 32px;
			bottom: 22px;
			z-index: 200;
		&.drop-transition {
				-webkit-transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
				transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
			.inner {
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: #00a0dc;
					-webkit-transition: all 0.4s linear;
					transition: all 0.4s linear;
				}
			}
		}
	.shopcart-list {
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			width: 100%;
		&.fold-transition {
				-webkit-transition: all 0.5s;
				transition: all 0.5s;
				-webkit-transform: translate3d(0, -100%, 0);
				transform: translate3d(0, -100%, 0);
			}
		&.fold-enter, &.fold-leave {
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}
		.list-header {
				height: 40px;
				line-height: 40px;
				padding: 0 18px;
				background: #f3f5f7;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
			.title {
					float: left;
					font-size: 14px;
					color: #07111b;
				}
			.empty {
					float: right;
					font-size: 12px;
					color: #00a0dc;
				}
			}
		.list-content {
				padding: 0 18px;
				max-height: 217px;
				overflow: hidden;
				background: #fff;
			.food {
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
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
				.name {
						line-height: 24px;
						font-size: 14px;
						color: #07111b;
					}
				.price {
						position: absolute;
						right: 90px;
						bottom: 12px;
						line-height: 24px;
						font-size: 14px;
						font-weight: 700;
						color: #f01414;
					}
				.cartcontrol-wrapper {
						position: absolute;
						right: 0;
						bottom: 6px;
					}
				}
			}
		}
	}
	
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
	&.fade-transition {
			-webkit-transition: all 0.5s;
			transition: all 0.5s;
			opacity: 1;
			background: rgba(7, 17, 27, 0.6);
		}
	&.fade-enter, &.fade-leave {
			opacity: 0;
			background: rgba(7, 17, 27, 0);
		}
	}
</style>
