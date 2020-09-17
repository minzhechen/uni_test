// 时间格式化
export const parseTime = (time) => {
	if (typeof time === 'string') {
		time = parseInt(time)
	}
	time = new Date(time)
	const timeObj = {
		y: time.getFullYear(),
		m: time.getMonth() + 1,
		d: time.getDate(),
		h: time.getHours(),
		i: time.getMinutes(),
		s: time.getSeconds(),
	}

	const format = '{y}-{m}-{d} {h}:{i}:{s}'

	const setTime = format.replace(/{(y|m|d|h|i|s)+}/g, (result, key) => {
		let val = timeObj[key]
		if (val < 10) {
			val = '0' + val
		}
		return val
	})
	return setTime
}
