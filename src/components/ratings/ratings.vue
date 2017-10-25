<template>
	<div class="ratings">
		<div class="ratings-content">
			<div class="info">
				<div class="mark">
					<div class="num">{{seller.score}}</div>
					<div class="text">综合评分</div>
					<div class="contrast">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="stars">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<!--<star :size="36" :score="seller.serviceScore"></star>-->
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<!--<star :size="36" :score="seller.foodScore"></star>-->
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="split"></div>
			<div class="ratingselect">
				<div class="rating-type">
					<span v-for="(item,index) in classifyArr" class="block positive" :class="{'active':item.active,'negative':index==2,'badActive':item.active&&index==2}" @click="filterEvel(item)">
			            {{item.name}}<span class="count">{{item.count}}</span>
			        </span>
				</div>
				<div class="switch" @click="evelflag=!evelflag" :class="{'on':evelflag}">
					<span class="icon-check_circle"></span>
					<span class="text">只看有内容的评价</span>
				</div>
			</div>
		</div>
		<div class="rating-wrapper">
			<ul>
				<li class="rating-item" v-for="evel in evelArr">
					<div class="avatar">
						<img :src="evel.avatar" width="28" height="28">
					</div>
					<div class="content">
						<h1 class="name">{{evel.username}}</h1>
						<!--<div class="user">-->
							<!--<span class="name">{{evel.username}}</span>-->
							<!--<span class="rateTime">{{evel.rateTime | time}}</span>-->
						<!--</div>-->
						<div class="star-wrapper">
							<star :size="24" :score="evel.score"></star>
							<span class="deliveryTime">{{evel.deliveryTime}}分钟送达</span>
						</div>
						<div class="text">
							{{evel.text}}
						</div>
						<div class="recommend">
							<span class="icon icon-thumb_up" v-show="evel.recommend.length"></span>
							<span class="dish" v-for="dish in evel.recommend">{{dish}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		props:{
			seller:Object
		},
		data(){
			return{
				classifyArr:[
					{
						name:'全部',
						count:0,
						active:true
					},
					{
						name:'推荐',
						count:0,
						active:false
					},
					{
						name:'吐槽',
						count:0,
						active:false
					}
				],
				evelflag: true
			}
		},
		methods:{
			filterEvel(item){
				this.classifyArr.forEach((data)=>{
					data.active = false;
				});
				item.active = true;
			}
		}
	}
</script>
<style lang="scss">
	.ratings {
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.info {
			display: -webkit-box;
			display: -ms-flexbox;
			display: flex;
			padding: 18px 0;
			.mark {
				-webkit-box-flex: 0;
				-ms-flex: 0 0 137px;
				flex: 0 0 137px;
				padding: 6px 0;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.1);
				text-align: center;
				.num {
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: #f90;
				}
				.text {
					margin-bottom: 8px;
					line-height: 12px;
					font-size: 12px;
					color: #07111b;
				}
				.contrast {
					line-height: 10px;
					font-size: 10px;
					color: #93999f;
				}
			}
			.stars {
				-webkit-box-flex: 1;
				-ms-flex: 1;
				flex: 1;
				padding: 6px 0 6px 24px;
				.score-wrapper {
					margin-bottom: 8px;
					font-size: 0;
					.title {
						display: inline-block;
						line-height: 18px;
						vertical-align: top;
						font-size: 12px;
						color: #07111b;
					}
					.star {
						display: inline-block;
						margin: 0 12px;
						vertical-align: top;
					}
					.score {
						display: inline-block;
						line-height: 18px;
						vertical-align: top;
						font-size: 12px;
						color: #f90;
					}
				}
				.delivery-wrapper {
					font-size: 0;
					.title {
						line-height: 18px;
						font-size: 12px;
						color: #07111b;
					}
					.delivery {
						margin-left: 12px;
						font-size: 12px;
						color: #93999f;
					}
				}
			}
		}
		.split {
			width: 100%;
			height: 16px;
			border-top: 1px solid rgba(7,17,27,0.1);
			border-bottom: 1px solid rgba(7,17,27,0.1);
			background: #f3f5f7;
		}
		.ratingselect {
			.rating-type {
				padding: 18px 0;
				margin: 0 18px;
				position: relative;
				font-size: 0;
				&:after {
					display: block;
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					border-top: 1px solid rgba(7, 17, 27, 0.1);
					content: ' ';
				}
				.block {
					display: inline-block;
					padding: 8px 12px;
					margin-right: 8px;
					line-height: 16px;
					border-radius: 1px;
					font-size: 12px;
					color: #4d555d;
					&.active {
						background: rgba(0, 160, 220, 0.2);
						color: #fff;
					}
					.count {
						margin-left: 2px;
						font-size: 8px;
					}
					&.positive {
						background: rgba(0, 160, 220, 0.2);
						&.active {
							background: #00a0dc;
						}
					}
					&.negative {
						background: rgba(77, 85, 93, 0.2);
						&.active {
							background: #4d555d;
						}
					}
				}
			}
			.switch {
				padding: 12px 18px;
				line-height: 24px;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				color: #93999f;
				font-size: 0;
				&.on .icon-check_circle {
					color: #00c850;
				}
				.icon-check_circle {
					display: inline-block;
					vertical-align: top;
					margin-right: 4px;
					font-size: 24px;
				}
				.text {
					display: inline-block;
					vertical-align: top;
					font-size: 12px;
				}
			}
		}
		
		
		
		.rating-wrapper {
			padding: 0 18px;
			.rating-item {
				display: -webkit-box;
				display: -ms-flexbox;
				display: flex;
				padding: 18px 0;
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
				.avatar {
					-webkit-box-flex: 0;
					-ms-flex: 0 0 28px;
					flex: 0 0 28px;
					width: 28px;
					margin-right: 12px;
					img {
						border-radius: 50%;
					}
				}
				.content {
					position: relative;
					-webkit-box-flex: 1;
					-ms-flex: 1;
					flex: 1;
					.name {
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 10px;
						color: #07111b;
					}
					.star-wrapper {
						margin-bottom: 6px;
						font-size: 0;
						.star {
							display: inline-block;
							margin-right: 6px;
							vertical-align: top;
						}
						.delivery {
							display: inline-block;
							vertical-align: top;
							line-height: 12px;
							font-size: 10px;
							color: #93999f;
						}
					}
					.text {
						margin-bottom: 8px;
						line-height: 18px;
						color: #07111b;
						font-size: 12px;
					}
					.recommend {
						line-height: 16px;
						font-size: 0;
						.icon-thumb_up, .item {
							display: inline-block;
							margin: 0 8px 4px 0;
							font-size: 9px;
						}
						.icon-thumb_up {
							color: #00a0dc;
						}
						.item {
							padding: 0 6px;
							border: 1px solid rgba(7, 17, 27, 0.1);
							border-radius: 1px;
							color: #93999f;
							background: #fff;
						}
					}
					.time {
						position: absolute;
						top: 0;
						right: 0;
						line-height: 12px;
						font-size: 10px;
						color: #93999f;
					}
				}
			}
		}
	}
	
	@media only screen and (max-width: 320px) {
		.ratings .overview .overview-left {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 120px;
			flex: 0 0 120px;
			padding-left: 6px;
			width: 120px;
		}
	}
</style>
