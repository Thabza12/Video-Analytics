<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bounding_boxes', function (Blueprint $table) {
            $table->id();
            $table->float('x_coordinate');
            $table->float('y_coordinate');
            $table->float('width');
            $table->float('height');
            $table->integer('frame_id');
            $table->softDeletes();
            $table->unsignedBigInteger('video_id');
            $table->foreign('video_id')->references('id')->on('videos')->onDelete('cascade');
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
        Schema::dropIfExists('bounding_boxes');
    }
};
