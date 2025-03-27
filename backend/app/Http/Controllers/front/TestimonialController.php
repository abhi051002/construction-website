<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // This method will return all active testimonials
    public function index()
    {
        $testimonials = Testimonial::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return $testimonials;
    }

    // This method will return latest active services
    public function latestTestimonials(Request $request)
    {
        $testimonials = Testimonial::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')
            ->get();
        return $testimonials;
    }
}
