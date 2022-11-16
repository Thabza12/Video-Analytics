<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class DetectedObject extends Model
{
    use HasFactory;

    use SoftDeletes, CascadeSoftDeletes;

    protected $dates = ['deleted_at'];

    protected $table = 'detected_objects';

    protected $fillable = [
        'class_id',
        'algorithm_name',
        'probability',
        'priority',
        'bounding_box_id'
    ];

    public function productClass(){
        return $this->belongsTo(ProductClass::class);
    }

    public function boundingBox(){
        return $this->belongsTo(BoundingBox::class);
    }
}
