export class StudentsDataDTO {
    email: string;
    courseCompletion: number;
    courseEngagement: number;
    projectDegree: number;
    teamProjectDegree: number;
    bonusProjectUrls: string[];
    isActive: boolean;

    constructor(newStudentData: StudentsDataDTO) {
        this.email = newStudentData.email;
        this.courseCompletion = newStudentData.courseCompletion;
        this.courseEngagement = newStudentData.courseEngagement;
        this.projectDegree = newStudentData.projectDegree;
        this.teamProjectDegree = newStudentData.teamProjectDegree;
        this.bonusProjectUrls = newStudentData.bonusProjectUrls;
        this.isActive = newStudentData.isActive;
    }

    static getRequiredFields() {
        return ['email', 'courseCompletion', 'courseEngagement',
            'projectDegree', 'teamProjectDegree', 'bonusProjectUrls'];
    }
}