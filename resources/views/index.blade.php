<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <meta name="_token" content="{{ csrf_token() }}">
    </head>

    <body>
        <div class="container">
            <hr>
            <form>
              <div class="form-group">
                <label for="product_name">Product Name</label>
                <input type="text" class="form-control" id="product_name" placeholder="Product Name">
              </div>
              <div class="form-group">
                <label for="quantity">Quantity in stock</label>
                <input type="text" class="form-control" id="quantity" placeholder="Quantity in stock">
              </div>
              <div class="form-group">
                <label for="price">Price per item</label>
                <input type="text" class="form-control" id="price" placeholder="Price per item">
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <hr>
            <div class="hide" id="display_response">
                <h2>Response</h2>
                <div class="row">
                    <label class="col-md-3" for="display_product_name">Product Name</label>
                    <span class="col-md-9" id="display_product_name"></span>
                </div>
                <div class="row">
                    <label class="col-md-3" for="display_date_submitted">Date Submitted</label>
                    <span class="col-md-9" id="display_date_submitted"></span>
                </div>
                <div class="row">
                    <label class="col-md-3" for="display_quantity">Quantity</label>
                    <span class="col-md-9" id="display_quantity"></span>
                </div>
                <div class="row">
                    <label class="col-md-3" for="display_price">Price</label>
                    <span class="col-md-9" id="display_price"></span>
                </div>
                <div class="row">
                    <label class="col-md-3" for="display_total_value">Total Value</label>
                    <span class="col-md-9" id="display_total_value"></span>
                </div>
                <div class="row">
                    <label class="col-md-3" for="display_total_sum_value">Total Sum Value</label>
                    <span class="col-md-9" id="display_total_sum_value"></span>
                </div>
            </div>            
        </div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="js/script.js"></script>
    </body>
</html>
