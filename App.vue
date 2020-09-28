<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.$api
			.get_user({
				user_id: '5eb228f571aa80004d79c6fb'
			})
			.then(res => {
				this.$store.dispatch('set_userinfo', res.data);
			});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import 'components/gaoyia-parse/parse.css';
</style>
