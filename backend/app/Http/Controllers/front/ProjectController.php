<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // This method will return all active services
    public function index()
    {
        $services = Project::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return $services;
    }

    // This method will return latest active services
    public function latestProjects(Request $request)
    {
        $services = Project::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')
            ->get();
        return $services;
    }
}
