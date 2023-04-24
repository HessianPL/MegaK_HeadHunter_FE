export class StudentsDataDTO {
    constructor(
        public email: string,
        public courseCompletion: boolean,
        public courseEngagement: number,
        public projectDegree: number,
        public teamProjectDegree: number,
        public bonusProjectUrls: string[],
        public isActive: boolean
    ) {}
}