categorys = [];
category_id = -1;
pageindex = 0;          // 当前分页

function getCategory() {
    $.ajax({
        url : "/list/category",
        success : function(res) {
            var maxcount = 0;
            categorys = res;
            for (var i = 0; i < categorys.length; i++) {
                maxcount += categorys[i].count;
                categorys[i].pageCount = Math.ceil(categorys[i].count/5);
            }
            categorys.push({
                count : maxcount,
                pageCount : Math.ceil(maxcount/5)
            });
            console.log(categorys);
            createCategorys();
            createPageIndex();
            createItems();
        }
    });
}
function login() {
    var account = $("#account").val();
    var password = $("#password").val();
    $.ajax({
        url: "/mysql",
        type: "post",
        data : JSON.stringify([{
            account : account,
            password : password
        }]),
        contentType: "application/json; charset=utf-8",
        success: function(res) {
            if ("success" == res) {
                alert("登录成功");
                closeLoginModal();
            } else if ("is login" == res) {
                alert("当前账户已登录");
                closeLoginModal();
            } else {
                alert("登录失败，账号或密码错误");
            }
        }
    });
}
function showLoginModal() {
    $("#login-modal").show();
    $("#login-modal-back").show();
}
function closeLoginModal() {
    $("#login-modal").hide();
    $("#login-modal-back").hide();
}
function showItems() {
    var items = $(".item-2");
    var j = 1;
    var delayTime = 100;
    items.eq(0).animate({marginLeft: "0px", opacity: 1});
    for (var i = 1; i < items.length; i++) {
        setTimeout(function() {
            //console.log(j);
            items.eq(j++).animate({marginLeft: "0px", opacity: 1});
        }, delayTime+=100);
    }
}
function createItems(index) {
    if (index != undefined) {
        $(".category").eq(category_id+1).removeClass("category-choosed");
        category_id = index;
        $(".category").eq(category_id+1).addClass("category-choosed");
        pageindex = 0;
        createPageIndex();
    }
    $.ajax({
        url: "/list?category_id="+(category_id+1)+"&pageindex="+pageindex,
        success: function(res) {
            console.log(res);
            var itemBorder = $("#item-border");
            itemBorder.html("");
            for (var i = 0; i < res.length; i++) {
                var md = parse(res[i].abstract, true);
                var html = "<h4><a target='_blank' href='/show?blogid=" + res[i].blogid +  "'>" + res[i].title + "</a></h4>";
                html += "<p style='padding-left: 10px; margin: 0px; color: gray; font-size: 10px;'>" + res[i].pdate + "</p>";
                html = "<div class='text item-2'>" + html + md + "</div>";
                itemBorder.append(html);
            }
            showItems();
        }
    })
    $("#right").css("height", $(window).height());
}
function createCategorys() {
    var categoryDiv = $("#category-list");
    var html = "<a class='category category-choosed' onclick='createItems(-1)'>全部博客&nbsp&nbsp&nbsp"
        + categorys[categorys.length-1].count + "篇</a>";
    for (var i = 0; i < categorys.length-1; i++) {
        html += "<a class='category' onclick='createItems(" + i + ")'>"
            + categorys[i].name + "&nbsp&nbsp&nbsp" + categorys[i].count + "篇</a>";
    }
    categoryDiv.append(html);
}
function createPageIndex() {
    if (category_id == -1) {
        var pageCount = categorys[categorys.length-1].pageCount;
    } else {
        var pageCount = categorys[category_id].pageCount;
    }
    var html = "<li><a onclick='changePage(\"left\")'>&laquo;</a></li>";
    for (var i = 0; i < pageCount; i++) {
        if (i == 0)
            html += "<li class='active'><a onclick='changePage(" + i + ")'>" + (i+1) + "</a></li>";
        else
            html += "<li><a onclick='changePage(" + i + ")'>" + (i+1) + "</a></li>";
    }
    html += "<li><a onclick='changePage(\"right\")'>&raquo;</a></li>";
    $("#page-index-top").html(html);
    $("#page-index-bottom").html(html);
}
function changePage(index) {
    var id = category_id == -1 ? categorys.length-1 : category_id;
    if (index == pageindex || index < 0) return;
    else if (index == "left" && pageindex > 0) index = pageindex - 1;
    else if (index == "right" && pageindex < categorys[id].pageCount-1) index = pageindex + 1;
    else if (typeof index == "string") return;
    var pageIndexTopList = $("#page-index-top").find("li");
    var pageIndexBottomList = $("#page-index-bottom").find("li");
    pageIndexTopList.eq(pageindex+1).removeClass("active");
    pageIndexBottomList.eq(pageindex+1).removeClass("active");
    pageindex = index;
    pageIndexTopList.eq(pageindex+1).addClass("active");
    pageIndexBottomList.eq(pageindex+1).addClass("active");
    $('html, body').animate({ scrollTop: 0 }, 'fast');
    createItems();
}
$(function() {
    console.log(category_id);
    getCategory();
})
