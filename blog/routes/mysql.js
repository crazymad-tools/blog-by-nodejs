/**
 * Created by crazy_mad on 2017/9/1.
 */
var express = require('express');
var router = express.Router();
var pool = require("../lib/mysqlpool.js");

var res_err = {
    res: "error"
};
var res_suc = {
    res: "success"
};
var res_uex = {
    res: "user_exsit"
};

router.post('/', function(req, res, next) {
    //console.log(req.body.length);
    var account = req.body[0].account;
    var password = req.body[0].password;
    console.log('response:', account, password);
    var sql = "select * from user where account='" + account + "'";
    console.log(sql);
    pool(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        } else {
            if (rows.length == 0) {
                res.send('no user');
            } else {
                if (password == rows[0].password) {
                    if (req.session.islogin == true) {
                        res.send('is login');
                    } else {
                        if (rows[0].admin == 1) {
                            req.session.admin = true;
                        }
                        req.session.islogin = true;
                        res.send('success');
                    }
                }
            }
        }
        //console.log(rows[0].account, rows[0].password);
    });
});

router.post('/register', function(req, res, next) {
    var account = req.body.account;
    var password = req.body.password;
    var sql = "select * from user where account='" + account + "'";
    console.log(account, password);
    pool(sql, function(err, rows, fields) {
       if (err) {
           throw err;
           res.json(res_err);
       } else if (0 == rows.length){
           sql = "insert into user (account, password, head) values('"+account+"','"+password+"','default.png')";
           console.log(sql);
           //res.json(res_suc);
           //return;
           pool(sql, function(err, rows, fields) {
               if (err) {
                   throw err;
                   res.json(res_err);
               } else {
                   sql = "select user_id from user where account='" + account + "'";
                   pool(sql, function(err, rows, fields) {
                       if (err) {
                           throw err;
                           res.json(res_err);
                       } else if (1 == rows.length) {
                           req.session.islogin = true;
                           var user_id = rows[0].user_id;
                           res.json({
                               res: "success",
                               user_id: user_id,
                           });
                       } else {
                           res.json(res_err);
                       }
                   });
                }
           });
       } else {                                 // 查询到同名账号
           res.json(res_uex);                   // 告知用户账户已存在
       }
    });
});

router.get('/', function(req, res, next) {
    pool("select * from user where user_id=1", function(err, rows, fields) {
        if (err) {
            throw err;
            res.send("error");
        } else {
            console.log(rows.length);
            res.send("success");
        }
    })
})

router.get('/logout', function(req, res, next) {
    if (req.session.islogin == true) {
        delete req.session.islogin;
        if (req.session.admin == true) {
            delete req.session.admin;
        }
        console.log("user logout");
        res.json(res_suc);
    } else {
        res.json({
            res: "fail",
            info: "not login",
        });
    }
})

/*router.get('/', function(req, res, next) {
    var mysql = require('mysql');
    var conn = mysql.createConnection({
        host: '182.254.219.134',
        user: 'crazy_mad',
        password: 'r15906566628',
        database: 'blog'
    });
    conn.connect();
    conn.query('select * from user',function(err, rows, fields) {
        if (err) {
            //throw err;
            console.log("error");
        } else {
            console.log(rows.length);
            console.log(fields);
            console.log('query over!');
        }
    })
    conn.end();
    res.send('<html><body><h1>hello world</h1></body></html>');
});*/

module.exports = router;
