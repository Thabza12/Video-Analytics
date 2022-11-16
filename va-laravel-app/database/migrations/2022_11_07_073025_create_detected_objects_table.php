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
        Schema::create('detected_objects', function (Blueprint $table) {
            $table->id();
            $table->string('algorithm_name');
            $table->unsignedBigInteger('class_id');
            $table->foreign('class_id')->references('id')->on('product_classes')->onDelete('cascade');
            $table->float('probability');
            $table->float('priority');
            $table->softDeletes();
            $table->unsignedBigInteger('bounding_box_id');
            $table->foreign('bounding_box_id')->references('id')->on('bounding_boxes')->onDelete('cascade');
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
        Schema::dropIfExists('detected_objects');
    }
};
