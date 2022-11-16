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
        Schema::create('pick_sheet_details', function (Blueprint $table) {
            $table->id();
            $table->string('zone');
            $table->string('pack');
            $table->string('flavour');
            $table->integer('hands');
            $table->integer('layers');
            $table->integer('total_cases');
            $table->string('SKU');
            $table->softDeletes();
            $table->unsignedBigInteger('pick_sheet_id')->nullable();

            $table->foreign('pick_sheet_id')->references('id')->on('pick_sheets')->onDelete('cascade');

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
        Schema::dropIfExists('pick_sheet_details');
    }
};
