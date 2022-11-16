import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { algoResults } from '../algo-results';
import { appServiceService } from '../app-service.service';

@Component({
  selector: 'app-algo-results',
  templateUrl: './algo-results.component.html',
  styleUrls: ['./algo-results.component.css']
})
export class algoResultsComponent implements OnInit {

  algoResults: algoResults[] = []
  algoResult: algoResults = new algoResults();

  constructor(private _service: appServiceService,
              private _router: Router) { }

  ngOnInit(): void {
    // this.getAlgoResutls();
  }

  // private getAlgoResutls(){
  //   this._service.viewAlgoResults().subscribe(data =>{
  //     this.algoResults = data
  //   })
  // }

  // updateAlgoResults(id: number){
  //   this._service.getAlgoResultsById(id).subscribe(data =>{
  //     this.algoResult = data
  //   });
  //   this._router.navigate(['update-algo-results', id]);
  //   this._service.updateAlgoResults(id, this.algoResult);
  // }

  // deleteAlgoResults(id: number){
  //   this._service.deleteAlgoResutls(id).subscribe(data =>{
  //     console.log(data);
  //     this.getAlgoResutls();
  //   })

  // }

}
