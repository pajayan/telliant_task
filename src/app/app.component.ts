import { Component, Pipe, PipeTransform } from '@angular/core';
import { TableData } from './tabledata';

@Pipe({name: 'filterPipe', pure: false})
export class MyPipe implements PipeTransform {
    transform(values: any, args?: any[]): any[] {
      return values = values.filter(a => {
        console.log('values from pipe', values);
        return args.length ? args.indexOf(a.status) == -1 : values;
      })      
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
  filterArr = [];
  tabledata = [];
  originalTabledata = [];
  statusFilterArray = [];
  thArray :number[] = [];
  thFilter = 0;
  thValue = 0;

  ngOnInit(): void {
    this.tabledata = TableData;
    this.originalTabledata = TableData;
    for (let i = 1; i <= 32; i++) {
      this.thArray.push(i);
    }
  }
  updateFilter(appt) {
    if(appt.checked) {
      console.log(appt);
      this.filterArr.push(appt.status);
    }
    else {
      let index = this.filterArr.indexOf(appt.status)
      this.filterArr.splice(index, 1)
    }
  } 
  changed(e) {
    const checked = e.target.checked;
    const type = e.target.type;
    const value  = e.target.value;
    if(type === 'checkbox') {
      if(checked) {
        if(value === 'All') {
          this.statusFilterArray = [];
          this.thFilter = 0;
          this.thValue = 0;
        } else { 
          this.statusFilterArray.push(value);
          console.log('this.statusFilterArray', this.statusFilterArray);         
        }
      }else {        
        this.statusFilterArray.splice(this.statusFilterArray.indexOf(value), 1);
        console.log('this.statusFilterArray', this.statusFilterArray);
        console.log('value uncheck', value);
      }
    }
    else {
      this.thFilter = value;
    }
    this.filterData(this.statusFilterArray, this.thFilter);
  }

  filterData(filterArray :string[], thFilter: number) {
    this.tabledata =  this.originalTabledata.filter(item => {
      return !filterArray.length ? true : filterArray.includes(item.status);
    });
    this.tabledata =  this.tabledata.filter(item => {
      return thFilter ? item.th === thFilter :  true;
    });
  }

}
