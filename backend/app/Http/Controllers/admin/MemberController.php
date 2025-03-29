<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class MemberController extends Controller
{
    // This will return all members
    public function index()
    {
        $member = Member::orderBy('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $member]);
    }

    // This will store a member in the database
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }

        $member = new Member();
        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status == 0 ? $request->status : 1;
        $member->save();

        if ($request->imageId > 0) {
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $member->id . '.' . $ext;

            // Create thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/members/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(400, 500);
            $image->save($destPath);

            $member->image = $fileName;
            $member->save();
        }

        return response()->json(['status' => true, 'message' => 'Member created successfully']);
    }

    // This will update a member in the database
    public function update(Request $request, $id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json(['status' => false, 'message' => 'Member not found']);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'job_title' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }


        $member->name = $request->name;
        $member->job_title = $request->job_title;
        $member->linkedin_url = $request->linkedin_url;
        $member->status = $request->status == 0 ? $request->status : 1;
        $member->save();

        if ($request->imageId > 0) {
            $oldImage = $member->image;
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $member->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/members/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(400, 500);
            $image->save($destPath);

            $member->image = $fileName;
            $member->save();

            if ($oldImage) {
                File::delete(public_path('uploads/members/' . $oldImage));
            }
        }

        return response()->json(['status' => true, 'message' => 'Member updated successfully']);
    }

    // This will delete a member from the database
    public function destroy($id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json(['status' => false, 'message' => 'Member not found']);
        }
        $oldImage = $member->image;
        $member->delete();
        if ($oldImage) {
            File::delete(public_path('uploads/members/' . $oldImage));
        }
        return response()->json(['status' => true, 'message' => 'Member deleted successfully']);
    }
    // This will return a member
    public function show($id)
    {
        $member = Member::find($id);
        if (!$member) {
            return response()->json(['status' => false, 'message' => 'Member not found']);
        }
        return response()->json(['status' => true, 'data' => $member]);
    }
}
