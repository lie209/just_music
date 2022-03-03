var app=new Vue({
	el:"#app",
	data:
	{
		isShow:true,
		musicListShow:true,
		musicFmShow:false,
		searchResultShow:false,
		noSearchShow:true,
		showComment:false,
		showLyric:false,
		commentPaneShow:false,
		lyricPaneShow:false,
		haveSearched:0,
		musicQuery:"周杰伦",
		songsArray:[],
		musicSrc:"",
		music_name:"",
		album_src:"",
		lyric_src:[],
		rankList1:[],
		rankList2:[],
		rankList3:[],
		comments:[]
	},
	mounted:function(){
		this.indexShow();
		//获取一言
		axios.get('https://v1.hitokoto.cn')
		    .then(({ data }) => {
		      const hitokoto = document.getElementById('hitokoto_text')
		      hitokoto.href = 'https://hitokoto.cn/?uuid=' + data.uuid
		      hitokoto.innerText = data.hitokoto
		    })
		    .catch(console.error)
	},
	methods:
	{
		// 首页渲染(歌曲排行页)
		indexShow:function()
		{
			// this.commentPaneShow=false;
			let oAR=document.getElementById("rankLabel");
			oAR.style.backgroundColor="#DEDEDE";
			var that=this;
			//更新三个排行榜的歌曲数组
			// 飙升榜
			axios.get("http://120.77.38.200:3000/playlist/detail?id=19723756").then(function(response)
			{
				console.log(response);
				that.rankList1=response.data.playlist.tracks;
			},function(err){});
			// 新歌榜
			axios.get("http://120.77.38.200:3000/playlist/detail?id=3779629").then(function(response)
			{
				that.rankList2=response.data.playlist.tracks;
			},function(err){});
			// 原创榜
			axios.get("http://120.77.38.200:3000/playlist/detail?id=2884035").then(function(response)
			{
				that.rankList3=response.data.playlist.tracks;
			},function(err){});
		},
		search:function()
		{
			this.haveSearched=1;
			//去除一开始的提示
			this.noSearchShow=false;
			// location.hash='search';
			this.musicListShow=false;
			this.musicFmShow=false;
			this.commentPaneShow=false;
			this.lyricPaneShow=false;
			this.searchResultShow=true;
			this.isShow=true;
			//歌曲排行失去焦点，消除背景底色
			let oAR=document.getElementById("rankLabel");
			oAR.style.backgroundColor="transparent";
			//去除歌曲搜索这一栏的背景颜色
			let oA=document.getElementById("searchLabel");
			oA.style.backgroundColor="#DEDEDE";
			//歌词失去焦点，消除背景颜色
			let oL=document.getElementById("LyricLabel");
			oL.style.backgroundColor="transparent";
			//去除歌曲评论这一栏的背景颜色
			let oC=document.getElementById("commentLabel");
			oC.style.backgroundColor="transparent";
			var that=this;
			axios.get("http://120.77.38.200:3000/search?keywords= " + this.musicQuery).then(function(response)
			{
				//console.log(response);
				that.songsArray=response.data.result.songs;
			},function(err){});
		},
		//选中歌曲排行这一栏
		listMusic:function()
		{
			location.hash='musicList';
			this.musicListShow=true;
			this.musicFmShow=false;
			this.searchResultShow=false;
			this.commentPaneShow=false;
			this.lyricPaneShow=false;
			//歌曲排行获得焦点，增加背景颜色
			let oAR=document.getElementById("rankLabel");
			oAR.style.backgroundColor="#DEDEDE";
			// 去除歌曲搜索这一栏的背景颜色
			let oA=document.getElementById("searchLabel");
			oA.style.backgroundColor="transparent";
			//去除歌曲评论这一栏的背景颜色
			let oC=document.getElementById("commentLabel");
			oC.style.backgroundColor="transparent";
			//歌词失去焦点，消除背景颜色
			let oL=document.getElementById("LyricLabel");
			oL.style.backgroundColor="transparent";
		},
		// fmMusic:function()
		// {
		// 	this.musicListShow=false;
		// 	this.musicFmShow=true;
		// 	this.searchResultShow=false;
		// 	let oA=document.getElementById("searchLabel");
		// 	oA.style.backgroundColor="transparent";
		// },
		
		//选中歌曲搜索这一栏
		searchResultMusic:function()
		{
			if(this.haveSearched==0)
			{
				this.noSearchShow=true;
			}
			this.musicListShow=false;
			this.musicFmShow=false;
			this.searchResultShow=true;
			this.commentPaneShow=false;
			this.lyricPaneShow=false;
			//歌曲排行失去焦点，消除背景底色
			let oAR=document.getElementById("rankLabel");
			oAR.style.backgroundColor="transparent";
			// 给搜索结果这一栏添加背景颜色
			let oA=document.getElementById("searchLabel");
			oA.style.backgroundColor="#DEDEDE";
			//去除歌曲评论这一栏的背景颜色
			let oC=document.getElementById("commentLabel");
			oC.style.backgroundColor="transparent";
			//歌词失去焦点，消除背景颜色
			let oL=document.getElementById("LyricLabel");
			oL.style.backgroundColor="transparent";
		},
		
		//选中歌曲评论这一栏
		musicComment:function()
		{
			this.musicListShow=false;
			this.musicFmShow=false;
			this.searchResultShow=false;
			this.noSearchShow=false;
			this.commentPaneShow=true;
			this.lyricPaneShow=false;
			//歌曲评论获得焦点，设置背景颜色
			let oC=document.getElementById("commentLabel");
			oC.style.backgroundColor="#DEDEDE";
			//歌曲排行失去焦点，消除背景底色
			let oAR=document.getElementById("rankLabel");
			oAR.style.backgroundColor="transparent";
			//歌曲搜索失去焦点，消除背景底色
			let oA=document.getElementById("searchLabel");
			oA.style.backgroundColor="transparent";
			//歌词失去焦点，消除背景颜色
			let oL=document.getElementById("LyricLabel");
			oL.style.backgroundColor="transparent";
		},
		//点击歌词按钮
		lyric:function()
		{
			this.musicListShow=false;
			this.musicFmShow=false;
			this.searchResultShow=false;
			this.noSearchShow=false;
			this.commentPaneShow=false;
			this.lyricPaneShow=true;
			//歌词获得焦点，设置背景颜色
			let oL=document.getElementById("LyricLabel");
			oL.style.backgroundColor="#DEDEDE";
			//歌曲失去获得焦点，消除背景颜色
			let oC=document.getElementById("commentLabel");
			oC.style.backgroundColor="transparent";
			//歌曲排行失去焦点，消除背景底色
			let oAR=document.getElementById("rankLabel");
			oAR.style.backgroundColor="transparent";
			//歌曲搜索失去焦点，消除背景底色
			let oA=document.getElementById("searchLabel");
			oA.style.backgroundColor="transparent";
			
		},
		
		split:function(lrc)
		{//把lrc歌词分割成数组，
		    let split_1 =lrc.split('\n');
			let length = split_1.length;
			for (let i = 0; i < length; i++) 
			{
				let lrcArr = split_1[i];
				split_1[i] = change(lrcArr);
				function change(str)
				{
					let lrc = str.split(']');
					let timer =lrc[0].replace('[','');
					let str_music =lrc[1];
					let time_split =timer.split(':');
					let s = +time_split[1];
					let min = +time_split[0];
					return{
					time:min*60 + s ,
					lrc :str_music//分割好到歌词和时间
					}    
				}
			}
			return split_1
		},
		// prePage:function()
		// {
		// 	history.go(-1);
		// },
		// nextPage:function()
		// {
		// 	history.go(+1);
		// },
		//点击歌曲名时播放对应的音乐
		
		playMusic:function(music_id,album_id,music_name)
		{
			var that=this;
			this.music_name=music_name;
			this.showComment=true;
			this.showLyric=true;
			//获取歌曲src
			axios.get("http://120.77.38.200:3000/song/url?id=" +music_id).then(function(response)
			{
				//console.log(response);
				that.musicSrc=response.data.data[0].url;
			},function(err){});
			//获取歌词src
			//防止影响，提前清空
			this.lyric_src=[];
			axios.get("http://120.77.38.200:3000/lyric?id=" +music_id).then(function(response)
			{
				/* console.log(response.data.lrc.lyric); */
				that.lyric_src=that.split(response.data.lrc.lyric);
				/* console.log(that.lyric_src[0].lrc); */
			},function(err){});
			//获取专辑封面
			axios.get("http://120.77.38.200:3000/album?id="+album_id).then(function(response)
			{
				// console.log(response);
				that.album_src=response.data.album.picUrl;
			},function(err){});
			//获取评论
			axios.get("http://120.77.38.200:3000/comment/music?id="+music_id).then(function(response)
			{
				//console.log(response);
				that.comments=response.data.hotComments;
			},function(err){});
		},
		
		playListMusic:function(music_id,music_name)
		{
			this.showComment=true;
			this.showLyric=true;
			this.music_name=music_name;
			var that=this;
			//获取歌曲src
			axios.get("http://120.77.38.200:3000/song/url?id=" +music_id).then(function(response)
			{
				console.log(response);
				that.musicSrc=response.data.data[0].url;
			},function(err){});
			//获取歌词src
			//防止影响，提前清空
			this.lyric_src=[];
			axios.get("http://120.77.38.200:3000/lyric?id=" +music_id).then(function(response)
			{
				/* console.log(response.data.lrc.lyric); */
				that.lyric_src=that.split(response.data.lrc.lyric);
				/* console.log(that.lyric_src[0].lrc); */
			},function(err){});
			//根据歌曲id获取专辑封面
			axios.get("http://120.77.38.200:3000/song/detail?ids="+music_id).then(function(response)
			{
				that.album_src=response.data.songs[0].al.picUrl;
			},function(err){});
			//获取评论
			axios.get("http://120.77.38.200:3000/comment/music?id="+music_id).then(function(response)
			{
				//console.log(response);
				that.comments=response.data.hotComments;
			},function(err){});
		}
	},
})		
