# 评论内容实现（1）

1. 整理评论所需要的字段
2. 手写一个生成 id 的函数，在实际开发场景中，生成id是很复杂的一件事，本章只是简单生成
3. 使用 dbCmd.unshift() 给数组字段最前面去增加一个数据
4. 创建时间使用时间戳，在客户端去处理时间的显示