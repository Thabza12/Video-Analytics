<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;
use App\Models\PickSheet;

class VideoController extends Controller
{
    //Get all videos function
    public function getVideos(){
        return response()->json(Video::all(), 200);
    }

    //Get video by ID function
    public function getVideoById($id){
        $video = Video::find($id);
        if (is_null($video)) {
            return response()->json(['message' => 'Video Not Found'], 404);
        }
        return response()->json($video::find($id), 200);
    }

    //Add new video function
    public function addVideo(Request $request){
        $video = Video::create($request->all());
        return response($video, 201);
    }

    //Update video function
    public function updateVideo(Request $request, $id){
        $video = Video::find($id);
        if (is_null($video)) {
            return response()->json(['message' => 'Video Not Found'], 404);
        }
        $video->update($request->all());
        return response($video, 200);
    }

    //Delete video function
    public function deleteVideo($id){
        $video = Video::find($id);
        if (is_null($video)) {
            return response()->json(['message' => 'Video Not Found'], 404);
        }
        $video->delete();
        return response()->json(null, 204);
    }
}
