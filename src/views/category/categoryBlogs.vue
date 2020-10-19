<template>
	<div class="categoryBlogs">
		<blogsItem v-for='(item, index) in showBlog' :key='index' :item='item' 
		v-show='index < blogsNum'></blogsItem>
		<button class="loadMore"  v-show="showBlog.length > blogsNum"
		@click="loadMore">加载更多</button>
		<div class="footer">Copyright © 2020 csw All Rights Reserved </div>
	</div>
</template>

<script>
	import blogsItem from 'components/content/contentBlogs/blogsItem.vue'
	export default {
		name: 'categoryBlogs',
		components: {
			blogsItem
		},
		data() {
			return {
				blogsNum: 10
			}
		},
		props: {
			showBlog: {
				type: Array,
				default() {
					return []
				}
			}
		},
		methods: {
			loadMore() {
				this.blogsNum += 10
			}
		}
	}
</script>

<style>
	.categoryBlogs {
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
