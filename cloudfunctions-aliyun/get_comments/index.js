'use strict';

// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
	} = event

	let res = await db.collection('article').aggregate().match({
			_id: article_id
		})
		.project({
			_id: 0,
			comments: 1
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: res
	}
};
