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

function upload_new(res, title, md, abstract, pdate, mdate, category, func) {
    //console.log("upload_new");
    var sql = "insert into article (title, md, publish_date, modify_date, class, abstract) values";
    var data = "'" + title + "','" + md + "','" + pdate + "','" + mdate + "', " + category + ", '" + abstract + "'";
    sql = sql + "(" + data + ")";           // 生成数据库操作命令
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        pool("update category set count=(select count(*) from article where class=class_id)", function(err, rows, fields) {
            console.log("更新count");
        });
        //console.log("mysql:", rows);
        func(rows, fields);
    });
}
function upload_old(res, blogid, title, md, abstract, mdate, category, func) {
    console.log("upload_old");
    var sql = "update article set title='" +title + "',md='" + md + "',modify_date='" + mdate
        + "', class=" + category + ", abstract='" + abstract + "' where id=" + blogid;
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        pool("update category set count=(select count(*) from article where class=class_id)", function(err, rows, fields) {
            console.log("更新count");
        });
        func(rows, fields);
    });
}
function add_category(req, res, category_name) {
    console.log("add new category");
    var sql = "insert into category (name, count) values(\"" + category_name + "\", 0)";
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        console.log(rows);
        var category = rows.insertId;
        parse_body(req, res, category);
    });
}
function parse_body(req, res, category) {
    console.log(req.body);
    var category = category || req.body.category;
    var title = req.body.title;
    var text = req.body.text;
    var blogid = req.body.blogid;
    var abstract = req.body.abstract;
    var date = new Date();
    date = moment(date).format("YYYY-MM-DD HH:mm:ss");
    console.log(category, title, text, blogid, abstract, date);
    if (0 == blogid) {
        upload_new(res, title, text, abstract, date, date, category, function() {
            //res.send(res_suc);
            res.send("success");
        });
    } else {
        upload_old(res, blogid, title, text, abstract, date, category, function() {
            //res.send(res_suc);
            res.send("success");
        });
    }
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
            console.log(req.body);
            var newflag = req.body.newflag;
            // 判断是否有创建了新的栏目名称
            if (newflag == "true") {
                add_category(req, res, req.body.category);
            } else {
                console.log("没有创建新栏目!");
                parse_body(req, res, req.body.category);
            }
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
            pool("update category set count=(select count(*) from article where class=class_id)", function(err, rows, fields) {
                console.log("更新count");
            });
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
