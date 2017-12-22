/**
 * Created by crazy_mad on 2017/9/3.
 */
var express = require('express');
var multipart = require('multiparty');
var util = require('util');
var fs = require('fs');
var router = express.Router();

function save_image(req, res, path, func) {
    var form = new multipart.Form({
        uploadDir: path
    });
    form.parse(req, function(err, fields, files) {
        console.log(files);
        if (err) {
            console.log("parse error:", err);
        } else {
            var inputfile = files.file[0];
            var uploadedpath = inputfile.path;
            var destPath = path + inputfile.originalFilename;
            fs.rename(uploadedpath, destPath, function (err) {
                if (err) {
                    console.log('rename error:', err);
                } else {
                    console.log('rename ok');
                }
            });
            func(res);
        }
    });
}

router.post('/', function(req, res, next) {
    if (true != req.session.islogin) {
        res.send('not login');
        return;
    }
    save_image(req, res, "./public/images/blog/", function(res) {
        res.send("success");
    })
});

router.post('/head', function(req, res, next) {
    if (true != req.session.islogin) {
        res.send('not login');
        return;
    }
    save_image(req, res, "./public/images/head/", function(res) {
        res.send("success");
    })
})

module.exports = router;
