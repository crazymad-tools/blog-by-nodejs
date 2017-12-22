var express = require('express');
var router = express.Router();
var pool = require("../lib/mysqlpool.js");
var moment = require('moment');                 // 用于数据库中的datetime数据类型

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query.logout && req.session.islogin) {
        console.log(req.query.logout);
        delete req.session.islogin;
        console.log(req.session.islogin);
    }
    var edit = "";
    if (true == req.session.islogin) {
        edit = "写博客";
    }
    /*res.render('index', {
        islogin: (req.session.islogin==true?true:false),
        title: 'CRAZY_MAD',
        test: '<h1>hello world</h1>',
        edit: edit,
    });*/
    res.render('tmp', {
        title: "CRAZY_MAD"
    });
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/login', function(req, res, next) {
    var pre = "index";
    if (req.query.pre) {
        pre = req.query.pre;
    }
    res.render('login', {
        pre: pre,
    });
})

router.get('/category', function(req, res, next) {
    var islogin = req.session.islogin;
    pool('select * from category where deleted!=1', function(err, rows, fields) {
        var category = rows;
        console.log(rows);
        var html = "";
        for (var i = 0; i < category.length; i++) {
            html += "<div class='row' onmouseover='change_color(this, "+i+")'>";
            html += "\n<table style='width: 100%;'><tr class='tr_row'>\n<td style='width: 50%;' class='title'>";
            html += "<a class='title_a' onclick='show_detail("+i+")'>" + category[i].name + "</a></td>\n<td style='width: 30%;'>"
            html += category[i].count + "</td>\n<td style='width: 20%;'>";
            html += "<a class='edit a_bt"+(islogin==true?"":" a_disable")+"' onclick='click_edit("+i+")'>编辑</a>&nbsp;|&nbsp;"
            html += "<a class='delete a_bt"+(islogin==true?"":" a_disable")+"' onclick='click_delete("+i+")'>删除</a>";
            html += "</td></tr></table>\n</div>\n";
        }
        res.render('category', {
            islogin: (req.session.islogin == true ? true : false),
            category: JSON.stringify(rows),
            list: html,
        });
    });
});

router.get("/tmp", function(req, res, next) {
    res.render('tmp', {
        title: "CRAZY_MAD"
    });
})

module.exports = router;
