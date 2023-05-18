
export interface AvailableStudentData {
    id: string;
    fullName: string;
    expiresAt?:string;
    firstName?:string;
    lastName?:string;
    githubUsername?:string;
    courseCompletion: string;
    courseEngagement: string;
    projectDegree: string;
    teamProjectDegree: string;
    expectedTypeWork:string;
    targetWorkCity: string;
    expectedContractType: string;
    expectedSalary: number;
    canTakeApprenticeship: boolean;
    monthsOfCommercialExp: number;
}

export interface StudentCvResponse {
    firstName: string;
    lastName: string;
    bio?: string;
    githubUsername: string;
    courseCompletion: string;
    courseEngagement: string;
    projectDegree: string;
    teamProjectDegree: string;
    portfolioUrls?: string[];
    projectUrls?: string[];
    bonusProjectUrls: string[];
    expectedTypeWork: ExpectedWorkType;
    targetWorkCity?: string;
    expectedContractType: ExpectedContractType;
    expectedSalary?: number;
    canTakeApprenticeship: boolean;
    monthsOfCommercialExp: number;
    education?: string;
    workExperience?: string;
}
export enum ExpectedWorkType {
    Static = 'Na miejscu',
    CanMoveOut = 'Gotowość do przeprowadzki',
    RemoteOnly = 'Wyłącznie zdalnie',
    Hybrid = 'Hybrydowo',
    Any = 'Bez znaczenia',
}

export enum ExpectedContractType {
    UoPOnly = 'Tylko UoP',
    B2B = 'Możliwe B2B',
    UZorUOD = 'Możliwe UZ/UOD',
    Any = 'Brak preferencji',
}
export enum StudentStatus {
    Available = 'Dostępny',
    DuringRecruitment = 'W trakcie rozmowy',
    Hired = 'Zatrudniony',
}
