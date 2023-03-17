<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string("message");
            $table->dateTime("date_time");
            
            $table->bigInteger('user_id_sent')->unsigned();
            $table->foreign('user_id_sent')->references('id')->on('users')->onDelete('cascade');

            $table->bigInteger('user_id_received')->unsigned();
            $table->foreign('user_id_received')->references('id')->on('users')->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('messages');
    }
}
