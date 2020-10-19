<template>
	<div class="contentBlogs">
		<blogsItem v-for='(item, index) in showBlog' :key=index :item='item' 
		v-if='refresh'></blogsItem>
		<button class="loadMore" v-if="showBlog.length == 
		this.blogData[this.currentType].page  * 10" 
		@click="loadMore">加载更多</button>
		<div class="footer">Copyright © 2020 csw All Rights Reserved </div>
	</div>
</template>

<script>
	import blogsItem from './blogsItem.vue'
	import { login } from 'network/login.js'
	import {
		getBlogsData
	} from 'network/front.js'
	import {
		EventBus
	} from '../../../eventbus/event-bus.js'

	export default {
		name: 'contentBlogs',
		components: {
			blogsItem
		},
		data() {
			return {
				blogData: {
					'all': {
						page: 0,
						list: []
					},
					'学习': {
						page: 0,
						list: []
					},
					'娱乐': {
						page: 0,
						list: []
					},
					'生活': {
						page: 0,
						list: []
					},
					'发现': {
						page: 0,
						list: []
					}
				},
				currentIndex: 0,
				currentType: 'all',
				refresh: true
			}
		},
		watch: {
			currentIndex: {
				handler(newValue, oldValue) {
						this.refresh = false
						this.$nextTick(() => {
							this.refresh = true
						})
					switch (newValue) {
						case 0:
							this.currentType = 'all';
							console.log(this.showBlog)
							break;
						case 1:
							this.currentType = '学习';
							break;
						case 2:
							this.currentType = '娱乐';
							break;
						case 3:
							this.currentType = '生活';
							break;
						case 4:
							this.currentType = '发现';
							break;
					}
				}
			}
		},
		created() {
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				this.getContentBlogs('')
				this.getContentBlogs('学习')
				this.getContentBlogs('娱乐')
				this.getContentBlogs('生活')
				this.getContentBlogs('发现')
			})
			
		},
		mounted() {
			EventBus.$on('index', (msg) => {
				this.currentIndex = msg
			})
		},
		computed: {
			showBlog() {
				return this.blogData[this.currentType].list
			}
		},
		methods: {
			getContentBlogs(sort) {
				let page = 0
				if(sort == 'all') {
					page = this.blogData[sort].page
					sort = ''
				}
				if (sort) {
					page = this.blogData[sort].page
				}
				getBlogsData(sort, page).then(res => {
					if (sort) {
						this.blogData[sort].list.push(...res.data.data)
						this.blogData[sort].page += 1
						return
					}
					this.blogData['all'].list.push(...res.data.data)
					this.blogData['all'].page += 1

				})
			},
			loadMore() {
				
				this.getContentBlogs(this.currentType)
			}
		}
	}
</script>

<style>
	.contentBlogs {
		width: 100%;
		margin-top: 20px;
	}
	.loadMore {
		border: 0;
		width: 100%;
		padding: 6px 16px;
		background-color: #F2F2F5;
		border-radius: 20px;
		margin-top: 40px;
		color: #393E46;
		text-align: center;
		outline: none;
	}
	.loadMore:hover {
		cursor: pointer;
	}
	.footer {
		width: 100%;
		margin-top: 58px;
		text-align: center;
		color: #888888;
		font-size: 12px;
	}
</style>
