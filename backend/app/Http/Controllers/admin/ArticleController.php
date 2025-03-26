<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ArticleController extends Controller
{
    // This method will fetch all articles
    public function index()
    {
        $article = Article::orderBy('created_at', 'DESC')->get();
        return response()->json(['status' => true, 'data' => $article]);
    }

    // This method will insert a article
    public function store(Request $request)
    {
        $formattedSlug = Str::slug($request->slug);
        $request->merge(['slug' => $formattedSlug]);
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug',
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }
        $service = new Article();
        $service->title = $request->title;
        $service->slug = Str::slug($request->slug);
        $service->content = $request->content;
        $service->author = $request->author;
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
            $destPath = public_path('uploads/articles/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(450, 300);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/articles/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $service->image = $fileName;
            $service->save();
        }

        return response()->json(['status' => true, 'message' => 'Articlea created successfully']);
    }

    // This method will update a article
    public function update(Request $request, $id)
    {
        $service = Article::find($id);
        if (!$service) {
            return response()->json(['status' => false, 'message' => 'Article not found']);
        }
        $formattedSlug = Str::slug($request->slug);
        $request->merge(['slug' => $formattedSlug]);

        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'slug' => 'required|unique:articles,slug,' . $id . ',id',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'error' => $validator->errors()]);
        }
        $service->title = $request->title;
        $service->slug = Str::slug($request->slug);
        $service->author = $request?->author ?? $service->author;
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
            $destPath = public_path('uploads/articles/small/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->coverDown(450, 300);
            $image->save($destPath);

            // Create large thumbnail here
            $destPath = public_path('uploads/articles/large/' . $fileName);
            $image = $manager->read($sourcePath);
            $image->scaleDown(1200);
            $image->save($destPath);

            $service->image = $fileName;
            $service->save();

            if ($oldImage) {
                File::delete(public_path('uploads/articles/small/' . $oldImage));
                File::delete(public_path('uploads/articles/large/' . $oldImage));
            }
        }

        return response()->json(['status' => true, 'message' => 'Article updated successfully']);
    }

    // This method will delete a article
    public function destroy($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['status' => false, 'message' => 'Article not found']);
        }
        $oldImage = $article->image;
        $article->delete();
        if ($oldImage) {
            File::delete(public_path('uploads/articles/small/' . $oldImage));
            File::delete(public_path('uploads/articles/large/' . $oldImage));
        }
        return response()->json(['status' => true, 'message' => 'Article deleted successfully']);
    }

    // This method will show a single article
    public function show($id)
    {
        $article = Article::find($id);
        if (!$article) {
            return response()->json(['status' => false, 'message' => 'Article not found']);
        }
        return response()->json(['status' => true, 'data' => $article]);
    }
}
