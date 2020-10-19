<template>
	<div>
		<div class="go" >
			<span @click="goHome">我的主页</span>
			<span>></span>
			<span>搜索</span>
		</div>
		<div class="keyWord">
			<span>搜索关键字:{{keyWord}}</span>
			<span class="num">共<i>{{blogs.length}}</i>条</span>
		</div>
		<categoryBlogs :showBlog='blogs'></categoryBlogs>
	</div>
</template>

<script>
	import {
		login
	} from 'network/login.js'
	import {
		getBlogData
	} from 'network/blog.js'
	import categoryBlogs from '../category/categoryBlogs.vue'
	export default {
		name: 'Search',
		data() {
			return {
				keyWord: '',
				blogs: []
			}
		},
		components: {
			categoryBlogs
		},
		watch: {
			'$route.query': {
				handler: function(newVal, OldVal) {
					this.$parent.reload()
				}
			}
		},
		created() {
			this.keyWord = this.$route.query.keyWord
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getBlogData(this.keyWord).then(res => {
					this.blogs = res.data.data
					console.log(this.blogs)
				})
			})
		},
		methods: {
			goHome() {
				this.$router.push('/')
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
	.go span:first-child:hover {
		cursor: pointer;
		color: #1E88E5;
	}
	.keyWord {
		font-size:24px ;
	}
	.num {
		font-size: 16px;
		float: right;
		margin-top: 8px;
	}
	.num i {
		font-style: normal;
		color: orange;
	}
</style>
