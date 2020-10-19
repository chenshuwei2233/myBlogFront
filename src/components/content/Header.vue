<template>
	<div class="nav">
		<div class="nav-content">
			<img src="@/assets/img/erhuang/11.jpg" alt="" class="logo" @click="toHome">
			<div class="sort">
				<span v-for="(item,index) in sort" @click="toCategory(index)">
					{{item}}
				</span>
			</div>
			<div class="search" @keyup.enter="search">
				<input type="text" placeholder="搜索" @focus="input" @focusout="out">
				<i class="el-icon-search" @mousedown="search" ></i>
			</div>
			<i class="el-icon-moon night" @click="searchNight" @mouseenter="display" @mouseleave="none"></i>
			<div class="box">{{text}}</div>
			<div class="el-icon-s-unfold menu" @click="openMenu"></div>
			<div class="el-icon-search j-search" @click="moblieSearch"></div>
			<div class="mask"></div>
			<div class="slideNav">
				<div class="menu-header">
					<div class="el-icon-s-fold menu2" @click="fold"></div>
					<i class="el-icon-moon night2" @click="fnight"></i>
				</div>
				<div class="menu-center">
					<div v-for="(item, index) in sort " @click="toCategory(index)">{{item}}</div>
				</div>
			</div>
		</div>
		<div class="h-title" ><span>{{blogTitle}}</span></div>
		
			<div class="searchNav">
				<div class="mInput" @keyup.enter="mSearch">
					<input type="text" placeholder="请输入搜索关键词...">
					<i class="el-icon-search" @mousedown="mSearch"></i>
				</div>
			</div>
	</div>
</template>

<script>
	import {
		login
	} from 'network/login.js'
	import {
		getSortData
	} from 'network/sort.js'
	import {
		EventBus
	} from '../../eventbus/event-bus.js'
	export default {
		name: 'Header',
		data() {
			return {
				sort: [],
				night: 0,
				text: '夜间模式',
				searchFlag: 0,
				blogTitle: '',
				isShow: false
			}
		},
		watch: {
			'$route.path': {
				handler: function(newVal, oldVal) {
					
					if(newVal != '/keyWord') {
						let keyWord = document.querySelector('.search input')
						keyWord.value = ''
					}
					// if(newVal == '/detail/' + this.$route.params.id) {
					// 	this.isShow = true
					// }			
				}
			}
		},
		created() {
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getSortData().then(res => {
					res.data.data.forEach(item => {
						this.sort.push(item.sorts)
					})
				})
			})
		},
		mounted() {
			EventBus.$on('blogTitle', msg => {
				this.blogTitle = msg
				console.log(msg)
			})
			setTimeout(() => {
				if(localStorage.getItem('dark') == 1 ){
					this.searchNight()
				}
				localStorage.setItem('dark', 0)
			},200)
		},
		methods: {
			input() {
				let input = document.querySelector('input')
				input.className = 'animation-in'
				input.style.width = '240px'
			},
			out() {
				let input = document.querySelector('input')
				input.className = 'animation-out'
				input.style.width = '140px'
			},
			searchNight() {
				let knight = document.querySelector('.night')
				let body = document.querySelector('body')
				let navSlide = document.querySelector('.slideNav')
				let menuCenter = document.querySelector('.menu-center')
				let h_title = document.querySelector('.h-title')
				if (this.night === 0) {
					knight.classList.remove('el-icon-moon')
					knight.classList.add('el-icon-sunny')
					this.night += 1;
					this.$store.commit('changeDark');
					h_title.style.color = '#b3b3b3'
					body.style.backgroundColor='black'
					
					navSlide.style.backgroundColor = 'black'
					menuCenter.style.backgroundColor = '#1d2021'
					this.text = '日间模式'
				} else {
					knight.classList.remove('el-icon-sunny')
					knight.classList.add('el-icon-moon')
					this.$store.commit('changeDark');
					this.night -= 1;
					if(this.$route.path == '/detail/' + this.$route.params.id) {
						body.style.backgroundColor='rgb(246,246,246)'
					} else {
						body.style.backgroundColor='#fff'
					}
					h_title.style.color = 'black'
					navSlide.style.backgroundColor = '#FDFBFB'
					menuCenter.style.backgroundColor = '#FFF'
					this.text = '夜间模式'
				}
			},
			display() {
				var box = document.querySelector('.box')
				box.style.display = 'block'
			},
			none() {
				var box = document.querySelector('.box')
				box.style.display = 'none'

			},
			openMenu() {
				let mask = document.querySelector('.mask')
				let nav = document.querySelector('.slideNav')
				mask.style.display = 'block';
				nav.style.left = '-1%';
			},
			fold() {
				let mask = document.querySelector('.mask')
				let nav = document.querySelector('.slideNav')
				mask.style.display = 'none';
				nav.style.left = '-100%';
			},
			fnight() {
				let knight = document.querySelector('.night2')
				let body = document.querySelector('body')
				let navSlide = document.querySelector('.slideNav')
				let menuCenter = document.querySelector('.menu-center')
				let h_title = document.querySelector('.h-title')
				if (this.night === 0) {
					knight.classList.remove('el-icon-moon')
					knight.classList.add('el-icon-sunny')
					this.$store.commit('changeDark');
					this.night += 1;
					h_title.style.color = '#b3b3b3'
					body.style.backgroundColor = 'black'
					navSlide.style.backgroundColor = 'black'
					menuCenter.style.backgroundColor = '#1d2021'
					this.text = '日间模式'
				} else {
					knight.classList.remove('el-icon-sunny')
					knight.classList.add('el-icon-moon')
					this.$store.commit('changeDark');
					this.night -= 1;
					if(this.$route.path == '/detail/' + this.$route.params.id) {
						body.style.backgroundColor='rgb(246,246,246)'
					} else {
						body.style.backgroundColor='#fff'
					}
					h_title.style.color = 'black'
					navSlide.style.backgroundColor = '#FDFBFB'
					menuCenter.style.backgroundColor = '#FFF'
					this.text = '夜间模式'
				}
			},
			moblieSearch() {
				// <div class="el-icon-search j-search" @click="moblieSearch"></div>
				let j_search = document.querySelector('.j-search')
				let searchNav = document.querySelector('.searchNav')
				if(this.searchFlag == 0) {
					j_search.classList.remove('el-icon-search')
					j_search.classList.add('el-icon-close')
					searchNav.style.top = '60px'
					this.searchFlag += 1
					return
				}
				j_search.classList.remove('el-icon-close')
				j_search.classList.add('el-icon-search')
				searchNav.style.top = '-100px'
				this.searchFlag -= 1
			},
			toCategory(index) {
				this.$router.push('/category/' + index)
				
			},
			toHome() {
				this.$router.push('/')				
			},
			search() {
				
				let keyWord = document.querySelector('.search input').value
				this.$router.push({
					path: '/search',
					query: {
						keyWord
					}
				})
			},
			mSearch() {
				let keyWord = document.querySelector('.mInput input').value
				this.$router.push({
					path: '/search',
					query: {
						keyWord
					}
				})
				let j_search = document.querySelector('.j-search')
				let searchNav = document.querySelector('.searchNav')
				searchNav.style.top = '-100px'
				j_search.classList.remove('el-icon-close')
				j_search.classList.add('el-icon-search')
			}
		}
	}
</script>

<style scoped="scoped">
	@import url("~@/assets/css/animation.css");
	@import url("~@/assets/css/header.css");
	
</style>
