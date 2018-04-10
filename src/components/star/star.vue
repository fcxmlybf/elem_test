<template lang="html">
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>
<script>
	const cls_on = 'on'
	const cls_half = 'half'
	const cls_off = 'off'
	
	export default {
		props:{
			size:{type:Number},
			score:{type:Number}
		},
		computed:{
			itemClasses(){
				let result = [];
				let hasDecimal = this.score%1;
				for(let i=0;i<parseInt(this.score);i++){
					result.push(cls_on);
				}
				if(hasDecimal==0||hasDecimal<0.5){
					result.push(cls_off);
				}
				if(hasDecimal>=0.5){
					result.push(cls_half);
				}
				return result;
			},
			starType(){
				return 'star-' + this.size;
			}
		},
		data(){
			return{
			
			}
		}
	}
</script>
<style lang="scss">
	.star {
		font-size: 0;
		.star-item {
			display: inline-block;
			background-repeat: no-repeat;
		}
		&.star-48 .star-item {
			width: 20px;
			height: 20px;
			margin-right: 22px;
			background-size: 20px 20px;
			&:last-child {
				margin-right: 0;
			}
			&.on {
				background-image: url('img/star48_on@2x.png');
			}
			&.half {
				background-image: url('img/star48_half@2x.png');
			}
			&.off {
				background-image: url('img/star48_off@2x.png');
			}
		}
		&.star-36 .star-item {
			width: 15px;
			height: 15px;
			margin-right: 6px;
			background-size: 15px 15px;
			&:last-child {
				margin-right: 0;
			}
			&.on {
				background-image: url('img/star36_on@2x.png');
			}
			&.half {
				background-image: url('img/star36_half@2x.png');
			}
			&.off {
				background-image: url('img/star36_off@2x.png');
			}
		}
		&.star-24 .star-item {
			width: 10px;
			height: 10px;
			margin-right: 3px;
			background-size: 10px 10px;
			&:last-child {
				margin-right: 0;
			}
			&.on {
				background-image: url('img/star24_on@2x.png');
			}
			&.half {
				background-image: url('img/star24_half@2x.png');
			}
			&.off {
				background-image: url('img/star24_off@2x.png');
			}
		}
	}

</style>
