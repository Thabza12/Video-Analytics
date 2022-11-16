import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { pickSheetComponent } from './pick-sheet/pick-sheet.component';
import { pickSheetDetailsComponent } from './pick-sheet-details/pick-sheet-details.component';
import { videoComponent } from './video/video.component';
import { algoResultsComponent } from './algo-results/algo-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { uploadResourceComponent } from './upload-resource/upload-resource.component';
import { updatePickSheetComponent } from './update-pick-sheet/update-pick-sheet.component';
import { updatePickSheetDetailsComponent } from './update-pick-sheet-details/update-pick-sheet-details.component';
import { updateVideoComponent } from './update-video/update-video.component';
import { updateVideoResultsComponent } from './update-video-results/update-video-results.component';
import { updateAlgoResultsComponent } from './update-algo-results/update-algo-results.component';
import { uploadPickSheetComponent } from './upload-pick-sheet/upload-pick-sheet.component';
import { uploadVideoComponent } from './upload-video/upload-video.component';
import { headerFooterComponent } from './header-footer/header-footer.component';
import { employeesComponent } from './employees/employees.component';
import { uploadEmployeeComponent } from './upload-employee/upload-employee.component';
import { updateEmployeeComponent } from './update-employee/update-employee.component';
import { loginComponent } from './login/login.component';
import { registerComponent } from './register/register.component';
import { sideNavComponent } from './side-nav/side-nav.component';
import { requestRestComponent } from './password/request-rest/request-rest.component';
import { responseRestComponent } from './password/response-rest/response-rest.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from "ngx-pagination";
import { uploadPickSheetDetailsComponent } from './upload-pick-sheet-details/upload-pick-sheet-details.component';
import { unassignedVideosComponent } from './unassigned-videos/unassigned-videos.component';
import { unassignedPickSheetsComponent } from './unassigned-pick-sheets/unassigned-pick-sheets.component';
import { playerComponent } from './video-results/player/player.component';
import { canvasViewComponent } from './video-results/canvas-view/canvas-view.component';
import { SpOpencvModule } from './video-results/opencv/opencv.module';
import { SPOpenCVOptions } from './video-results/opencv/opencv.model';
import { viewVideoResultsComponent } from './video-results/view-video-results/view-video-results.component';

const openCVConfig: SPOpenCVOptions = {
  scriptUrl: `assets/opencv/opencv.js`,
  wasmBinaryFile: 'wasm/opencv_js.wasm',
  usingWasm: true
};

@NgModule({
  declarations: [
    AppComponent,
    pickSheetComponent,
    pickSheetDetailsComponent,
    videoComponent,
    algoResultsComponent,
    uploadResourceComponent,
    updatePickSheetComponent,
    updatePickSheetDetailsComponent,
    updateVideoComponent,
    updateVideoResultsComponent,
    updateAlgoResultsComponent,
    uploadPickSheetComponent,
    uploadVideoComponent,
    headerFooterComponent,
    employeesComponent,
    uploadEmployeeComponent,
    updateEmployeeComponent,
    loginComponent,
    registerComponent,
    sideNavComponent,
    requestRestComponent,
    responseRestComponent,
    uploadPickSheetDetailsComponent,
    unassignedVideosComponent,
    unassignedPickSheetsComponent,
    playerComponent,
    canvasViewComponent,
    viewVideoResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SnotifyModule,
    MatTreeModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule,
    SpOpencvModule.forRoot(openCVConfig),
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
