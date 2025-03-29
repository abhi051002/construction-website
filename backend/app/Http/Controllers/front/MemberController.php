<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    // This method will return all active members
    public function index()
    {
        $members = Member::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return $members;
    }

    // This method will return latest active services
    public function latestMembers(Request $request)
    {
        $members = Member::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')
            ->get();
        return $members;
    }
}
