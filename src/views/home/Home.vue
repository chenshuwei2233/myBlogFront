<template>
	<div>
		<swiper :swiperData="swiperData" class="swiper"></swiper>
		<tableControl class='table-control'></tableControl>
		<contentBlogs></contentBlogs>
	</div>
</template>

<script>
	import swiper from 'components/content/swiper/Swiper.vue'
	import tableControl from 'components/content/tabControl/tableControl.vue'
	import contentBlogs from 'components/content/contentBlogs/contentBlogs.vue'
	import {
		login
	} from 'network/login.js'
	import {
		getBlogData
	} from 'network/blog.js'
	export default {
		name: 'Home',
		components: {
			swiper,
			tableControl,
			contentBlogs
		},
		data() {
			return {
				blogs: []
			}
		},
		created() {
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getBlogData('').then(res => {
					this.blogs = res.data.data
					
				})
			})
		},
		computed: {
			swiperData() {
				let ary = []
				this.blogs.forEach(item => {
					if (item.rotation != 0) {
						ary.push(item)
					}
				})
				return ary
			}
		}
	}
</script>

<style>
	.table-control {
		margin-top: 20px;
	}
</style>
