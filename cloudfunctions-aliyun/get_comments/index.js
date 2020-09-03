'use strict';

// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
	} = event

	let res = await db.collection('article').aggregate()
	// 匹配符合条件的数据
		.match({
			_id: article_id
		})
		// 以 comments 数组内每项为单位进行拆分
		.unwind('$comments')
		.project({
			_id: 0,
			comments: 1
		})
		// 用 内部属性 comments 对象代替自身
		.replaceRoot({
			newRoot:'$comments'
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: res.data
	}
};
