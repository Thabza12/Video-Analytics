<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Container;

class ContainerController extends Controller
{
    //Get all containers function
    public function getContainers(){
        return response()->json(Container::all(), 200);
    }

    //Get container by ID function
    public function getContainerById($id){
        $container = Container::find($id);
        if (is_null($container)) {
            return response()->json(['message' => 'Container Not Found'], 404);
        }
        return response()->json($container::find($id), 200);
    }

    //Add new container function
    public function addContainer(Request $request){
        $container = Container::create($request->all());
        return response($container, 201);
    }

    //Update container function
    public function updateContainer(Request $request, $id){
        $container = Container::find($id);
        if (is_null($container)) {
            return response()->json(['message' => 'Container Not Found'], 404);
        }
        $container->update($request->all());
        return response($container, 200);
    }

    //Delete container function
    public function deleteContainer($id){
        $container = Container::find($id);
        if (is_null($container)) {
            return response()->json(['message' => 'Container Not Found'], 404);
        }
        $container->delete();
        return response()->json(null, 204);
    }
}
