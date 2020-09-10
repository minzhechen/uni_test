'use strict';
exports.main = async (event, context) => {
	// 获取数据库的引用
	const db = uniCloud.database()
	const dbCmd = db.command
	const {
		user_id,
		article_id
	} = event

	let user = await db.collection('user').doc(user_id).get()

	// 点赞的文章
	let thumbs_up_article_ids = user.data[0].thumbs_up_article_ids



	let operation = null

	if (thumbs_up_article_ids.includes(article_id)) {
		operation = dbCmd.pull(article_id)
	} else {
		operation = dbCmd.addToSet(article_id)
	}

	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: operation
	})

	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功'
	}
};
