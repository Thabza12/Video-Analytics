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
        Schema::create('pick_sheets', function (Blueprint $table) {
            $table->id();
            $table->string('pick_sheet_number');
            $table->string('shipment_number');
            $table->date('pick_sheet_date');
            $table->date('delivery_date');
            $table->string('routeID');
            $table->integer('bay');
            $table->integer('bin');
            $table->integer('quantity');
            $table->softDeletes();
            $table->unsignedBigInteger('video_id')->nullable();
           
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
        Schema::dropIfExists('pick_sheets');
    }
};
