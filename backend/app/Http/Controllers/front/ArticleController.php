<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // This method will return all active article
    public function index()
    {
        $article = Article::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return $article;
    }

    // This method will return latest active article
    public function latestArticles(Request $request)
    {
        $article = Article::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')
            ->get();
        return $article;
    }
}
