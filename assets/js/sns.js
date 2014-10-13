var pageTitle = document.title;
var pageUrl   = encodeURIComponent(window.location.href);
var siteTitle = $(document.head).find('[name="site-title"]').text();
var pageDesc  = $(document.head).find('[name="description"]').text();
var firstImage = $(document).find('img:first');
var pageImage = (firstImage) ? firstImage.attr('src') : '';

var  SNS ={
	config:{
		url    : '',
		site   : '',//来源
		title  : '',
		desc   : '',
		pic    : '',
		target : '_blank'
	},

	share:function(type){
		var share_url,
			url   = this.config.url || pageUrl,
			title = this.config.title || pageTitle,
			pic   = this.config.pic || pageImage,
			desc  = this.config.desc || pageDesc;
			site  = this.config.site || siteTitle;

		switch(type){
			case 'sina':
				share_url="http://service.weibo.com/share/share.php?url=" + url + "&title=" + title + desc + (pic ? "&pic=" + pic : '');
				break;
			case 'qq':
				share_url="http://share.v.t.qq.com/index.php?c=share&a=index&url=" + url + "&title=" + title + desc + (pic ? "&pic=" + pic : '');
				break;
			case 'qzone':
				share_url="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + title + "&desc=" + desc + "&summary=" + desc + "&site=" + site + (pic? pic : '');
				break;
			case 'renren':
				share_url="http://widget.renren.com/dialog/share?resourceUrl=" + url + "&title="+ title +"&description=" + desc + url + (pic ? "&pic=" + pic : '');
				break;
			case 'douban':
				share_url="http://shuo.douban.com/!service/share?href=" + url + "&name=" + title + "&text=" + desc + ( pic ? "&image=" + pic : '') + '&starid=0&aid=0&style=11&stime=&sig=';
				break;
		}

		this.openNew(share_url);
	},
	getParamsOfShareWindow:function(width,height){
		var top = (document.body.clientHeight-height) / 2;
		var left = (document.body.clientWidth-width) / 2;
		return ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left='+left+',top='+top].join('');
	},
	openNew:function(url){
		window.open(url,this.w, this.getParamsOfShareWindow(680,420));
	},
	init:function(newConfig){
		for(var i in newConfig){
			if(newConfig[i]){
				this.config[i]=newConfig[i];
			}
		}
	}
}