module.exports = {
	filterMessage: function(message) {
		const badWords = [
			'fuck',
			'shit',
			'bitch',
			'dick',
			'cum',
			'semen',
			'cunt',
			'whore',
			'ass',
			'moan',
			'fap',
			'masturbate',
		]
		for(let bad of badWords) {
			message = message.replace(new RegExp(`${bad}`, 'gi'), 'BONK')
		}
		return message
	},
}