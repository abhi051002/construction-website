<?php

use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\MemberController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\admin\TestimonialController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\front\ArticleController as FrontArticleController;
use App\Http\Controllers\front\ContactController;
use App\Http\Controllers\front\MemberController as FrontMemberController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\TestimonialController as FrontTestimonialController;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/authenticate', [AuthenticationController::class, 'authenticate']);
Route::post('/contact-now', [ContactController::class, 'index']);

Route::get('get-services', [FrontServiceController::class, 'index']);
Route::get('get-latest-services', [FrontServiceController::class, 'latestServices']);
Route::get('get-service/{id}', [ServiceController::class, 'show']);

Route::get('get-projects', [FrontProjectController::class, 'index']);
Route::get('get-latest-projects', [FrontProjectController::class, 'latestProjects']);
Route::get('get-project/{id}', [ProjectController::class, 'show']);

Route::get('get-articles', [FrontArticleController::class, 'index']);
Route::get('get-latest-articles', [FrontArticleController::class, 'latestArticles']);
Route::get('get-article/{id}', [ArticleController::class, 'show']);

Route::get('get-testimonials', [FrontTestimonialController::class, 'index']);
Route::get('get-latest-testimonials', [FrontTestimonialController::class, 'latestTestimonials']);

Route::get('get-members', [FrontMemberController::class, 'index']);
Route::get('get-latest-members', [FrontMemberController::class, 'latestMembers']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/dashboard', [DashboardController::class, "index"]);
    Route::get('/logout', [AuthenticationController::class, "logout"]);

    // Services Routes
    Route::post('services', [ServiceController::class, 'store']);
    Route::get('services', [ServiceController::class, 'index']);
    Route::put('services/{id}', [ServiceController::class, 'update']);
    Route::get('services/{id}', [ServiceController::class, 'show']);
    Route::delete('services/{id}', [ServiceController::class, 'destroy']);

    // Temp Image Routes
    Route::post('temp-images', [TempImageController::class, 'store']);

    // Project Routes
    Route::post('projects', [ProjectController::class, 'store']);
    Route::get('projects', [ProjectController::class, 'index']);
    Route::put('projects/{id}', [ProjectController::class, 'update']);
    Route::get('projects/{id}', [ProjectController::class, 'show']);
    Route::delete('projects/{id}', [ProjectController::class, 'destroy']);

    // Article Routes  
    Route::post('articles', [ArticleController::class, 'store']);
    Route::get('articles', [ArticleController::class, 'index']);
    Route::put('articles/{id}', [ArticleController::class, 'update']);
    Route::get('articles/{id}', [ArticleController::class, 'show']);
    Route::delete('articles/{id}', [ArticleController::class, 'destroy']);

    // Testimonial Routes  
    Route::post('testimonials', [TestimonialController::class, 'store']);
    Route::get('testimonials', [TestimonialController::class, 'index']);
    Route::put('testimonials/{id}', [TestimonialController::class, 'update']);
    Route::get('testimonials/{id}', [TestimonialController::class, 'show']);
    Route::delete('testimonials/{id}', [TestimonialController::class, 'destroy']);

    // Testimonial Routes  
    Route::post('members', [MemberController::class, 'store']);
    Route::get('members', [MemberController::class, 'index']);
    Route::put('members/{id}', [MemberController::class, 'update']);
    Route::get('members/{id}', [MemberController::class, 'show']);
    Route::delete('members/{id}', [MemberController::class, 'destroy']);
});
