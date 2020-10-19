<template>
	<div class="tableControl">
		<ul class="control">
			<li v-for="(item,index) in sorts" @click="active(index)" :key='index' :class="{active: currentIndex === index}">
				{{item}}
			</li>
		</ul>
	</div>
</template>

<script>
	import { getSortData } from 'network/sort.js'
	import { EventBus } from '../../../eventbus/event-bus.js'
	import { login } from 'network/login.js'
	
 	export default {
		name: 'tableControl',
		data() {
			return {
				sorts: [],
				currentIndex: 0
			}
		},
		created() {
			login({
				username: 'admin',
				password: 'admin'
			}).then(res => {
				localStorage.setItem('authorization', 'Bearer ' + res.data.token)
				getSortData().then(res => {
					this.sorts.push('最新')
					res.data.data.forEach(val => {
						this.sorts.push(val.sorts)
					})
				})
			})
		},
		methods: {
			active(index) {
				this.currentIndex = index
				EventBus.$emit("index", index);
			}
		},
		computed: {
			dark() {
				return this.$store.state.dark
			}
		},
		watch: {
			dark(newVal, oldVal) {
				let tableControl = document.querySelector('.tableControl')
				if(newVal == 1) {
					tableControl.style.backgroundColor = 'black'
					tableControl.style.color = '#b3b3b3'
					return 
				}
				tableControl.style.backgroundColor = '#fff'
				tableControl.style.color = 'black'
			}
		}
	}
</script>

<style scoped="scoped">
	.tableControl {
		width: 100%;
		height: 29px;
		
	}
	.tableControl ul {
		list-style-type: none;
		font-size: 12px;
	}
	.tableControl ul li {
		float: left;
		padding: 5px 12px 4px;
	}
	.tableControl ul li:hover {
		cursor: pointer;
		color: #1E88E5;
		text-decoration: underline;
	}
	.active {
		border-radius: 20px;
		border: 1px solid #448EF6;
		background-color: #448EF6;
		color: #FFFFFF;
	}
</style>
