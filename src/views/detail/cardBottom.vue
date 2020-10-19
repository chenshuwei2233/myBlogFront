<template>
	<div class="card-bottom">
		<div class="praise">
			<span ><img :src="zan" alt="" @click="praise"></span>
			<i>{{blog.praise}}</i>
			<span><img src="../../assets/img/png/liuyan.png" alt=""></span>
			<i>{{comment}}</i>
		</div>
	</div>
</template>

<script>
	import {
		EventBus
	} from '../../eventbus/event-bus.js'
	import { getBlogDetail,updatePraise } from 'network/front.js'
	export default {
		name: 'cardBottom',
		data() {
			return {
				zan: require('../../assets/img/png/zan.png'),
				praiseFlag: 0,
				comment: 0,
				blog: {}
			}
		},
		created() {
			getBlogDetail(this.$route.params.id).then(res => {
				this.blog = res.data.data[0];
				
			})
		},
		mounted() {
			EventBus.$on('commentNumber', msg => {
				this.comment = msg
			})
		},
		methods: {
			praise() {
				if(this.praiseFlag == 0) {
					this.zan = require('../../assets/img/png/zanred.png')
					this.praiseFlag += 1
					this.blog.praise += 1
					updatePraise(this.$route.params.id, this.blog).then(res => {
						
					})
					return 
				}
				this.zan = require('../../assets/img/png/zan.png')
				this.praiseFlag -= 1
				this.blog.praise -= 1
				updatePraise(this.$route.params.id, this.blog).then(res => {
					
				})
			}
		},
	
	}
</script>

<style scoped="scoped">
	.card-bottom {
		background-color: #FFFFFF;
		padding: 0px 24px 20px;
		height: 36px;
	}
	.praise img {
		width: 24px;
		height: 24px;
		margin-right: 8px;
		float: left;
	}
	.praise img:hover {
		cursor: pointer;
	}
	.praise i {
		margin-top: 4px;
		font-style: normal;
		font-size: 18px;
		float: left;
		margin-right: 20px;
	}
	
</style>
