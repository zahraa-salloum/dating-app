<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Users_info;
use App\Models\User;
use App\Models\Picture;
use App\Models\Block;
use App\Models\Favorite;



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
            $opposite_users = Users_info::join('users', 'users_infos.user_id', '=', 'users.id')->select('name','user_id')->where('gender','male')->get();
        }else{
            $opposite_users = Users_info::join('users', 'users_infos.user_id', '=', 'users.id')->select('name','user_id')->where('gender','female')->get();
        }

        return response()->json([
            "opposite_users" => $opposite_users
        ]);
    }

    function filterByCountry($country){
        $user_info =  Users_info::join('users', 'users_infos.user_id', '=', 'users.id')->select('name','user_id')->where('country',$country)->get();

        return response()->json([
            "users" => $user_info
        ]);
    }


    function filterByAge($year){
        $user_info =  Users_info::join('users', 'users_infos.user_id', '=', 'users.id')->select('name','user_id')->where('dob','like',"$year%")->get();

        return response()->json([
            "users" => $user_info
        ]);
    }

    function getName($id){
        $user_info =  User::find($id);

        return response()->json([
            "user" => $user_info
        ]);
    }

    function searchByName($name){
        $user_info =  User::where('name','like',"$name%")->get();

        return response()->json([
            "user" => $user_info
        ]);
    }


    function uploadPicture(Request $request, $id){
        

        $picture = Picture::where('user_id', $id)->get();
        $pictures_count = $picture->count();

        if($pictures_count < 3){
            $new_picture = new Picture;
        
        
            $new_picture->picture = $request->picture;
            $new_picture->user_id = $id;
       
            $new_picture->save();

             return response()->json([
                "success" => true
            ]);

        }
        return response()->json([
            "success" => false,
            "condition" => 'max 3 photos'
        ]);
    }

    function blockUser(Request $request, $id){
        $user_id_blocked = $request->user_id_blocked;
        $blockage =  Block::where('user_id',$id)->where('user_id_blocked',$user_id_blocked)->get();
        $blockage_count = $blockage->count();
        if($blockage_count == 0){
        
        $new_block = new Block;
        $new_block->user_id = $id;
        $new_block->user_id_blocked = $request->user_id_blocked;
        $new_block->save();

        return response()->json([
            "success" => true
        ]);
    } else{
        return response()->json([
            "success" => false
        ]);
    }
        
    }

    function favoriteUser(Request $request, $id){
        $user_id_favorite = $request->user_id_favorite;
        $favorite =  Favorite::where('user_id',$id)->where('user_id_favorite',$user_id_favorite)->get();
        $favorite_count = $favorite->count();
        if($favorite_count == 0){
        
        $new_favorite = new Favorite;
        $new_favorite->user_id = $id;
        $new_favorite->user_id_favorite = $request->user_id_favorite;
        $new_favorite->save();

        return response()->json([
            "success" => true
        ]);
    } else{
        return response()->json([
            "success" => false
        ]);
    }
        
    }

    function getWhoBlocked($id){
        $who_blocked =  Block::join('users', 'blocks.user_id', '=', 'users.id')->select('name','user_id')->where('user_id_blocked',$id)->get();
        
        return response()->json([
            "who_blocked" => $who_blocked
        ]);
    }

    function myBlocked($id){
        $my_blocked =  Block::join('users', 'blocks.user_id_blocked', '=', 'users.id')->select('name','user_id_blocked')->where('user_id',$id)->get();
        
        return response()->json([
            "my_blocked" => $my_blocked
        ]);
    }

    function getWhoFavorite($id){
        $who_favorite =  Favorite::join('users', 'favorites.user_id', '=', 'users.id')->select('name','user_id')->where('user_id_favorite',$id)->get();
        
        return response()->json([
            "who_favorite" => $who_favorite
        ]);
    }

    function myFavorites($id){
        $my_favorites =  Favorite::join('users', 'favorites.user_id_favorite', '=', 'users.id')->select('name','user_id_favorite')->where('user_id',$id)->get();
        
        return response()->json([
            "my_favorites" => $my_favorites
        ]);
    }
}
