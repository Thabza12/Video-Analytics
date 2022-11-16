import { Time } from "@angular/common";
import { algoResultsRequest } from "./algo-results-request";
import { pickSheetDetailsRequest } from "./pick-sheet-details-request";

export class uploadResource {
    pickSheetID!: number;
    pickSheetNumber!: string;
    shipmentNumber!: string;
    pickSheetDate!: Date;
    deliveryDate!: Date;
    routeID!: string;
    bay!: number;
    bin!: number;
    quantity!: number;
    pickSheetDetailsRequest!: pickSheetDetailsRequest;
    videoFile!: string;
    recordDate!: Date;
    startTime!: Time;
    endTime!: Time;
    algoResultsArray!: algoResultsRequest;
     
}
