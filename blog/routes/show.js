/**
 * Created by crazy_mad on 2017/9/2.
 */
var express = require('express');
var router = express.Router();
var pool = require("../lib/mysqlpool.js");
var moment = require('moment');                 // 用于数据库中的datetime数据类型

router.get('/', function(req, res, next) {
    if (req.query.blogid) {
        var sql = "select * from article where id=" + req.query.blogid;
        pool(sql, function(err, rows, fields) {
            if (err) {
                throw err;
            } else {
                if (0 == rows.length) {
                    res.send("no this blog");
                } else {
                    var json = {
                        title: rows[0].title,
                        md: rows[0].md,
                        pdate: moment(rows[0].publish_date).format('YYYY-MM-DD HH:mm:ss'),
                        mdate: moment(rows[0].modify_date).format('YYYY-MM-DD HH:mm:ss'),
                    };
                    if (req.session.admin == true) {
                        var edit = "<a class='a_bt' id='delete' style='text-decoration: none'>删除</a>\n"
                        edit += "<a class='a_bt' style='text-decoration: none' href='edit?blogid="+req.query.blogid+"'>编辑</a>"
                    } else {
                        edit = "";
                    }
                    res.render('show', {
                        title: json.title,
                        text: json.md,
                        pdate: json.pdate,
                        mdate: json.mdate,
                        blogid: req.query.blogid,
                        edit: edit,
                    });
                }
            }
        });
    } else {
        res.send("404");
    }
})

module.exports = router;
