<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class ProductClass extends Model
{
    use HasFactory;

    use SoftDeletes, CascadeSoftDeletes;

    protected $cascadeDeletes = ['detectedObject', 'container'];

    protected $dates = ['deleted_at'];

    protected $table = 'product_classes';

    protected $fillable = [
        'product_name'
    ];

    public function detectedObject(){
        return $this->hasMany(DetectedObject::class);
    }

    public function container(){
        return $this->hasOne(Container::class);
    }
}
