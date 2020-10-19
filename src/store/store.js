import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		dark: 0
	},
	mutations: {
		changeDark(state) {
			if(state.dark === 0) {
				state.dark = 1
				return 
			}
			state.dark = 0
		}
	},
	
})

export default store