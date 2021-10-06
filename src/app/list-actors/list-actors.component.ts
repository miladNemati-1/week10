import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../database.service";

@Component({
	selector: "app-list-actors",
	templateUrl: "./list-actors.component.html",
	styleUrls: ["./list-actors.component.css"],
})
export class ListActorsComponent implements OnInit {
	actorsDB: any[] = [];

	constructor(private dbService: DatabaseService) {}

	onGetActors() {
		this.dbService.getActors().subscribe((data: any) => {
			this.actorsDB = data;
		});
	}
	ngOnInit(): void {
		this.onGetActors();
	}
}
