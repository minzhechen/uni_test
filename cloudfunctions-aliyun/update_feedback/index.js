'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数

	const db = uniCloud.database()
	const $ = db.command.aggregate

	let {
		user_id,
		content = '',
		feedbackImages = []
	} = event

	await db.collection('feedback').add({
		user_id,
		content,
		feedbackImages
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
};
