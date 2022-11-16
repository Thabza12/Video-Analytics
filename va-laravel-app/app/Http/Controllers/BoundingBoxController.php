<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BoundingBox;
use App\Models\Video;

class BoundingBoxController extends Controller
{
    //Get boundingBox by frame
    public function getBoundingBoxByFrame($id){
        $BBoxes = BoundingBox::where('frame_id', $id)->get();
        return response()->json($BBoxes);
    }

    //Get boundingBox by foreign key function
    public function getBoundingBoxByVideo($id){
        $BBoxes = BoundingBox::where('video_id', $id)->get();
        return response()->json($BBoxes);
    }

    //Add new boundingBox function
    public function addBoundingBox(Request $request, $id){

        $request = \Request::all();
        $video = Video::find($id);
        if (is_null($video)) {
            return response()->json(['message' => 'Video Not Found'], 404);
        }
        
        if (isset($request['Bbox'])) {
            foreach($request['Bbox'] as $boundingBox){
                $bBox = new BoundingBox();
                $bBox->x_coordinate = $boundingBox['x_coordinate'];
                $bBox->y_coordinate = $boundingBox['y_coordinate'];
                $bBox->width  = $boundingBox['width'];
                $bBox->height = $boundingBox['height'];
                $bBox->frame_id = $boundingBox['frame_id'];
                $bBox->video_id = $video->id;
                $bBox->save();
            }
        }
        // dd($pickSheet);

        return response($bBox, 201);
    }
}
