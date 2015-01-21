/**
 * Created by johnkim on 15-1-20.
 */
var path = require('path');
var fs = require('fs');
var http = require('http');
var url = require('url');

var mine = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

var Expires = {
    fileMatch: /^(gif|png|jpg|js|css)$/ig,
    maxAge: 60 * 60 * 24 * 365
};

var transfer = {
    js:function(content){
        return [
            'define(function(require, exports, module) {\n',
            content,
            '\n});'
        ].join('');
    }
};

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if(pathname=='/'){
        return;
    }
    var realPath = path.join(__dirname, pathname);
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            //文件的最后修改时间
            fs.stat(realPath, function (err, stat) {
                var lastModified = stat.mtime.toUTCString();
                response.setHeader("Last-Modified", lastModified);
                if (request.headers['ifModifiedSince'] && lastModified == request.headers['ifModifiedSince']) {
                    response.writeHead(304, "Not Modified");
                    response.end();
                }
            });

            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });

                    response.end(err);
                } else {
                    var ext = path.extname(realPath);
                    ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mine[ext] || "text/plain";
                    if (ext.match(Expires.fileMatch)) {
                        var expires = new Date();
                        expires.setTime(expires.getTime() + Expires.maxAge * 1000);
                        response.setHeader("Expires", expires.toUTCString());
                        response.setHeader("Cache-Control", "max-age=" + Expires.maxAge);
                    }
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });

                    if(pathname.indexOf('static/page')!=-1){
                        switch (ext){
                            case 'js':
                                file = transfer.js(file);
                                break;
                            default:
                                break;
                        }
                    }

                    response.write(file, "binary");

                    response.end();
                }
            });
        }
    });
});

server.listen('3000',function(){
    console.log('file server started...');
});