$(document).ready(function(){
    
    $('.btn').click(function(e){
        e.preventDefault();

        $.ajaxSetup({
            headers: {
              'X-CSRF-Token': $('meta[name="_token"]').attr('content')
            }
        });
        
        var request = {
            'product_name': $('#product_name').val(),
            'quantity': $('#quantity').val(),
            'price': $('#price').val()
        };

        $.post("/store", request, function(data) {
            $('#display_response').removeClass('hide');
            $('#display_product_name').html(data.product_name);
            $('#display_quantity').html(data.quantity);
            $('#display_price').html(data.price);
            $('#display_total_value').html(data.total_value);
            $('#display_total_sum_value').html(data.total_sum_value);
            $('#display_date_submitted').html(data.date_submitted);
        });
    });
});