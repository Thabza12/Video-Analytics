<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class Video extends Model
{
    use HasFactory;

    use SoftDeletes, CascadeSoftDeletes;

    protected $cascadeDeletes = ['pickSheet', 'boundingBox'];

    protected $dates = ['deleted_at'];

    protected $table = 'videos';

    protected $fillable = [
        'video_file',
        'record_date',
        'start_time',
        'end_time',
        'assigned'
    ];

    public function pickSheet(){
        return $this->hasOne(PickSheet::class);
    }

    public function boundingBox(){
        return $this->hasMany(BoundingBox::class);
    }
}
