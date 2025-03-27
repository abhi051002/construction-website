<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TestimonialController extends Controller
{
    // This method will return all Testimonials
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $testimonials]);
    }

    // This method will create a new Testimonial
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()]);
        }

        $testimonials = new Testimonial();
        $testimonials->testimonial = $request->testimonial;
        $testimonials->citation = $request->citation;
        $testimonials->status = $request->status == 0 ? $request->status : 1;
        $testimonials->designation = $request->designation;
        $testimonials->save();

        if ($request->imageId > 0) {
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $testimonials->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/testimonials/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(300, 300);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/testimonials/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $testimonials->image = $fileName;
            $testimonials->save();
        }

        return response()->json(['status' => true, 'message' => 'Testimonial created successfully']);
    }

    // This method will update a Testimonial
    public function update(Request $request, $id)
    {
        $testimonials = Testimonial::find($id);
        if (!$testimonials) {
            return response()->json(['status' => false, 'message' => 'Testimonial not found']);
        }

        $validator = Validator::make($request->all(), [
            'testimonial' => 'required',
            'citation' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => $validator->errors()]);
        }

        $testimonials->testimonial = $request->testimonial;
        $testimonials->citation = $request->citation;
        $testimonials->status = $request->status == 0 ? $request->status : 1;
        $testimonials->designation = $request->designation;
        $testimonials->save();

        if ($request->imageId > 0) {
            $oldImage = $testimonials->image;
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $testimonials->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/testimonials/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(300, 300);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/testimonials/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $testimonials->image = $fileName;
            $testimonials->save();

            if ($oldImage) {
                File::delete(public_path('uploads/testimonials/small/' . $oldImage));
                File::delete(public_path('uploads/testimonials/large/' . $oldImage));
            }
        }

        return response()->json(['status' => true, 'message' => 'Testimonials updated successfully']);
    }

    // This method will delete a Testimonial
    public function destroy($id)
    {
        $testimonials = Testimonial::find($id);
        if (!$testimonials) {
            return response()->json(['status' => false, 'message' => 'Testimonial not found']);
        }
        $oldImage = $testimonials->image;
        $testimonials->delete();
        if ($oldImage) {
            File::delete(public_path('uploads/testimonials/small/' . $oldImage));
            File::delete(public_path('uploads/testimonials/large/' . $oldImage));
        }
        return response()->json(['status' => true, 'message' => 'Testimonial deleted successfully']);
    }

    // This method will return a specific Testimonial
    public function show($id)
    {
        $testimonials = Testimonial::find($id);
        if (!$testimonials) {
            return response()->json(['status' => false, 'message' => 'Testimonials not found']);
        }
        return response()->json(['status' => true, 'data' => $testimonials]);
    }
}
