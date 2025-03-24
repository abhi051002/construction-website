<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProjectController extends Controller
{
    // This will return all projects
    public function index()
    {
        $projects = Project::orderBy('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $projects]);
    }

    // This will insert a new project
    public function store(Request $request)
    {
        $formattedSlug = Str::slug($request->slug);
        $request->merge(['slug' => $formattedSlug]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug',
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }

        $project = new Project();
        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status == 0 ? $request->status : 1;
        $project->save();

        if ($request->imageId > 0) {
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $project->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/projects/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(500, 600);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/projects/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $project->image = $fileName;
            $project->save();
        }

        return response()->json(['status' => true, 'message' => 'Project created successfully']);
    }

    // Update a project
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['status' => false, 'message' => 'Project not found']);
        }
        $formattedSlug = Str::slug($request->slug);
        $request->merge(['slug' => $formattedSlug]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,' . $id . ',id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }

        $project->title = $request->title;
        $project->slug = Str::slug($request->slug);
        $project->short_desc = $request->short_desc;
        $project->content = $request->content;
        $project->construction_type = $request->construction_type;
        $project->sector = $request->sector;
        $project->location = $request->location;
        $project->status = $request->status == 0 ? $request->status : 1;
        $project->save();

        if ($request->imageId > 0) {
            $oldImage = $project->image;
            $tempImage  = TempImage::find($request->imageId);
            if (!$tempImage) {
                return response()->json(['status' => false, 'message' => 'Temp image not found']);
            }
            $extArray = explode('.', $tempImage->name);
            $ext = last($extArray);
            $fileName = strtotime('now') . $project->id . '.' . $ext;

            // Create small thumbnail here
            $manager = new ImageManager(Driver::class);
            $sourcePath = public_path('uploads/temp/' . $tempImage->name);
            $destPath = public_path('uploads/projects/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(500, 600);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/projects/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $project->image = $fileName;
            $project->save();

            if ($oldImage) {
                File::delete(public_path('uploads/projects/small/' . $oldImage));
                File::delete(public_path('uploads/projects/large/' . $oldImage));
            }
        }

        return response()->json(['status' => true, 'message' => 'Project updated successfully']);
    }

    // Get a Single Project
    public function show($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['status' => false, 'message' => 'Project not found']);
        }
        return response()->json(['status' => true, 'data' => $project]);
    }

    // Delete a project
    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['status' => false, 'message' => 'Project not found']);
        }
        $oldImage = $project->image;
        $project->delete();
        if ($oldImage) {
            File::delete(public_path('uploads/projects/small/' . $oldImage));
            File::delete(public_path('uploads/projects/large/' . $oldImage));
        }
        return response()->json(['status' => true, 'message' => 'Project deleted successfully']);
    }
}
