'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {

	const {
		user_id, // 用户id
		article_id, // 文章id
		content, // 评论内容
		comment_id = '', // 被回复的评论的id
		reply_id = '', // 被回复的子评论的id
		is_reply // 是否回复的子评论
	} = event

	let user = await db.collection('user').doc(user_id).get()
	// 获取用户对象
	user = user.data[0]

	const article = await db.collection('article').doc(article_id).get()

	// 获取评论信息
	const comments = article.data[0].comments

	let commentObj = {
		comment_id: genID(5), // 评论id
		comment_content: content, // 评论内容
		create_time: new Date().getTime(), // 创建时间
		is_reply,
		author: {
			author_id: user._id, // 作者id
			author_name: user.author_name, // 作者名称
			avatar: user.avatar, // 作者头像
			professional: user.professional // 专业
		},
		replys: []
	}

	if (comment_id === '') { // 评论
		commentObj = dbCmd.unshift(commentObj)
	} else { // 回复
		let author_name

		// 要回复的评论所在索引
		let commentIndex = comments.findIndex(v => v.comment_id === comment_id)

		if (reply_id === '') { // 主回复

			// 要回复的评论的作者
			author_name = comments.find(v => v.comment_id === comment_id)

		} else { // 子回复

			author_name = comments[commentIndex].replys.find(v => v.comment_id === reply_id)

		}

		// 要回复的评论的作者
		author_name = author_name.author.author_name

		// 赋值回复信息
		commentObj.to = author_name

		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}

	}

	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})

	//返回数据给客户端
	return {
		code: 200,
		msg: "数据更新成功"
	}
};


function genID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
