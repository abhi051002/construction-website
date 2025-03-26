<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::orderBy('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $services]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $formattedSlug = Str::slug($request->slug);
        $request->merge(['slug' => $formattedSlug]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:services,slug',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }

        $service = new Service();
        $service->title = $request->title;
        $service->slug = Str::slug($request->slug);
        $service->short_desc = $request->short_desc;
        $service->content = $request->content;
        $service->status = $request->status == 0 ? $request->status : 1;
        $service->save();

        if ($request->imageId > 0) {
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $service->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/services/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(500, 600);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/services/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $service->image = $fileName;
            $service->save();
        }

        return response()->json(['status' => true, 'message' => 'Service created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['status' => false, 'message' => 'Service not found']);
        }
        return response()->json(['status' => true, 'data' => $service]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['status' => false, 'message' => 'Service not found']);
        }
        $formattedSlug = Str::slug($request->slug);
        $request->merge(['slug' => $formattedSlug]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:services,slug,' . $id . ',id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }

        $service->title = $request->title;
        $service->slug = Str::slug($request->slug);
        $service->short_desc = $request?->short_desc ?? $service->short_desc;
        $service->content = $request?->content ?? $service->content;
        $service->status = $request->status == 0 ? $request->status : 1;
        $service->save();

        if ($request->imageId > 0) {
            $oldImage = $service->image;
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $service->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/services/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(500, 600);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/services/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $service->image = $fileName;
            $service->save();

            if ($oldImage) {
                File::delete(public_path('uploads/services/small/' . $oldImage));
                File::delete(public_path('uploads/services/large/' . $oldImage));
            }
        }

        return response()->json(['status' => true, 'message' => 'Service updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['status' => false, 'message' => 'Service not found']);
        }
        $oldImage = $service->image;
        $service->delete();
        if ($oldImage) {
            File::delete(public_path('uploads/services/small/' . $oldImage));
            File::delete(public_path('uploads/services/large/' . $oldImage));
        }
        return response()->json(['status' => true, 'message' => 'Service deleted successfully']);
    }
}
