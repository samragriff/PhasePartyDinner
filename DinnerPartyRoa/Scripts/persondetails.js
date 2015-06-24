﻿//AngularJs
var menuApp = angular.module('menuApp', []);

var app = angular.module('app', ['autocomplete']);

function Order() {
    User = null;
    Item = null;
}

menuApp.controller('ListCtrl', function ($scope, $http) {

    var array = [];
    $http.get("https://api.github.com/orgs/enspiral-dev-academy/members?access_token=b71c0b279059b2b33bc5b2f0bac3db3807cd6826&per_page=100")
        .success(function (data) {
            for (var key in data) {
                array.push(data[key].login);
            }

            $(function () {                                        //jquery
                var userList = $("#currentuser").autocomplete({
                    source: array,
                    change: function (event, ui) {
                        var val = ui.item.value;
                        $('#currentuser').attr('value', val).trigger('input');
                    },
                });
            });
        });
          

    $http.get('/api/MenuItemsapi').success(function (dataAng) {

        $scope.meal = {};
        $scope.user = "";
        $scope.meals = dataAng;
       
        $scope.menulist = function (meal) {

            $scope.meal.Title = meal.Title;
            $scope.meal.Id = meal.Id;         
        }
               
        $scope.submit = function () {        
        
            var order = new Order();
            order.Item = $scope.meal.Title;
            order.ItemId = $scope.meal.Id;
            order.User = $scope.user;

            $http.post('/api/orders/', order).
                success(function () {
                    alert("Order Placed!")

                    $scope.meal = {};
                    $scope.user = "";
            });
        }
    });
});







//$('#menu').on('click', 'li', function () {
//    $('#currentorder').empty();
//    currentSelectedItem = $.trim($(this).text());

//    var orderDiv = $(this).find("#data")[0];
//    var orderId = $(orderDiv).data("menuitemid");

//    $('#currentorderid').attr("value", orderId);
//    $('#currentorder').attr("value", currentSelectedItem);
//    $('#currentorder').css('color', 'black');
//});

//$('#menu').on('click', 'li', function () {
//    $('#currentorder').empty();
//    currentSelectedItem = $.trim($(this).text());

//    var orderDiv = $(this).find("#data")[0];
//    var orderId = $(orderDiv).data("menuitemid");

//    $('#currentorderid').attr("value", orderId);
//    $('#currentorder').attr("value", currentSelectedItem);
//    $('#currentorder').css('color', 'blue');
//});


//$('#submitbutton').on('click', function (e) {
//    e.preventDefault();
//    var order = new Order();
//    order.Item = $('#currentorder').val();
//   order.ItemId = $('#currentorderid').val();

//    order.User = $('#currentuser').val();

//    $.ajax({
//        type: 'POST',
//        url: '/api/orders/',
//        data: order,

//        datatype: 'json',
//        success: function () {
//            alert("Order Placed!");
//        }
//    });

//});


//var GetNames = function () {

//    var array = [];
//    $.ajax({
//        type: "GET",
//        url: "https://api.github.com/orgs/enspiral-dev-academy/members?access_token=b71c0b279059b2b33bc5b2f0bac3db3807cd6826&per_page=100",
//        success: function (data) {

//            for (var key in data) {
//                array.push(data[key].login);
//            }
//        },
//        error: function () {
//            alert("wrong");
//        }
//    });
//    return array;
//}