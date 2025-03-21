<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'image' => 'required|mimes:jpeg,png,jpg,jpeg,gif,svg'
        ]);

        if ($validate->fails()) {
            return response()->json(['status' => false, 'error' => $validate->errors('image')]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = strtotime('now') . '.' . $ext;

        $tempImage = new TempImage();
        $tempImage->name = $imageName;
        $tempImage->save();

        $image->move(public_path('uploads/temp'), $imageName);

        // Create small thumbnail here
        $manager = new ImageManager(Driver::class);
        $sourcePath = public_path('uploads/temp/' . $imageName);
        $destPath = public_path('uploads/temp/thumb/' . $imageName);
        $image = $manager->read($sourcePath);
        $image->coverDown(300, 300);
        $image->save($destPath);

        return response()->json(['status' => true, 'message' => 'Image uploaded successfully', 'data' => $tempImage]);
    }
}
