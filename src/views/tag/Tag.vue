<template>
	<div>
		<div class="go" >
			<span @click="goHome">我的主页</span>
			<span>></span>
			<span>标签</span>
		</div>
		<div class="Tag">
			<span>#{{tag}}</span>
			<span class="num">共<i>{{blogs.length}}</i>条</span>
		</div>
		<categoryBlogs :showBlog='blogs'></categoryBlogs>
	</div>
	
</template>

<script>
	import {
		login
	} from 'network/login.js'
	import {getLabelBlogs} from 'network/front.js'
	import categoryBlogs from '../category/categoryBlogs.vue'
	export default {
		name: 'Tag',
		data() {
			return {
				tag: '',
				blogs: []
			}
		},
		components: {
			categoryBlogs
		},
		watch: {
			'$route.path': {
				handler: function(newVal, OldVal) {
					this.$parent.reload()
					
				}
			}
		},
		created() {
			this.tag = this.$route.params.tag
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getLabelBlogs(this.tag).then(res => {
					this.blogs = res.data.data
					console.log(this.blogs)
				})
			})
		},
		mounted() {
			document.documentElement.scrollTop = document.body.scrollTop = 0
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
	.Tag {
		font-size: 24px;
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
