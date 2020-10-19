<template>
	<div class="swiper">
		<div class="block">
			<el-carousel >
				<el-carousel-item v-for="(item, index) in swiperData" :key="index" >
					<img :src='item.preview' alt="" @click='toDetail(item.id)'>
					<div class="title">{{item.title}}</div>
				</el-carousel-item>
			</el-carousel>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Swiper',
		props: {
			swiperData: {
				type: Array,
				default() {
					return []
				}
			}
		},
		created() {
			
		},
		methods: {
			toDetail(id) {
				let flag = navigator.userAgent.match(
					/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
				);
				if (flag) {
					this.$router.push('/detail/' + id)
				} else {
					window.open('/detail/' + id);
					localStorage.setItem('dark', this.$store.state.dark)
				}
			}
		}
	}
</script>

<style >
	.swiper {
		width: 100%;
		position: relative;
	
	}
	.swiper:hover {
		cursor: pointer;
	}
	.el-carousel__item h3 {
	    color: #475669;
	    font-size: 14px;
	    opacity: 0.75;
	    line-height: 150px;
	    margin: 0;
	  }
	
	  .el-carousel__item:nth-child(2n) {
	     background-color: #99a9bf;
	  }
	  
	  .el-carousel__item:nth-child(2n+1) {
	     background-color: #d3dce6;
	  }
		.swiper img{
			width: 100%;
			height: 100%;
		}
		.title {
			position: absolute;
			bottom: 24px;
			font-size: 24px;
			left: 24px;
			right: 24px;
			color: #fff;
		}
		@media screen and (max-width: 800px) {
			 .el-carousel__container {
				height: 230px;
			}
			.swiper img{
				width: 100%;
				height: 100%;
			}
			.title {
				font-size: 16px;
				bottom: 16px;
				left: 16px;
				right: 16px;
			}
 		}
		@media screen and (max-width: 450px) {
			 .el-carousel__container {
				height: 128px;
			}
			.swiper img{
				width: 100%;
				height: 100%;
			}
			.title {
				font-size: 16px;
				bottom: 16px;
				left: 16px;
				right: 16px;
			}
		}
</style>
