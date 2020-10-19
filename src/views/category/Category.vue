<template>
	<div>
		<div class="go" >
			<span @click="goHome">我的主页</span>
			<span>></span>
			<span>{{sort[currentIndex]}}</span>
		</div>
		<div class="overlay">
			<img src="~assets/img/category/fx.jpg" alt="">
			<div class="overlay-center">
				<span>{{sort[currentIndex]}}</span>
				<span><i class="el-icon-document"></i>{{cBlogs.length}}篇文章</span>
			</div>
		</div>
		<categoryBlogs :showBlog='cBlogs'></categoryBlogs>
	</div>
</template>

<script>
	import {
		login
	} from 'network/login.js'
	import {
		getBlogData
	} from 'network/blog.js'
	import {
		getSortData
	} from 'network/sort.js'
	import categoryBlogs from './categoryBlogs.vue'
	export default {
		name: 'Category',
	
		components: {
			categoryBlogs
		},
		data() {
			return {
				currentIndex: 0,
				blogs: [],
				sort: []
				
			}
		},
		watch: {
			'$route.path': {
				handler: function(newVal, oldVal) {
					if (newVal != '/') {
					
						this.$parent.reload()
					}
				},
			}
		},
		created() {
			this.currentIndex = this.$route.params.index
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getBlogData('').then(res => {
					this.blogs = res.data.data
				})
				getSortData().then(res => {
					res.data.data.forEach(item => {
						this.sort.push(item.sorts)
					})
				})
			})
		},
		
		methods: {
			goHome() {
				this.$router.push('/')
			}
		},
		computed: {
			cBlogs() {
				let ary = []
				this.blogs.forEach(item => {
					if (item.sort === this.sort[this.currentIndex]) {
						ary.push(item)
					}
				})
				return ary
			}
		}
	}
</script>

<style scoped="scoped">
	.go {
		width: 100%;
		font-size: 12px;
		margin-bottom: 8px;
	}

	.go span {
		margin-right: 6px;
	}

	.go span:first-child:hover,
	.go span:last-child:hover {
		cursor: pointer;
		color: #1E88E5;
	}

	.overlay {
		position: relative;
	}

	.overlay img {
		width: 100%;
		height: 202.5px;
		border-radius: 4px;
	}

	.overlay-center {
		width: 100%;
		height: 40%;
		position: absolute;
		bottom: 0px;
		padding: 24px;
	}

	.overlay-center span:first-child {
		display: inline-block;
		margin-top: 5px;
		font-size: 22px;
		color: #FFFFFF;
	}

	.overlay-center span:last-child {
		display: inline-block;
		margin-top: 8px;
		font-size: 12px;
		color: #FFFFFF;
		float: right;
	}

	.overlay-center span:last-child i {
		font-size: 22px;
		margin-right: 4px;
	}
</style>
