<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return Illuminate\View\View
     */
    public function create()
    {
        return view('index');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = Order::create([
                'product_name'      => $request->product_name,
                'quantity'          => $request->quantity,
                'price'             => $request->price,
                'total_value'       => $request->price * $request->quantity
            ]);

        return [
            'product_name'      => $order->product_name,
            'quantity'          => $order->quantity,
            'price'             => $order->price,
            'date_submitted'    => Carbon::now()->toDayDateTimeString(),
            'total_value'       => $order->total_value,
            'total_sum_value'   => Order::all()->sum('total_value')
        ];
    }
}
