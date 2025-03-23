<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // This method will return all active services
    public function index()
    {
        $services = Service::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return $services;
    }

    // This method will return latest active services
    public function latestServices(Request $request)
    {
        $services = Service::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')
            ->get();
        return $services;
    }
}
