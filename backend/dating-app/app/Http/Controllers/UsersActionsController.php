<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Users_info;
use App\Models\User;



class UsersActionsController extends Controller
{   
    public function __construct()
    {
        $this->middleware('auth:api');
    }

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

    function getOppositeGender($id){
        $user_info =  Users_info::where('user_id', $id)->first();
        $gender = $user_info->gender;
        if($gender == 'female'){
            $opposite_users = Users_info::where('gender','male')->get();
        }else{
            $opposite_users = Users_info::where('gender','female')->get();
        }

        return response()->json([
            "opposite_users" => $opposite_users
        ]);
    }

    function filterByCountry($country){
        $user_info =  Users_info::where('country',$country)->get();

        return response()->json([
            "users" => $user_info
        ]);
    }

}
