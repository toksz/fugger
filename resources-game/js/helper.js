function update_select_accelerator(jq_el) {
    jq_el.attr('id');
    let chld = $(jq_el.children()[1]).children();
    chld.off("click")
    chld.on('click',function(){
        let item_id = $(this).attr("data-item-id");
        let img = '<i class="fas fa-long-arrow-alt-up"></i>';
        let val = 0;
        if (item_id > 0) {
            img = '<img src="https://www.resources-game.ch/resapi/resimg/res'+item_id+'.png" width="24px" height="24px">';
            val = item_id;
        }
        $($(jq_el.children()[0]).children()[0]).html(img);
        $($(jq_el.children()[0]).children()[1]).val(val);
    });
}

function update_select_accelerators() {
    $('[data-type="select_accelerator"]').each(function(){
        update_select_accelerator($(this));
    });
}
