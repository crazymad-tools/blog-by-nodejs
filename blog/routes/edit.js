/**
 * Created by crazy_mad on 2017/9/2.
 */
var express = require('express');
var router = express.Router();
var pool = require("../lib/mysqlpool.js");
var moment = require('moment');                 // 用于数据库中的datetime数据类型

var res_err = {
    res: "error"
};
var res_suc = {
    res: "success"
};
var res_uex = {
    res: "user_exsit"
};

function upload_new(res, title, md, pdate, mdate, func) {
    //console.log("upload_new");
    var sql = "insert into article (title, md, publish_date, modify_date, class) values";
    var data = "'" + title + "','" + md + "','" + pdate + "','" + mdate + "', 2";
    sql = sql + "(" + data + ")";           // 生成数据库操作命令
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        //console.log("mysql:", rows);
        func(rows, fields);
    });
}
function upload_old(res, blogid, title, md, mdate, func) {
    console.log("upload_old");
    var sql = "update article set title='" +title + "',md='" + md + "',modify_date='" + mdate
        + "' where id=" + blogid;
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        func(rows, fields);
    });
}

router.get('/', function(req, res, next) {
    if (req.session.admin != true) {
        res.send("you are not admin!");
        return;
    }
    if (req.query.blogid) {
        console.log(req.query.blogid);
        var sql = "select title, md from article where id=" + req.query.blogid;
        pool(sql, function(err, rows, fields) {
            if (err) {
                throw err;
                //return;
            }
            if (rows) {
                //console.log(rows);
                var title = rows[0].title;
                var md = rows[0].md;
                //console.log(title, md);
                res.render('edit', {
                    id: req.query.blogid,
                    title: title,
                    md: md,
                });
            } else {
                res.send("no this blog");
            }
        })
    } else {
        res.render('edit', {
            id: 0,
            title: "编辑标题",
            md: "",
        })
    }
    //res.render('edit');
});
router.post('/', function(req, res, next) {
    if (true == req.session.admin) {
        if (!req.body.title || !req.body.text) {
            res.send("data illegal");           // 数据违规
        } else {
            var title = req.body.title;
            var text = req.body.text;
            var blogid = req.body.blogid;
            console.log(title);
            console.log(text);
            console.log(blogid);
            if ("" == title || "" == text) {
                res.send("data illegal");
            } else {
                var flag = false;
                var tmp = new Date();
                tmp = moment(tmp).format("YYYY-MM-DD HH:mm:ss");
                if (0 != blogid) {              // blogid!=0说明该文章是已有文
                    upload_old(res, blogid, title, text, tmp, function(rows, fields) {
                        console.log(rows.length);
                        res.send("success");
                    });
                } else {                        // blogid==0说明该文章是新增文章
                    upload_new(res, title, text, tmp, tmp, function(rows, fields) {
                        console.log(rows.length);
                        res.send("success");
                    });
                }
            }
            //res.send("success");
        }
    } else {
        res.send("you are not admin");
    }
});

router.post('/delete', function(req, res, next) {
    if (true != req.session.admin) {
        res.send("you are not admin");
        return;
    }
    var blogid = req.body.blogid;
    console.log("delete blogid:", blogid);
    var sql = "delete from article where id=" + blogid;
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        } else {
            //console.log(fields);
            res.send("success");
        }
    })
});

router.post('/category', function(req, res, next) {
    if (req.session.admin != true) {
        res.json({
            res: "not login"
        });
        return;
    }
    var newname = req.body.name;
    var class_id = req.body.class_id;
    sql = "update category set name='" + newname + "' where class_id=" + class_id;
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        } else {
            res.json(res_suc);
        }
    });
});

router.post('/category/delete', function(req, res, next) {
    if (req.session.admin != true) {
        res.json({
            res: "not login"
        });
        return;
    }
    var class_id = req.body.class_id;
    sql = "update category set deleted=1 where class_id=" + class_id;
    pool(sql, function (err, rows, fields) {
        if (err) {
            throw err;
        } else {
            res.json(res_suc);
        }
    });
});

module.exports = router;
