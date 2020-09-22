'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const $ = db.command.aggregate
	//event为客户端上传的参数
	console.log('event : ', event)
	const {
		user_id
	} = event

	let userinfo = await db.collection('user').doc(user_id).get()

	userinfo = userinfo.data[0]

	let list = await db.collection('article')
		.aggregate()
		.addFields({
			is_like: $.in(['$_id', userinfo.article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			is_like: true
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		msg: '请求成功',
		data: list.data
	}
};
