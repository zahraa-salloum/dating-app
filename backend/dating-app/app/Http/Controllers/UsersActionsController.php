<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Users_info;


class UsersActionsController extends Controller
{
    function addOrUpdateUsersInfo(Request $request, $id){

        $user_info = Users_info::where('user_id', $id)->first();
        
        if(empty($user_info) ){
            $user_info = new Users_info;
        }
        
        $user_info->bio = $request->bio;
        $user_info->status = $request->status;
        $user_info->education = $request->education;
        $user_info->job = $request->job;
        $user_info->dob = $request->dob;
        $user_info->gender = $request->gender;
        $user_info->country = $request->country;
        $user_info->profile_picture = $request->profile_picture;
        $user_info->user_id = $request->user_id;
       
        $user_info->save();

        return response()->json([
            "success" => true
        ]);
    }
}
