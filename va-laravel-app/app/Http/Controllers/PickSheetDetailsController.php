<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PickSheetDetails;
use App\Models\PickSheet;

class PickSheetDetailsController extends Controller
{
    //Get all details function
    public function getDetails(){
        return response()->json(PickSheetDetails::all(), 200);
    }

    //Get details by ID function
    public function getDetailsById($id){
        $pickSheetDetails = PickSheetDetails::find($id);
        if (is_null($pickSheetDetails)) {
            return response()->json(['message' => 'Details Not Found'], 404);
        }
        return response()->json($pickSheetDetails::find($id), 200);
    }

    //Get details by foreign key function
    public function getDetailsByPickSheet($id){
        $details = PickSheetDetails::where('pick_sheet_id', $id)->get();
        return response()->json($details);
    }

    //Update details function
    public function updateDetails(Request $request, $id){
        $pickSheetDetails = PickSheetDetails::find($id);
        if (is_null($pickSheetDetails)) {
            return response()->json(['message' => 'Details Not Found'], 404);
        }
        $pickSheetDetails->update($request->all());
        $pickSheetDetails->total_cases = $request->layers + $request->hands;
        $pickSheetDetails->save();
        return response($pickSheetDetails, 200);
    }

    //Delete details function
    public function deleteDetails($id){
        $pickSheetDetails = PickSheetDetails::find($id);
        if (is_null($pickSheetDetails)) {
            return response()->json(['message' => 'Details Not Found'], 404);
        }
        $pickSheetDetails->delete();
        return response()->json(null, 204);
    }

}
