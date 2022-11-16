import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { afterLoginService } from './after-login.service';
import { algoResultsComponent } from './algo-results/algo-results.component';
import { AppComponent } from './app.component';
import { beforeLoginService } from './before-login.service';
import { employeesComponent } from './employees/employees.component';
import { loginComponent } from './login/login.component';
import { requestRestComponent } from './password/request-rest/request-rest.component';
import { responseRestComponent } from './password/response-rest/response-rest.component';
import { pickSheetDetailsComponent } from './pick-sheet-details/pick-sheet-details.component';
import { pickSheetComponent } from './pick-sheet/pick-sheet.component';
import { sideNavComponent } from './side-nav/side-nav.component';
import { registerComponent } from './register/register.component';
import { updateAlgoResultsComponent } from './update-algo-results/update-algo-results.component';
import { updateEmployeeComponent } from './update-employee/update-employee.component';
import { updatePickSheetDetailsComponent } from './update-pick-sheet-details/update-pick-sheet-details.component';
import { updatePickSheetComponent } from './update-pick-sheet/update-pick-sheet.component';
import { updateVideoResultsComponent } from './update-video-results/update-video-results.component';
import { updateVideoComponent } from './update-video/update-video.component';
import { uploadEmployeeComponent } from './upload-employee/upload-employee.component';
import { uploadPickSheetComponent } from './upload-pick-sheet/upload-pick-sheet.component';
import { uploadResourceComponent } from './upload-resource/upload-resource.component';
import { uploadVideoComponent } from './upload-video/upload-video.component';
import { videoComponent } from './video/video.component';
import { unassignedVideosComponent } from './unassigned-videos/unassigned-videos.component';
import { unassignedPickSheetsComponent } from './unassigned-pick-sheets/unassigned-pick-sheets.component';
import { viewVideoResultsComponent } from './video-results/view-video-results/view-video-results.component';

const routes: Routes = [
  {path: '', component: loginComponent, canActivate: [beforeLoginService]}, 
  {path: 'login', component: loginComponent, canActivate: [beforeLoginService]},
  {path: 'register', component: registerComponent, canActivate: [beforeLoginService]},
  {path: 'upload-resource', component: uploadResourceComponent, canActivate: [afterLoginService]},
  {path: 'upload-video', component: uploadVideoComponent, canActivate: [afterLoginService]},
  {path: 'unassigned', component: unassignedVideosComponent, canActivate: [afterLoginService]},
  {path: 'assign/:id', component: unassignedPickSheetsComponent, canActivate: [afterLoginService]},
  {path: 'upload-pick-sheet', component: uploadPickSheetComponent, canActivate: [afterLoginService]},
  {path: 'pick-sheets', component: pickSheetComponent, canActivate: [afterLoginService]},
  {path: 'pick-sheet-details/:pickSheetID', component: pickSheetDetailsComponent, canActivate: [afterLoginService]},
  {path: 'videos', component: videoComponent, canActivate: [afterLoginService]},
  {path: 'algo-results', component: algoResultsComponent, canActivate: [afterLoginService]},
  {path: 'update-pick-sheet', component: updatePickSheetComponent, canActivate: [afterLoginService]},
  {path: 'update-pick-sheet-details/:id', component: updatePickSheetDetailsComponent, canActivate: [afterLoginService]},
  {path: 'update-videos-results/:id', component: updateVideoResultsComponent, canActivate: [afterLoginService]},
  {path: 'update-algo-results/:id', component: updateAlgoResultsComponent, canActivate: [afterLoginService]},
  {path: 'update-video/:id', component: updateVideoComponent, canActivate: [afterLoginService]},
  {path: 'employees', component: employeesComponent, canActivate: [afterLoginService]},
  {path: 'add-employee', component: uploadEmployeeComponent, canActivate: [afterLoginService]},
  {path: 'update-employee/:id', component: updateEmployeeComponent, canActivate: [afterLoginService]},
  {path: 'request-reset', component: requestRestComponent, canActivate: [beforeLoginService]},
  {path: 'response-reset', component: responseRestComponent, canActivate: [beforeLoginService]},
  {path: 'display/:id/:video_file', component: viewVideoResultsComponent, canActivate: [afterLoginService]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
