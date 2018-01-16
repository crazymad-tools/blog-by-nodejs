/**
 * Created by crazy_mad on 2017/9/1.
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database'
});

var query = function(sql, callback) {
    pool.getConnection(function(err, conn) {
        if (err) {
            callback(err, null, null)
        } else {
            conn.query(sql, function(qerr, rows, fields) {
                conn.release();
                callback(qerr, rows, fields);
            })
        }
    })
}

module.exports=query;
