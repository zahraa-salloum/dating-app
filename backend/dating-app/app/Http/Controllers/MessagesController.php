<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Models\Block;

class MessagesController extends Controller
{
    function sendMessage(Request $request, $id){
        $id_sending = $id;
        $id_receiving = $request->user_id_received;
        $blockage = Block::where('user_id',$id_sending)->where('user_id_blocked',$id_receiving)->get();
        $opp_blockage = Block::where('user_id',$id_receiving)->where('user_id_blocked',$id_sending)->get();
        $blockage_count = $blockage->count();
        $opp_blockage_count = $opp_blockage->count();
        if($blockage_count == 0 && $opp_blockage_count == 0){
        
        $new_message = new Message;
        $new_message->message = $request->message;
        $new_message->date_time =now()->format('Y-m-d H:i:s');
        $new_message->user_id_sent = $id;
        $new_message->user_id_received = $request->user_id_received;
        $new_message->save();

        return response()->json([
            "success" => true
        ]);
    } else{
        return response()->json([
            "success" => false
        ]);
    }
        
    }

    function showMessages(Request $request, $id){
        $user_id_received = $request->user_id_received;
        $messages = Message::where('user_id_sent', $id)->where('user_id_received', $user_id_received)->get();

        return response()->json([
            "messages" => $messages
        ]);
    }
}
