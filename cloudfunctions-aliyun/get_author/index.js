'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const $ = db.command.aggregate

	let {
		user_id
	} = event

	let userinfo = await db.collection('user').doc(user_id).get()

	userinfo = userinfo.data[0]

	let author_likes_ids = userinfo.author_likes_ids

	let users = await db.collection('user').aggregate()
		.addFields({
			is_like: $.in(['$id', author_likes_ids])
		}).match({
			is_like: true
		}).end()


	//返回数据给客户端
	return {
		code: 200,
		msg: '请求成功',
		data: users.data
	}
};
