'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command

exports.main = async (event, context) => {
	
	const {
		user_id, // 用户id
		article_id, // 文章id
		content // 评论内容
	} = event
	
	let  user = await db.collection('user').doc(user_id).get()
	// 获取用户对象
	user = user.data[0]
	
	let commentObj = {
		comment_id:genID(5) ,// 评论id
		comment_content:content, // 评论内容
		create_time: new Date().getTime(), // 创建时间
		author:{
			author_id:user._id , // 作者id
			author_name:user.author_name , // 作者名称
			avator:user.avator , // 作者头像
			professional:user.professional // 专业
		},
		replys:[]
	}
	
	await db.collection('article').doc(article_id).update({
		comments:dbCmd.unshift(commentObj)
	})
	
  //返回数据给客户端
  return {
		code:200,
		msg:"数据更新成功"
	}
};


function genID(length){
	return Number(Math.random().toString().substr(3,length) +Date.now()).toString(36)
}