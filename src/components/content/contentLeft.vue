<template>
	<div class="left">
		<!-- <swiper :swiperData="swiperData" class="swiper"></swiper>
		<tableControl class='table-control'></tableControl>
		<contentBlogs></contentBlogs> -->
		<keep-alive exclude="Category,Search,Tag,Detail">
			<router-view v-if="isRouterAlive"></router-view>
		</keep-alive>
		
	</div>
</template>
<script>
	// import swiper from './swiper/Swiper.vue'
	// import tableControl from './tabControl/tableControl.vue'
	// import contentBlogs from './contentBlogs/contentBlogs.vue'
	export default {
		name: 'contentLeft',
		
		data() {
			return {
				isRouterAlive: true
			}
		},
	
		methods: {
			reload(){
				this.isRouterAlive = false
				this.$nextTick(() => {
					this.isRouterAlive = true
				})
			}
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			'$route.path': {
				handler: function(newVal, oldVal) {
						if(this.$store.state.dark == 1) {
							document.querySelector('body').style.backgroundColor = 'black';
							document.querySelector('.left').style.backgroundColor = 'black';
						} else {
							document.querySelector('body').style.backgroundColor = '#fff';
						}
				}
			},
			dark(newVal, oldVa) {
				if(newVal == 1) {
					if(this.$route.path == '/detail/' + this.$route.params.id) {
						document.querySelector('.left').style.backgroundColor = '#1d1f20';
					} else {
						document.querySelector('.left').style.backgroundColor = 'black';
					}
					return 
				}
			}
		}
		// components: {
		// 	swiper,
		// 	tableControl,
		// 	contentBlogs
		// },
		// props: {
		// 	blogs: {
		// 		type: Array,
		// 		default() {
		// 			return []
		// 		}
		// 	}
		// },
		// computed: {
		// 	swiperData() {
		// 		let ary = []
		// 		this.blogs.forEach(item => {
		// 			if(item.rotation != 0) {
		// 				ary.push(item)
		// 			}
		// 		})
		// 		return ary
		// 	}
		// },
	}
</script>

<style scoped="scoped">
	.left {
		
		width: 75%;
		padding-left: 10px;
		padding-right: 30px;
	}
	
	
</style>
