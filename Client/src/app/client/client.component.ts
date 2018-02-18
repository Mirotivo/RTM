import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../shared/services/menu/menu.service';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../shared/models/Category';
import { Subcategory } from '../shared/models/Subcategory';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [MenuService]
})
export class ClientComponent implements OnInit {
  categories : Category[];
  displayedColumns = ['name', 'Small', 'Medium', 'Large'];
  SelectedItems: Order[] = [];
  TotalSum: number = 0;
  
  constructor(private menuService: MenuService, private changeDetectorRefs: ChangeDetectorRef) {
    this.Read();    
  }

  Read() {
    this.menuService.Read().map(res => res.json()).subscribe( (res:any) => { this.categories = res.categories; });    
  }
  ngOnInit() {
  }

  AddItem(element : Subcategory,size: number){
    //Validation
    let previous : Order = this.SelectedItems.find(function(item) { return item.Name == element.Name; })
    if (previous != undefined) {
      previous.Quantity += 1;
      previous.Price = previous.Quantity * previous.UnitPrice;
      this.UpdateTotal();      
      return;
    }
    ///////////
    let ordr: Order = new Order();
    ordr.Name = element.Name;
    ordr.Quantity = 1;
    switch (size)
    {
      case 0:
      ordr.Price = ordr.Quantity * element.Small;
      break;
      case 1:
      ordr.Price = ordr.Quantity * element.Medium;
      break;
      case 2:
      ordr.Price = ordr.Quantity * element.Large;
      break;
    }
    ordr.UnitPrice = ordr.Price;
    this.SelectedItems.push(ordr);
    this.UpdateTotal();
  }
  ChangeQuantity(item :Order,quant:number){
    item.Quantity += quant;
    //Validation
    if ( item.Quantity <= 0)
    {
      this.SelectedItems = this.SelectedItems.filter(function(order : Order) { return order.Name !== item.Name} );
    }
    ///////////
    item.Price = item.Quantity * item.UnitPrice;
    this.UpdateTotal();
  }
  UpdateTotal(){
    this.TotalSum = this.SelectedItems
    .map(function(ordr: Order){ return ordr.Price; })
    .reduce(function(accumulated :number,current :number) { return accumulated + current; }, 0 );
  }
}
export class Order {
  Name: string;
  Quantity: number;
  UnitPrice: number;
  Price: number;
}