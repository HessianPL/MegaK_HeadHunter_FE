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
export interface StudentCVData {
    id: string,
    email: string,
    tel: string,
    firstName: string,
    lastName: string,
    githubUsername: string,
    portfolioUrls: string[],
    projectUrls: string[],
    bio?: string,
    expectedTypeWork: ExpectedWorkType,
    targetWorkCity?: string,
    expectedContractType: ExpectedContractType,
    expectedSalary?: number,
    canTakeApprenticeship: boolean,
    monthsOfCommercialExp: number,
    education?: string,
    workExperience: string,
    courses?: string,
}