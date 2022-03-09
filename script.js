// var base_doc="C:\Users\Hsinyu\Desktop\poke\base"
// var pro_doc="C:\Users\Hsinyu\Desktop\poke\protein"
// var top_doc="C:\Users\Hsinyu\Desktop\poke\topping"

var base_list=[{"name": "白米","price": 20},{"name": "胚芽米","price": 30},{"name": "紫米","price": 30},{"name": "生菜","price": 30},{"name": "五穀米","price": 30}]

var pro_list=[{"name": "鮭魚","price": 70},
 {"name": "雞胸肉","price": 50},
 {"name": "骰子牛","price": 60},
 {"name": "孜然豬","price": 40}]

var top1_list=[{"name": "玉米","price": 5},
 {"name": "花椰菜","price": 10},
 {"name": "小黃瓜","price": 10},
 {"name": "木耳","price": 15}]

var top2_list=[{"name": "海帶芽","price": 5},
 {"name": "地瓜","price": 10},
 {"name": "櫛瓜","price": 10},
 {"name": "杏包菇","price": 15},
 {"name": "毛豆仁","price": 15}]

// $.ajax({
//   url:base_doc,
//   success:function(res){base_list=JSON.parse(res);
// console.log(base_list)}})

var your_poke=[];
var your_topping=[];

var base_html="<li id={{b_id}} listnum={{num}} class='name'>{{b_name}}<div class='price'>{{b_price}}</div></li>"

var poke_html="<li id={{or_id}} class='name'>{{or_name}}<div class='price'>{{or_price}}</div><div id={{del_id}} del-id={{del_num}} class='del'>☒</div></li>"

var total_html="<span>{{cash}}</span>"

function baselist(L){
  for(var i=0;i<L.length;i++){
    var cc_html=base_html.replace("{{b_id}}","base_cur_"+i)
                         .replace("{{b_name}}",L[i].name)
                         .replace("{{b_price}}",L[i].price)
                         .replace("{{num}}",i);
     $(base_cur).append(cc_html);
    $("#base_cur_"+i).click(function(){add(your_poke,L,(parseInt($(this).attr("listnum"))))});
    }};

function prolist(L){
  for(var i=0;i<L.length;i++){
    var cc_html=base_html.replace("{{b_id}}","pro_cur_"+i)
                         .replace("{{b_name}}",L[i].name)
                         .replace("{{b_price}}",L[i].price)
                         .replace("{{num}}",i);
     $(pro_cur).append(cc_html); 
    $("#pro_cur_"+i).click(function(){add(your_poke,L,(parseInt($(this).attr("listnum"))))});
    }};

function toplist1(L){
  for(var i=0;i<L.length;i++){
    var cc_html=base_html.replace("{{b_id}}","top1_cur_"+i)
                         .replace("{{b_name}}",L[i].name)
                         .replace("{{b_price}}",L[i].price)
                         .replace("{{num}}",i);
     $(top1_cur).append(cc_html);   
     $("#top1_cur_"+i).click(function(){add(your_topping,L,(parseInt($(this).attr("listnum"))))});
     
    }};

function toplist2(L){
  for(var i=0;i<L.length;i++){
    var cc_html=base_html.replace("{{b_id}}","top2_cur_"+i)
                         .replace("{{b_name}}",L[i].name)
                         .replace("{{b_price}}",L[i].price)
                         .replace("{{num}}",i);
     $(top2_cur).append(cc_html);    
     $("#top2_cur_"+i).click(function(){add(your_topping,L,(parseInt($(this).attr("listnum"))))});
    }};

baselist(base_list);
prolist(pro_list);
toplist1(top1_list);
toplist2(top2_list);
showlist(your_poke,order1,"or1");
showlist(your_topping,order2,"or2");

//上面定義好LIST,下面做作新增.移除.運算//

function cash(A){
  var total_price=0;
  for(var i=0;i<A.length;i++){
  total_price+=parseInt(A[i].price);
  }
  return total_price;
};

function showlist(X,O,R){
  $(O).html("");
  for(var i=0;i<X.length;i++){
      var cc_poke=poke_html.replace("{{or_id}}",R+"_"+i)
                           .replace("{{or_name}}",X[i].name)
                           .replace("{{or_price}}",X[i].price)
                           .replace("{{del_id}}",R+"del_"+i)
                           .replace("{{del_num}}",i);
     $(O).append(cc_poke);
  $("#or1del_"+i).click(function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
  $("#or2del_"+i).click(function(){remove_item(your_topping,parseInt($(this).attr("del-id")));}); 
  }
     var tot= cash(your_poke)+cash(your_topping);
     var cur_total_html=total_html.replace("{{cash}}",tot);
     $(".cash").html(cur_total_html);
    };

function add(A,I,N){
  var nn = A.length;
  A.push({name:I[N].name,price:I[N].price});
  showlist(your_poke,order1,"or1");
  showlist(your_topping,order2,"or2");
  };

function remove_item(A,dd){A.splice(dd,1);
                       showlist(your_poke,order1,"or1");
                       showlist(your_topping,order2,"or2");};

//結帳//
$(".pay").click(function(){your_poke.splice(0,your_poke.length);
                           your_topping.splice(0,your_topping.length);
    $("#order1").html(""); 
    $("#order2").html("");
    $(".cash").html("0");
    alert("取餐號碼：018");
});

// 無法綁定新增按鈕,已解決 //
// $("#base_cur_0").click(function(){add(your_poke,base_list,0)});
// $("#base_cur_1").click(function(){add(your_poke,base_list,1)});
// $("#base_cur_2").click(function(){add(your_poke,base_list,2)});
// $("#base_cur_3").click(function(){add(your_poke,base_list,3)});
// $("#base_cur_4").click(function(){add(your_poke,base_list,4)});

// $("#pro_cur_0").click(function(){add(your_poke,pro_list,0)});
// $("#pro_cur_1").click(function(){add(your_poke,pro_list,1)});
// $("#pro_cur_2").click(function(){add(your_poke,pro_list,2)});
// $("#pro_cur_3").click(function(){add(your_poke,pro_list,3)});

// $("#top1_cur_0").click(function(){add(your_topping,top1_list,0)});
// $("#top1_cur_1").click(function(){add(your_topping,top1_list,1)});
// $("#top1_cur_2").click(function(){add(your_topping,top1_list,2)});
// $("#top1_cur_3").click(function(){add(your_topping,top1_list,3)});

// $("#top2_cur_0").click(function(){add(your_topping,top2_list,0)});
// $("#top2_cur_1").click(function(){add(your_topping,top2_list,1)});
// $("#top2_cur_2").click(function(){add(your_topping,top2_list,2)});
// $("#top2_cur_3").click(function(){add(your_topping,top2_list,3)});
// $("#top2_cur_4").click(function(){add(your_topping,top2_list,4)});

//無法綁定刪除按鈕,已解決//
// $("#order1").on("click","#or1del_0",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_1",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_2",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_3",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_4",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_5",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_6",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});
// $("#order1").on("click","#or1del_7",function(){remove_item(your_poke,parseInt($(this).attr("del-id")));});

// $("#order2").on("click","#or2del_0",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_1",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_2",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_3",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_4",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_5",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_6",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});
// $("#order2").on("click","#or2del_7",function(){remove_item(your_topping,parseInt($(this).attr("del-id")));});