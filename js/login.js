require(['config'],function(){
    require(['jquery','Cookie'],function($,Cookie){
        console.dir(Cookie);
        var $tab_item = $('.tab_item');
        var $login_cont = $('.login_cont').children();
        /*绑定事件*/
        $tab_item.each(function(index, ele) {
            $(ele).click(function() {
                if (!$(this).hasClass('active')) {
                    $tab_item.each(function(idx, element) {
                        $(this).removeClass('active');
                    });
                    $(this).addClass('active');
                    $login_cont.each(function(idx, element) {
                        $(element).css('display', 'none');
                    });
                    $login_cont.eq(index).css('display', 'block');
                }
            });
        });

        /*表单验证*/
        var $hz_user = $('#hz_username');
        var $hz_psw = $('#hz_psw');
        var $login_btn = $('#hzLogin');
        console.log($login_btn)
             
        var userRegExp = /^1[34578]\d{9}$/;
        $login_btn.click(function() {
            console.log(43434)
                 
            if (!userRegExp.test($hz_user.val())) {
                alert('请输入正确的手机');
                return false;
            }
            $.ajax({
                url: '../php/login.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: $hz_user.val(),
                    password: $hz_psw.val()
                },
            })
            .done(function(response) {
                if (response['status']==='failed') {
                    alert(response['errorMsg']);
                    return false;
                }else if (response['status']==='succeed') {
                    alert('登录成功');
                    Cookie.set('username',$hz_user.val(),'\/');
                    Cookie.set('userid',response['user_id'],'\/');
                    window.location.href="../index.html";
                }        
            })
            .fail(function() {
                console.log("error");
            });
            
        });

    })
})