<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DetectedObject;
use App\Models\BoundingBox;
use App\Models\ProductClass;

class DetectedObjectController extends Controller
{
    //Get all detected objects function
    public function getDetected(){
        return response()->json(DetectedObject::all(), 200);
    }

    //Get detected object by ID function
    public function getDetectedById($id){
        $detected = DetectedObject::find($id);
        if (is_null($detected)) {
            return response()->json(['message' => 'Detected Object Not Found'], 404);
        }
        return response()->json($detected::find($id), 200);
    }

    //Add new detected object function
    public function addDetected(Request $request, $id){
        // $detected = DetectedObject::create($request->all());

        $request = \Request::all();
        $bBox = BoundingBox::find($id);
        if (is_null($bBox)) {
            return response()->json(['message' => 'Bounding Box Not Found'], 404);
        }
        if (isset($request['detected'])) {
            foreach($request['detected'] as $detectedObject){
                $detected = new DetectedObject();
                $productClass = ProductClass::find($detectedObject['class_id']);
                if (is_null($productClass)){
                    return response()->json(['message' => 'Product Class Not Found'], 404);
                }
                $detected->class_id = $detectedObject['class_id'];
                $detected->algorithm_name = $detectedObject['algorithm_name'];
                $detected->probability = $detectedObject['probability'];
                $detected->priority = $detectedObject['priority'];
                $detected->bounding_box_id = $bBox->id;
                $detected->save();
            }
        }

        return response($detected, 201);
    }

    //Update detected object function
    public function updateDetected(Request $request, $id){
        $detected = DetectedObject::find($id);
        if (is_null($detected)) {
            return response()->json(['message' => 'Detected Object Not Found'], 404);
        }
        $detected->update($request->all());
        return response($detected, 200);
    }

    //Get detected object by Bbox function
    public function getDetectedByBbox($id){
        $detected = DetectedObject::where('bounding_box_id', $id)->get();
        return response()->json($detected);
    }

    //Delete detected object function
    public function deleteDetected($id){
        $detected = DetectedObject::find($id);
        if (is_null($detected)) {
            return response()->json(['message' => 'Detected Object Not Found'], 404);
        }
        $detected->delete();
        return response()->json(null, 204);
    }
}
