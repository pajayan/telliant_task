import { Component, Pipe, PipeTransform } from '@angular/core';
import { TableData } from './tabledata';
import {IFilterData, ITableData} from './table';

@Pipe({name: 'filterPipe', pure: false})
export class CustomFilterPipe implements PipeTransform {
    transform(values: ITableData[], args?: IFilterData): ITableData[] {
      values = values.filter(a => {
        return args.statusArr.indexOf(a.status) >= 0;
      }); 
      if(args.thValue) {
        values = values.filter(b => {
          return args.thValue ? b.th === args.thValue: true;
        });  
      }
      return values;  
    }
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  allStatuses = [
    {checked:true,status:'All'},
    {checked:true,status:'Accepted'}, 
    {checked:true,status:'Deleted'},
    {checked:true,status:'Referred'},
    {checked:true,status:'Completed'}, 
    {checked:true,status:'Existing'},
    {checked:true,status:'Proposed'}, 
    {checked:true,status:'Unaccepted'}
  ];
  originalTabledata = [];
  thArray :number[] = [];
  filterObj : IFilterData =  {
    statusArr : [],
    thValue: ''
  }

  ngOnInit(): void {
    this.originalTabledata = TableData;
    for (let i = 1; i <= 32; i++) {
      this.thArray.push(i);
    }
    this.filterObj.statusArr = this.allStatuses.filter(s => s.checked).map(j => j.status);
  }

  filterList(item) {
    if(item.checked && item.status == "All") {
      this.allStatuses = this.allStatuses.map(x => {
        return { "status": x.status, "checked": true};
      })
    }
    if(!item.checked && item.status != "All") {
      this.allStatuses[0].checked = false;
    }
    this.filterObj.statusArr = this.allStatuses.filter(s => s.checked).map(j => j.status);
  }

}
