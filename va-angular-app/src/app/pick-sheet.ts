import { video } from "./video";

export class pickSheet {
    id!: number;
    shipment_number!: string;
    pick_sheet_number!: string;
    pick_sheet_date!: Date;
    delivery_date!: Date;
    routeID!: string;
    bay!: number;
    bin!: number;
    quantity!: number;
    deleted!: boolean;
}
