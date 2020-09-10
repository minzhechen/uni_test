'use strict';
exports.main = async (event, context) => {
	// 获取数据库的引用
	const db = uniCloud.database()
	const dbCmd = db.command
	const {
		user_id,
		author_id
	} = event

	let user = await db.collection('user').doc(user_id).get()

	// 关注的作者
	let author_likes_ids = user.data[0].author_likes_ids

	let operation = null

	if (author_likes_ids.includes(author_id)) {
		operation = dbCmd.pull(author_id)
	} else {
		operation = dbCmd.addToSet(author_id)
	}

	await db.collection('user').doc(user_id).update({
		author_likes_ids: operation
	})

	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功'
	}
};
