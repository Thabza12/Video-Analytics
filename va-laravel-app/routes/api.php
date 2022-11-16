<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\PickSheetController;
use App\Http\Controllers\PickSheetDetailsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContainerController;
use App\Http\Controllers\DetectedObjectController;
use App\Http\Controllers\ProductClassController;
use App\Http\Controllers\BoundingBoxController;
use App\Http\Controllers\ChangePasswordController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Middleware\CORS;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', [AuthController::class, 'login'])->middleware([CORS::class]);
    Route::post('register', [AuthController::class, 'register'])->middleware([CORS::class]);
    Route::post('logout', [AuthController::class, 'logout'])->middleware([CORS::class]);
    Route::post('refresh',[AuthController::class, 'refresh'])->middleware([CORS::class]);
    Route::post('me', [AuthController::class, 'me'])->middleware([CORS::class]);
    Route::post('resetPassword', [ResetPasswordController::class, 'sendEmail'])->middleware([CORS::class]);
    Route::post('newPassword', [ChangePasswordController::class, 'process'])->middleware([CORS::class]);
    

});

//Get all employees
Route::get('employees', [EmployeeController::class, 'getEmployee']);

//Get by id
Route::get('employee/{id}', [EmployeeController::class, 'getEmployeeById']);

//Add new Employee
Route::post('addEmployee', [EmployeeController::class, 'addEmployee']);

//Update employee
Route::put('updateEmployee/{id}', [EmployeeController::class, 'updateEmployee']);

//Delete employee
Route::delete('deleteEmployee/{id}', [EmployeeController::class, 'deleteEmployee']);


//Get all videos
Route::get('videos', [VideoController::class, 'getVideos']);

//Get video by ID
Route::get('video/{id}', [VideoController::class, 'getVideoById']);

//Add new video
Route::post('addVideo', [VideoController::class, 'addVideo']);

//Update video
Route::put('updateVideo/{id}', [VideoController::class, 'updateVideo']);

//Delete video
Route::delete('deleteVideo/{id}', [VideoController::class, 'deleteVideo']);


//Get all pickSheets
Route::get('pickSheets', [PickSheetController::class, 'getPickSheets']);

//Get pickSheet by Id
Route::get('pickSheet/{id}', [PickSheetController::class, 'getPickSheetById']);

//Add new pickSheet
Route::post('addPickSheet', [PickSheetController::class, 'addPickSheet']);

//Unassigned query 
Route::get('unassigned', [PickSheetController::class, 'unassigned']);

//Assign video to pickSheet
Route::put('assign/{id}/pickSheet/{pick_sheet_id}', [PickSheetController::class, 'assign']);

//Update pickSheet
Route::put('updatePickSheet/{id}', [PickSheetController::class, 'updatePickSheet']);

//Delete pickSheet
Route::delete('deletePickSheet/{id}', [PickSheetController::class, 'deletePickSheet']);


//Get all pickSheetDetails
Route::get('pickSheetDetails', [PickSheetDetailsController::class, 'getDetails']);

//Get pickSheetDetails by Id
Route::get('pickSheetDetails/{id}', [PickSheetDetailsController::class, 'getDetailsById']);

//Get pickSheetDetails by foreign key
Route::get('detailsByPickSheet/{id}', [PickSheetDetailsController::class, 'getDetailsByPickSheet']);

//Update pickSheetDetails
Route::put('updatePickSheetDetails/{id}', [PickSheetDetailsController::class, 'updateDetails']);

//Delete pickSheet
Route::delete('deletePickSheetDetails/{id}', [PickSheetDetailsController::class, 'deleteDetails']);


//Get boundingBox by frame
Route::get('boundingBoxByFrame/{id}', [BoundingBoxController::class, 'getBoundingBoxByFrame']);

//Get boundingBox by foreign key
Route::get('boundingBoxByVideo/{id}', [BoundingBoxController::class, 'getBoundingBoxByVideo']);

//Ger boundingboxes
Route:: get('boundingBoxes', [BoundingBoxController::class, 'getBoundingBoxes']);

//Add boundingBoxes
Route::post('addBoundingBox/{id}', [BoundingBoxController::class, 'addBoundingBox']);


//Get all detected objects
Route::get('detected', [DetectedObjectController::class, 'getDetected']);

//Get by id
Route::get('detected/{id}', [DetectedObjectController::class, 'getDetectedById']);

//Get detected object by foreign key
Route::get('detectedByBbox/{id}', [DetectedObjectController::class, 'getDetectedByBbox']);

//Add new detected object
Route::post('addDetected/{id}', [DetectedObjectController::class, 'addDetected']);

//Update detected object
Route::put('updateDetected/{id}', [DetectedObjectController::class, 'updateDetected']);

//Delete detected object
Route::delete('deleteDetected/{id}', [DetectedObjectController::class, 'deleteDetected']);


//Get all product classes
Route::get('classes', [ProductClassController::class, 'getProductClasses']);

//Get by id
Route::get('class/{id}', [ProductClassController::class, 'getProductClassById']);

// //Get product class by foreign key
// Route::get('classByDetected/{id}', [DetectedObjectController::class, 'getClassByDetected']);

//Add new product class
Route::post('addClass', [ProductClassController::class, 'addProductClass']);

//Update product class
Route::put('updateClass/{id}', [ProductClassController::class, 'updateProductClass']);

//Delete product class
Route::delete('deleteClass/{id}', [ProductClassController::class, 'deleteProductClass']);


//Get all containers
Route::get('containers', [ContainerController::class, 'getContainers']);

//Get by id
Route::get('container/{id}', [ContainerController::class, 'getContainerById']);

//Add new container
Route::post('addContainer', [ContainerController::class, 'addContainer']);

//Update container
Route::put('updateContainer/{id}', [ContainerController::class, 'updateContainer']);

//Delete container
Route::delete('deleteContainer/{id}', [ContainerController::class, 'deleteContainer']);