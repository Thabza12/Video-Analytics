<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class PickSheet extends Model
{
    use HasFactory;

    use SoftDeletes, CascadeSoftDeletes;

    protected $cascadeDeletes = ['details'];

    protected $dates = ['deleted_at'];

    protected $table = 'pick_sheets';

    protected $fillable = [
        'pick_sheet_number',
        'shipment_number',
        'pick_sheet_date',
        'delivery_date',
        'routeID',
        'bay',
        'bin',
        'quantity',
        'video_id'
    ];

    public function video(){
        return $this->belongsTo(Video::class);
    }

    public function details(){
        return $this->hasMany(PickSheetDetails::class);
    }
}
