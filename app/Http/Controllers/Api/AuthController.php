<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\loginRequest;
use App\Http\Requests\Auth\signupRequest;
use App\Models\User;
use Auth;
class AuthController extends Controller
{
    public function login(LoginRequest $request) {
        $credentials = $request->validated();
        if (!Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            return response([
                'message' => 'Credentials Mismatched'
            ], 401);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }


    public function signup(signupRequest $request){
        $data = $request->validated();
        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
        ]);
        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user'=>$user,
            'token'=>$token
        ]);
    }

    public function logout(Request $request){
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User is null',
                'token_from_header' => $request->header('Authorization'),
            ], 401);
        }
        $user->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out']);
    }
}
