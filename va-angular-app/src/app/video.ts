import { Time } from "@angular/common";

export class video {
    id!: number;
    video_file!: string;
    record_date!: Date;
    start_time!: Time;
    end_time!: Time;
    deleted!: boolean;
    assigned!: boolean;
}
