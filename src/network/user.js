import { request } from './request.js'

export function getUser(username) {
	return request({
		url: '/users/list',
		params: {
			username
		}
	})
}