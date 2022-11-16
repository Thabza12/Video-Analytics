<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\PickSheet;
use App\Models\Video;
use App\Models\PickSheetDetails;

class PickSheetController extends Controller
{
    //Get all pickSheets function
    public function getPickSheets(){
        return response()->json(PickSheet::all(), 200);
    }

    //Get pickSheets by ID function
    public function getPickSheetById($id){
        $pickSheet = PickSheet::find($id);
        if (is_null($pickSheet)) {
            return response()->json(['message' => 'PickSheet Not Found'], 404);
        }
        return response()->json($pickSheet::find($id), 200);
    }

    //Add new pickSheet function
    public function addPickSheet(Request $request){

        $request = \Request::all();

        $pickSheet = new PickSheet();
        $pickSheet->pick_sheet_number = $request['pick_sheet_number'];
        $pickSheet->shipment_number = $request['shipment_number'];
        $pickSheet->pick_sheet_date = $request['pick_sheet_date'];
        $pickSheet->delivery_date = $request['delivery_date'];
        $pickSheet->routeID = $request['routeID'];
        $pickSheet->bay = $request['bay'];
        $pickSheet->bin = $request['bin'];
        $pickSheet->quantity = $request['quantity'];
        $pickSheet->save();

        if (isset($request['details'])) {
            foreach($request['details'] as $pickSheetDetails){
                $pickSheetD = new PickSheetDetails();
                $pickSheetD->zone = $pickSheetDetails['zone'];
                $pickSheetD->pack = $pickSheetDetails['pack'];
                $pickSheetD->flavour = $pickSheetDetails['flavour'];
                $pickSheetD->hands = $pickSheetDetails['hands'];
                $pickSheetD->layers = $pickSheetDetails['layers'];
                $pickSheetD->total_cases = $pickSheetDetails['hands'] + $pickSheetDetails['layers'];
                $pickSheetD->SKU = $pickSheetDetails['SKU'];
                $pickSheetD->pick_sheet_id = $pickSheet->id;
                $pickSheetD->save();
            }
        }

        // dd($pickSheet);

        return response($pickSheet, 201);
    }

    //Update pickSheet function
    public function updatePickSheet(Request $request, $id){
        $pickSheet = PickSheet::find($id);
        if (is_null($pickSheet)) {
            return response()->json(['message' => 'PickSheet Not Found'], 404);
        }
        $pickSheet->update($request->all());
        return response($pickSheet, 200);
    }

    //Assign video to pickSheet function
    public function assign($id, $pickSheetId){
        $video = Video::find($id);
        if (is_null($video)) {
            return response()->json(['message' => 'Video Not Found'], 404);
        }
        $pickSheet = PickSheet::find($pickSheetId);
        if (is_null($pickSheet)) {
            return response()->json(['message' => 'PickSheet Not Found'], 404);
        }
        $pickSheet->video_id = $video->id;
        $pickSheet->save();
        $video->assigned = true;
        $video->save();
        return response($pickSheet, 200);
    }

    //Unassigned pickSheets function
    public function unassigned(){
        $pickSheets = PickSheet::where('video_id', null)->get();
        return response()->json($pickSheets);
    }

    //Delete pickSheet function
    public function deletePickSheet($id){
        $pickSheet = PickSheet::find($id);
        if (is_null($pickSheet)) {
            return response()->json(['message' => 'PickSheet Not Found'], 404);
        }
        $pickSheet->delete();
        return response()->json(null, 204);
    }
}
