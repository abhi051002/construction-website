<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
            $credentials = ['email' => $request->email, 'password' => $request->password];
            if (Auth::attempt($credentials)) {
                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;

                return response()->json(["success" => true, "message" => "Successfully authenticated", 'token' => $token, "id" => $user->id]);
            } else {
                return response()->json(['success' => false, 'error' => 'Invalid credentials']);
            }
        } catch (ValidationException $e) {
            return response()->json(['success' => false, 'error' => $e->errors()]);
        }
    }

    public function logout(Request $request)
    {
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();
        return response()->json(['success' => true, "message" => "User logged out"]);
    }
}
