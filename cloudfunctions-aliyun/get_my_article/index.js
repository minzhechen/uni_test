'use strict';
exports.main = async (event, context) => {

	const db = uniCloud.database()
	const $ = db.command.aggregate
	const dbcmd = db.command

	let {
		user_id
	} = event

	let userinfo = await db.collection('user').doc(user_id).get()

	userinfo = userinfo.data[0]

	let list = await db.collection('article').aggregate()
		.addFields({
			is_like: $.in(['$_id', userinfo.article_likes_ids])
		})
		.match({
			id: dbcmd.in(userinfo.article_ids)
		})
		.end()



	//返回数据给客户端
	return {
		code: 200,
		msg: '请求数据成功',
		data: list.data
	}
};
