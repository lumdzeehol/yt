require(['config'],function(){
    require(['jquery'],function($){
        var $p_list  = $('.p-listMain');
        $.ajax({
            url: '//localhost/yintai/php/goodlist.php',
            type: 'GET',
            dataType: 'json',
            data: {page: '1'},
        })
        .done(function(data) {
            var count = data['count'];
            var listmsg = data['data'];
            for(let i = 0; i < count ; i++){
                $cell = $('<div>').addClass('p-listcell');
                $cell[0].dataset['id'] = listmsg[i]['id'];

                var inner = `
                <div class="p-listImgBig">
                    <a href="//localhost/yintai/html/detail.html?id=${listmsg[i]['id']}">
                        <img src="//localhost/yintai/imgs/goodsImgs/${listmsg[i]['imgs']}" alt="" />
                    </a>
                </div>
                <div class="p-listPrice">
                     <strong class="y-p">￥${listmsg[i]['cur_price']}</strong><del class="m-p">￥${listmsg[i]['price']}</del>
                </div>
                <div class="p-listTxt">
                    <p class=""><a href="//localhost/yintai/html/detail.html?id=${listmsg[i]['id']}" target="_blank">${listmsg[i]['des']}</a></p>
                </div>
                <div class="p-listCustomIcon">
                    <span>
                        <em>海淘直邮</em>
                    </span>
                </div>`;
                $cell.html(inner);
                $p_list.append($cell);
            }
        })
        .fail(function() {
            console.log("error");
        });
        
    });
});