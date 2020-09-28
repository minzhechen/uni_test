'use strict';
exports.main = async (event, context) => {
	
	const db = uniCloud.database()
	
	let {
		user_id
	} = event
	
	if(!user_id){
		return {
			code:4000,
			msg:'获取用户信息失败'
		}
	}
	
	let userinfo = await db.collection('user').doc(user_id).get()
	
	userinfo = userinfo.data[0]
	
	//返回数据给客户端
	return {
		code:200,
		msg:'获取用户信息成功',
		data:	userinfo
	}
};
