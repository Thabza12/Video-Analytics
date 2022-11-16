<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class BoundingBox extends Model
{
    use HasFactory;

    use SoftDeletes, CascadeSoftDeletes;

    protected $cascadeDeletes = ['detectedObject'];

    protected $dates = ['deleted_at'];

    protected $table = 'bounding_boxes';

    protected $fillable = [
        'x_coordinate',
        'y_coordinate',
        'width',
        'height',
        'frame_id',
        'video_id'
    ];

    public function video(){
        return $this->belongsTo(Video::class);
    }

    public function detectedObject(){
        return $this->hasMany(DetectedObject::class);
    }




}
