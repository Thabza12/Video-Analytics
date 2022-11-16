<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductClass;

class ProductClassController extends Controller
{
    //Get all product classes function
    public function getProductClasses(){
        return response()->json(ProductClass::all(), 200);
    }

    //Get product class by ID function
    public function getProductClassById($id){
        $productClass = ProductClass::find($id);
        if (is_null($productClass)) {
            return response()->json(['message' => 'Product Class Not Found'], 404);
        }
        return response()->json($productClass::find($id), 200);
    }

    //Add new product class function
    public function addProductClass(Request $request){
        $productClass = ProductClass::create($request->all());
        return response($productClass, 201);
    }

    //Update product class function
    public function updateProductClass(Request $request, $id){
        $productClass = ProductClass::find($id);
        if (is_null($productClass)) {
            return response()->json(['message' => 'Product Class Not Found'], 404);
        }
        $productClass->update($request->all());
        return response($productClass, 200);
    }

    //Delete product class function
    public function deleteProductClass($id){
        $productClass = ProductClass::find($id);
        if (is_null($productClass)) {
            return response()->json(['message' => 'Product Class Not Found'], 404);
        }
        $productClass->delete();
        return response()->json(null, 204);
    }
}
