var music={
		//因为这个音效听起来是de的声音，所以我取这个函数名，方便记忆音效，找的合适的场景就能想起来。
		success_music:function(){
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '/static/audio/sucess.mp3';
			innerAudioContext.onPlay(() => {
		  	console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
		  	console.log(res.errMsg);
		  	console.log(res.errCode);
			});
		},
		fail_music:function(){
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '/static/audio/fail.mp3';
			innerAudioContext.onPlay(() => {
		  	console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
		  	console.log(res.errMsg);
		  	console.log(res.errCode);
			});
		},
}

module.exports = music;
