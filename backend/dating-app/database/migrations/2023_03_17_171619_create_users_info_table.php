<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users_info', function (Blueprint $table) {
            $table->id();
            $table->text("bio")->nullable();;
            $table->string("status")->nullable();;
            $table->string("education")->nullable();;
            $table->string("job")->nullable();;
            $table->date("dob")->nullable();;
            $table->string("gender")->nullable();;
            $table->string("country")->nullable();;
            $table->string("profile_picture")->nullable();;
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('users_info');
    }
}
