import $http from '../http.js'

export const get_label = (data) => {
	return $http({
		url: 'get_label',
		data
	})
}

export const get_list = (data) => {
	return $http({
		url: 'get_list',
		data
	})
}

export const update_like = (data) => {
	return $http({
		url: 'update_like',
		data
	})
}
export const get_search = (data) => {
	return $http({
		url: 'get_search',
		data
	})
}

export const update_label = (data) => {
	return $http({
		url: 'update_label',
		data
	})
}

export const get_detail = (data) => {
	return $http({
		url: "get_detail",
		data
	})
}

export const update_comment = (data) => {
	return $http({
		url: "update_comment",
		data
	})
}

export const get_comments = (data) => {
	return $http({
		url: "get_comments",
		data
	})
}

// 更新作者收藏
export const update_author = (data) => {
	return $http({
		url: "update_author",
		data
	})
}

// 更新文章点赞
export const update_thumbsup = (data) => {
	return $http({
		url: "update_thumbsup",
		data
	})
}

export const get_follow = (data) => {
	return $http({
		url: "get_follow",
		data
	})
}

export const get_author = (data) => {
	return $http({
		url: "get_author",
		data
	})
}

// 获取用户信息
export const get_user = (data) => {
	return $http({
		url: "get_user",
		data
	})
}

// 获取用户信息
export const get_my_article = (data) => {
	return $http({
		url: "get_my_article",
		data
	})
}