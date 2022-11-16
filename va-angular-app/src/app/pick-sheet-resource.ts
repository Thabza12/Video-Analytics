import { pickSheetDetailsRequest } from "./pick-sheet-details-request";

export class pickSheetResource {
    pick_sheet_number!: string;
    shipment_number!: string;
    pick_sheet_date!: Date;
    delivery_date!: Date;
    routeID!: string;
    bay!: number;
    bin!: number;
    quantity!: number;
    // details!: pickSheetDetailsRequest;
}
