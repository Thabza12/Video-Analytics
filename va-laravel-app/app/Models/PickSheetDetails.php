<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Dyrynda\Database\Support\CascadeSoftDeletes;

class PickSheetDetails extends Model
{
    use HasFactory;

    use SoftDeletes;

    protected $table = 'pick_sheet_details';

    protected $fillable = [
        'zone',
        'pack',
        'flavour',
        'hands',
        'layers',
        'SKU',
        'pick_sheet_id'
    ];

    public function pickSheetDetails(){
        return $this->belongsTo(PickSheet::class);
    }
}
