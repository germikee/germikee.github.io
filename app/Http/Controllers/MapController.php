<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class MapController extends Controller
{
    /**
     * Show the map form.
     * @return Illuminate\View\View
     */
    public function create()
    {
        return view('maps');
    }
}
