<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Container extends Model
{
    use HasFactory;

    use SoftDeletes, CascadeSoftDeletes;

    protected $dates = ['deleted_at'];

    protected $table = 'containers';

    protected $fillable = [
        'width',
        'height'
    ];

    public function productClass(){
        return $this->belongsTo(ProductClass::class);
    }
}
