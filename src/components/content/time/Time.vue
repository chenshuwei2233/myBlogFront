<template>
	<div class="time">
		<img :src='img' alt="">
		<span class="wh">{{wh}}</span>
		<span class="sj">{{sj}}</span>
	</div>
</template>

<script>
	export default {
		name: 'Time',
		data() {
			return {
				img: '',
				wh: '',
				sj: '',
				timer: null
			}
		},
		created() {
			this.time()
		},
		destroyed() {
			clearInterval(this.timer)
		},
		methods: {
			time() {
					this.timer = setInterval(() => {
						var date = new Date()
						var hour = date.getHours()
						
						if(6 <= hour && hour < 12 ) {
							this.img = require('../../../assets/img/time/zao.jpg');
							this.wh = '上午好'
							this.sj = '一日之计在于晨，一年之计在于春'
							
						}
						 else if(12 <= hour && hour < 18) {
							this.img = require('../../../assets/img/time/xi.jpg')
							this.wh = '下午好'
							this.sj = '一个人，一杯茶，一本书，一轮暖阳'
						
						}
						else if(18 <= hour && hour < 24) {
							this.img = require('../../../assets/img/time/wan.jpg')
							this.wh = '晚上好'
							this.sj = '今夜月明人尽望，不知秋思落谁家。'
						
						}
						else {
							this.img = require('../../../assets/img/time/wan.jpg')
							this.wh = '晚上好'
							this.sj = '今夜月明人尽望，不知秋思落谁家。'
						
						}
					}, 1000)
			}
		}
	}
</script>

<style scoped="scoped">
	.time {
		width: 100%;
		height: 255px;
		position: relative;
		
	}

	.time img {
		width: 100%;
		height: 100%;
		border-radius: 4px;  
	}

	.wh {
		position: absolute;
		font-size: 32px;
		color: #fff;
		top: 24px;
		left: 24px;
	}

	.sj {
		position: absolute;
		font-size: 12px;
		color: #FFFFFF;
		bottom: 24px;
		left: 24px;
	}
</style>
