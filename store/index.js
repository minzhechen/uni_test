// vuex 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 数据源
	state: {
		// 查询历史数据
		historyLists: uni.getStorageSync("__history") || [],
		// 登录用户信息
		userinfo: uni.getStorageSync("__userinfo") || {},
	},
	mutations: {
		// 设置历史记录
		SET_HISTORY_LISTS(state, history) {
			state.historyLists = history
		},
		// 清空历史记录
		CLEAR_HISTORY(state) {
			state.historyLists = []
		},
		// 设置登录用户信息
		SET_HISTORY_INFO(state, userinfo) {
			state.userinfo = userinfo
		}
	},
	actions: {
		// 设置历史记录
		set_history({
			commit,
			state
		}, history) {
			let list = state.historyLists
			list.unshift(history)
			uni.setStorageSync('__history', list)
			commit('SET_HISTORY_LISTS', list)
		},
		// 清空历史记录
		clearHistory({
			commit
		}) {
			uni.removeStorageSync('__history')
			commit('CLEAR_HISTORY')
		},
		// 设置登录用户信息
		set_userinfo({
			commit
		}, userinfo) {
			commit('SET_HISTORY_INFO', userinfo)
			uni.setStorageSync('__userinfo', userinfo)
		}

	}
})

export default store
