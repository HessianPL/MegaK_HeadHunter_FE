import { ExpectedContractType, ExpectedWorkType, StudentEntity } from "./student-entity";

export interface FilterForm {
	canTakeApprenticeship: string | undefined,
	courseCompletion: string | undefined,
	courseEngagement: string | undefined,
	expectedContractType: ExpectedContractType | undefined,
	expectedTypeWork: ExpectedWorkType | undefined,
	monthsOfCommercialExp: number | undefined,
	projectDegree: string | undefined,
	teamProjectDegree: string | undefined;
	minExpectedSalary: number | undefined;
	maxExpectedSalary: number | undefined;
}

