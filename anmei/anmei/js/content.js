//内容页相关js
$("#h_Score").val(0);
$("#select_score .Icon").addClass("cur");
$("#fen_tip").hide();
$("#wrong_tip").hide();
change_fen_tip(0);

//分享的显示与隐藏
function toggle_share(){
	$("#c_Ishare").toggle();
}

//显示对应的框
function c_show_kuang(name){	
	$("#zhezhao").show();
	$("#c_kuang_"+name).show();
}
//隐藏对应的框
function c_hide_kuang(name){
	$("#zhezhao").hide();
	$("#c_kuang_"+name).hide();
	if(name=="zixun_mobile"){
		//初始化电话咨询里的样式
		$("#c_kuang_zixun_mobile .GenPopText dl").show();
		$("#c_kuang_zixun_mobile div.ConSuc").hide();
		$("#c_kuang_zixun_mobile p").show();
	}
}

//咨询框样式变更
