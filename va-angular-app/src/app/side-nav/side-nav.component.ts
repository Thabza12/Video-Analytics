import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";

interface GroupComponents{
  name: string;
  children?: GroupComponents[];
}

const Tree: GroupComponents[]=[
  {
    name: "Videos",
    children: [
      { name: "Upload Videos"},
      { name: "View Videos" },
      { name: "Uassigned Videos"},
    ],
  },
  {
    name: "PickSheets",
    children: [
      { name: "Upload PickSheets"},
      { name: "View PickSheets"},
    ],
  },
  {
    name: "Video Results",
    children: [
      { name: "Upload Video Results"},
      { name: "View Video Results" },
      
    ],
  },
  {
    name: "Algorithm Results",
    children: [
      { name: "Upload Algorithm Results"},
      { name: "View Algorithm Results" },
      
    ],
  },
];

interface GroupFlateNode{
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class sideNavComponent implements OnInit {
  private _transformer = (node: GroupComponents, level: number)=> {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<GroupFlateNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(
    this.treeControl, this.treeFlattener
  );

  constructor(private _router: Router) { 
    this.dataSource.data = Tree;
  }

  hasChild = (_: number, node: GroupFlateNode) => node.expandable;

  ngOnInit(): void {
  }

  navigateToPage(name: string){
    if (name === 'View Videos') {
      this._router.navigate(['videos']) 
    }
    if (name === 'Upload Videos') {
      this._router.navigate(['upload-video'])
    }
    if (name === 'View PickSheets') {
      this._router.navigate(['pick-sheets'])
    }
    if (name === 'Upload PickSheets') {
      this._router.navigate(['upload-pick-sheet'])
    }
    if (name === 'View PickSheet Details') {
      this._router.navigate(['pick-sheet-details'])
    }
    if (name === 'Uassigned Videos') {
      this._router.navigate(['unassigned'])
    }
    if (name === 'View Video Results') {
      this._router.navigate(['video-results'])
    }
    if (name === 'Upload Video Results') {
      
    }
    if (name === 'View Algorithm Results') {
      this._router.navigate(['algo-results'])
    }
    if (name === 'Upload Algorithm Results') {
      
    }
  }

}
