seajs.config({
	base:window.GLOBAL.STIC || 'http://static.qipeipu.com/Qs',
	// 别名配置
	alias: {
		'$'				:	'jquery/1.7.2/jquery',
	    'jquery'		:	'jquery/1.7.2/jquery',
	    'seajs-text'	: 	'seajs/seajs-text/1.1.1/seajs-text',
		'seajs-combo'	: 	'seajs/seajs-combo/1.0.0/seajs-combo',
	    
	    'core'			:	'gallery/core/0.1.1/core',
	    'bb'			:	'backbone/1.1.2/index',
	    'underscore'	:	'underscore/1.6.0/index',
	    'browser'		:	'browser/1.0.0/index',
	    'dialog'		:	'dialog/1.0.1/index',
	    'fancybox'		:	'fancybox/1.0.0/index',
	    'json2map'		:	'json2map/1.0.0/index',
	    'jsons'			:	'jsons/1.0.0/index',
	    'lazyload'		:	'lazyload/1.0.0/index',
	    'pagination'	:	'pagination/1.0.0/index',
	    'popup'			:	'popup/1.0.0/index',
	    'progress'		:	'progress/1.0.0/index',
	    'string'		:	'string/1.0.0/index',
	    'template'		:	'template/1.0.0/index',
	    'tip'			:	'tip/1.0.0/index',
	    'toolbar'		:	'toolbar/1.0.0/index',
	    'status'		:	'status/1.0.0/index',
	    'verify'		:	'verify/1.0.0/index',
	    'global'		:	'diy/global',
	    'upload'		:	'upload/1.0.0/index',
	    'validform'		:	'validform/1.0.0/index',
	    'modal'			:	'modal/1.0.0/index',
	    'storage'		:	'arale/name-storage/1.0.0/name-storage'//请尽量不要使用
	},
	
	// 映射配置
	map: [
		[ /^(.*\.(?:css|js|tpl))(.*)$/i, '$1?'+window.GLOBAL.TIMESTAMP]
	],

	// 路径配置
	paths: {
	},

	// 变量配置
	vars: {
		'core': 'core'
	},

	// 预加载项

	preload: ['jquery', 'seajs-text','core'],

	// 调试模式
	debug: true,

	// 文件编码
	charset: 'utf-8'
});
