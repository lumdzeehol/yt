require(['config'],function(){
    require(['jquery'],function($){
        var $phone = $('#phone');
        var $vericode = $('#veriCode');
        var $getcode = $('#getCode');
        $getcode.forbid = false;
        var $psw = $('#psw');
        var $confirm = $('#confirmPsw');
        
        var $regBtn = $('#regBtn');

        var phoneRegExp = /^1[34578]\d{9}$/;
        var vericodeRegExp = /^[0-9]{4}$/;
        var pswRegExp = /^(?![0-9]+$)[a-zA-Z0-9]{6,12}$/;
        $getcode.click(function(e){
            if ($getcode.forbid === false) {
                if (!phoneRegExp.test($phone.val())) {
                    alert('请输入合法的手机号码');
                    return false;
                }
                $getcode.forbid = true;
                /*验证码倒计时*/
                $getcode.forbidTime = 60;
                $getcode.timer = setInterval(function(){
                    this.forbidTime --;
                    this.html(`${this.forbidTime}s`);
                    if (this.forbidTime <= 0) {
                        clearInterval(this.timer);
                        this.html('获取验证码');
                        this.forbid = false;
                    }
                     
                }.bind($getcode),1000);
                console.log('click');
            }     
        });
        $regBtn.click(function(){
            if (!phoneRegExp.test($phone.val())) {
                alert('请输入合法的手机号码');
                return false;
            }
            if (!vericodeRegExp.test($vericode.val())) {
                alert('验证码错误');
                return false;   
            }
            if (!pswRegExp.test($psw.val())) {
                alert('密码格式错误');
                return false;
            }
            if ($confirm.val() !== $psw.val()) {
                alert('两次密码输入不相同');
                return false;
            }

            $.ajax({
                url: '../php/isUserExist.php',
                type: 'GET',
                dataType: 'json',
                data: {phone: $phone.val()},
            })
            .done(function(data) {
                if (data['status'] === 'succeed') {
                    $.ajax({
                        url: '../php/register.php',
                        type: 'POST',
                        dataType: 'html',
                        data: { phone: $phone.val(),psw: $psw.val()},
                    }) 
                    .done(function(data) {
                        alert('注册成功');
                        window.location.href = "login.html";
                    })
                    .fail(function() {
                    });
                    
                }else{
                    alert(data['errorMsg']);
                }
            })
            .fail(function() {
                console.log("网络错误");
            });
            
        });
    });
});