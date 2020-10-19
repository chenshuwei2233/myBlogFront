<template>
	<div class="comment">
		<textarea name="" id="" rows="3" maxlength="200" placeholder="写下你的评论..." class="comment-area" @focus="showBtn"></textarea>
		<div class="btn-group"><button @click="release" class="release">发布评论</button>
			<button @click="hideBtn">取消</button>
		</div>
		<div class="commentName"><input type="text" placeholder="请输入名称..."></div>
		<div class="comTitle">全部评论<span>{{commentList.length}}</span></div>

		<div class="commentDetail" v-for="(item, index) in commentList" :key='index'>
			<div class="commentAvatar">
				<div :style="{backgroundColor: item.avatarColor}">{{item.name[0]}}</div>
			</div>
			<div class="commentContent">
				<div>{{item.name}}</div>
				<p>{{item.content}}</p>
				<div>{{item.createTime | showDate}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		addBlogComment,
		getBlogComment,
		updateCommentNumber
	} from 'network/front.js'
	import {
		EventBus
	} from '../../eventbus/event-bus.js'
	import {
		formatDate
	} from '../../common/utils/utils.js'
	export default {
		name: 'Comment',
		data() {
			return {
				comment: {},
				commentList: [],
				color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'skyblue']
			}
		},
		props: {
			blogTitle: {
				type: String,
				default: ''
			}
		},
		created() {

		},
		mounted() {
			setTimeout(() => {
				this.comment.title = this.blogTitle
				getBlogComment(this.comment.title).then(res => {
					this.commentList = res.data.data
					EventBus.$emit('commentNumber', this.commentList.length)
				})
			}, 1000)
			if (this.dark == 1) {
				let comment = document.querySelector('.comment')
				let comment_area = document.querySelector('.comment-area')
				let comment_name = document.querySelector('.commentName input')

				comment.style.backgroundColor = '#1d1f20'
				comment_area.style.backgroundColor = '#535B61'
				comment_area.style.color = '#fff'
				comment_name.style.backgroundColor = '#535B61'
			}
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			dark(newVal, oldVal) {
				let comment = document.querySelector('.comment')
				let comment_area = document.querySelector('.comment-area')
				let comment_name = document.querySelector('.commentName input')

				if (newVal == 1) {
					comment.style.backgroundColor = '#1d1f20'
					comment_area.style.backgroundColor = '#535B61'
					comment_area.style.color = '#fff'
					comment_name.style.backgroundColor = '#535B61'

					return
				}
				comment.style.backgroundColor = '#fff'
				comment_area.style.backgroundColor = '#fff'
				comment_name.style.backgroundColor = '#fff'
			}
		},
		methods: {
			showBtn() {
				let btnGroup = document.querySelector('.btn-group')
				let commentName = document.querySelector('.commentName')
				let comment = document.querySelector('.comment')
				let title = document.querySelector('.comTitle')
				btnGroup.style.top = '110px'
				commentName.style.top = '0px'
				comment.style.paddingTop = '44px'
				// comment.style.marginTop = '10px'
				title.style.marginTop = '63px'
			},
			hideBtn() {
				let btnGroup = document.querySelector('.btn-group')
				let commentName = document.querySelector('.commentName')
				let comment = document.querySelector('.comment')
				let title = document.querySelector('.comTitle')
				btnGroup.style.top = '40px'
				commentName.style.top = '24px'
				comment.style.paddingTop = '24px'
				comment.style.marginTop = '0'
				title.style.marginTop = '24px'
			},
			release() {
				let name = document.querySelector('.commentName input').value
				let content = document.querySelector('.comment-area').value
				let release = document.querySelector('.release')
				if (name === '') {
					this.$message.error('请输入你的昵称！');
					release.disabled = true;
					release.style.backgroundColor = 'red'
					setTimeout(() => {
						release.disabled = false;
						release.style.backgroundColor = ' #448EF6'
					}, 3000)
					return
				}
				if (content === '') {
					this.$message.error('请输入你的评论！');
					release.disabled = true;
					release.style.backgroundColor = 'red'
					setTimeout(() => {
						release.disabled = false;
						release.style.backgroundColor = ' #448EF6'
					}, 3000)
					return
				}
				this.comment.name = name
				this.comment.content = content
				this.comment.avatarColor = this.color[Math.floor((Math.random() * this.color.length))]
				addBlogComment(this.comment).then(res => {
					this.$message({
						message: '发布成功！',
						type: 'success'
					});
					release.disabled = true;
					release.style.backgroundColor = 'red'
					document.querySelector('.commentName input').value = ''
					document.querySelector('.comment-area').value = ''

					setTimeout(() => {
						release.disabled = false;
						release.style.backgroundColor = '#448EF6'
					}, 3000)
				})
				getBlogComment(this.comment.title).then(res => {
					this.commentList = res.data.data
					updateCommentNumber({
						title: this.comment.title,
						commentNumber: this.commentList.length
					}).then(res => {

					})
					EventBus.$emit('commentNumber', this.commentList.length)
				})

			},
			
		},
		filters: {
			showDate(createTime) {
				return formatDate(new Date(parseInt(createTime)), 'yyyy-MM-dd, hh:mm:ss')
			}
		}
		
	}
</script>

<style scoped="scoped">
	.comment {
		position: relative;
		width: 100%;
		padding: 24px;
		transition: margin-top linear .3s;
	}

	.comTitle span {
		margin-left: 5px;
		font-size: 14px;
	}

	.comment-area {
		position: relative;
		color: #393E46;
		width: 100%;
		padding: 4px 8px;
		border: 1px solid #f2f2f5;
		outline: none;
		resize: none;
		z-index: 100;
		font-size: 14px;
	}

	.comment-area::-webkit-input-placeholder {
		color: #393E46;
	}

	.btn-group {
		position: absolute;
		right: 24px;
		top: 40px;
		transition: top linear .3s;
	}

	.btn-group button {
		background-color: #FFFFFF;
		margin-top: 10px;
		border: 1px solid #F2F2F5;
		outline: none;
		padding: 7px 12px 7px;
		border-radius: 20px;
		font-size: 12px;
	}

	.btn-group button:hover {
		cursor: pointer;
	}

	.btn-group button:first-child {
		margin-right: 10px;
		background-color: #448EF6;
		color: #fff;
		background-color: #448EF6;
	}

	.commentName {
		position: absolute;
		top: 24px;
		width: 100%;
		left: 0;
		padding: 4px 24px;
		transition: top linear .3s;
	}

	.commentName input {
		font-size: 14px;
		padding: 6px 12px;
		border: 1px solid #f2f2f5;
		outline: none;
		width: 100%;
	}

	.commentName input::-webkit-input-placeholder {
		color: #393E46;
	}

	.comTitle {
		width: 100%;
		border-left: 4px solid #409EFF;
		padding-left: 12px;
		margin: 24px 0;
		transition: margin-top linear .3s;
	}

	.commentDetail {
		width: 100%;
		display: flex;
		margin-top: 10px;
	}

	.commentAvatar {
		width: 10%;
		position: relative;
	}

	.commentAvatar div {
		width: 48px;
		height: 48px;
		border-radius: 90px;
		font-size: 24px;
		color: #FFFFFF;
		text-align: center;
		line-height: 48px;
		font-weight: 200;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.commentContent {
		flex: 1;
		padding-bottom: 10px;
		border-bottom: 1px solid #F2F2F5;
	}

	.commentContent div:first-child {
		font-size: 16px;
		margin-bottom: 4px;
		color: #222831;
	}

	.commentContent p {
		font-size: 14px;
		color: #393E46;
		margin: 5px 0;
	}

	.commentContent div:last-child {
		padding-top: 8px;
		font-size: 12px;
		color: #9CA0AD;
	}

	@media screen and (max-width: 500px) {
		.commentAvatar {
			width: 18%;
			position: relative;
		}

		.commentAvatar div {
			width: 36px;
			height: 36px;
			border-radius: 90px;
			font-size: 16px;
			color: #FFFFFF;
			text-align: center;
			line-height: 36px;
			font-weight: 200;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
