import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SPOpenCVOptions } from './opencv.model';
import { OpencvService, OPEN_CV_CONFIGURATION } from './opencv.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [OpencvService]
})
export class SpOpencvModule {
  static forRoot(config: SPOpenCVOptions): ModuleWithProviders<SpOpencvModule> {
    return {
      ngModule: SpOpencvModule,
      providers: [{ provide: OPEN_CV_CONFIGURATION, useValue: config }]
    };
  }
}