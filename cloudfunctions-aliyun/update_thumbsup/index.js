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

	let article = await db.collection('article').doc(article_id).get()



	// 点赞的文章
	let thumbs_up_article_ids = user.data[0].thumbs_up_article_ids



	let operation = null
	let thumbsCount = article.data[0].thumbs_up_count

	if (thumbs_up_article_ids.includes(article_id)) {
		operation = dbCmd.pull(article_id)
		thumbsCount--
	} else {
		operation = dbCmd.addToSet(article_id)
		thumbsCount++
	}

	await db.collection('user').doc(user_id).update({
		thumbs_up_article_ids: operation
	})

	await db.collection('article').doc(article_id).update({
		thumbs_up_count: thumbsCount
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功'
	}
};
