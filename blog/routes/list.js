/**
 * Created by crazy_mad on 2017/9/3.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');                          // 文件读写
//var path = require('path');
var pool = require("../lib/mysqlpool.js");
var moment = require('moment');                 // 用于数据库中的datetime数据类型

router.get('/category', function(req, res, next) {
    pool("select * from category where deleted!=1", function(err, rows, fields) {
        if (err) {
            throw err;
        } else {
            var json = [];
            for (var i = 0; i < rows.length; i++) {
                console.log(rows[i].abstract);
                json.push({
                    name: rows[i].name,
                    class_id: rows[i].class_id,
                    count: rows[i].count,
                });
            }
            res.json(json);
        }
    });
});

router.get('/', function(req, res, next) {
    console.log("category_id:", req.query.category_id);
    console.log("pageindex:", req.query.pageindex);
    var sql = "select * from article";
    if (req.query.category_id >= 0) {
        sql += " where category=" + req.query.category_id;
    }
    if (req.query.pageindex >= 0) {
        var pageindex = parseInt(req.query.pageindex);
        console.log(pageindex);
        sql += " order by id desc limit " + pageindex*5 + ", 5";
    }
    console.log(sql);
    /* 设置浏览器不缓存该请求的数据, 因为这个是数据库数据，会随时变 */
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    /* */
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        var len = rows.length;
        console.log("rows.length:", len);
        var json = new Array();
        for (var i = 0; i < len; i++) {
            json.push({
                blogid: rows[i].id,
                title: rows[i].title,
                pdate: rows[i].publish_date,
                abstract: rows[i].abstract,
                category: rows[i].category,
            });
        }
        res.json(json);
    });
});

function get_images_list() {
    var json = []
    var files = fs.readdirSync('./public/images/blog');
    files.forEach(function(itm, index) {
        json.push({
            filename: itm,
        });
    })
    return json;
}

router.get('/images', function(req, res, next) {
    var json = get_images_list();
    res.json(json);
});

router.post('/images/confirm', function(req, res, next) {
    console.log(req.body);
    var filename = req.body.filename;
    var fileList = get_images_list();
    for (var i = 0; i < fileList.length; i++) {
        if (filename == fileList[i].filename) {
            res.send("yes");
            return;
        }
    }
    res.send("no");
});

router.post('/category_article', function(req, res, next) {
    if (!req.body.class_id) {
        res.send("invalid data");
        return;
    }
    var class_id = req.body.class_id;
    sql = "select * from category_article where class_id=" + class_id;
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        if (0 == rows.length) {
            res.json({res: "no this class"});
            return;
        }
        var json = [];
        for (var i = 0; i < rows.length; i++) {
            json.push({
                article_id: rows[i].article_id,
                title: rows[i].title,
            });
        }
        console.log(json);
        res.json(json);
    });
});

module.exports = router;
