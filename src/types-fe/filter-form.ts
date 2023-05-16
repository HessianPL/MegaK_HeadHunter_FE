import { StudentEntity } from "./student-entity";

export interface FilterForm extends Omit<StudentEntity, 'id' | 'email' | 'bonusProjectUrls' | 'tel' | 'firstName' | 'lastName' | 'githubUsername' | 'portfolioUrls' | 'projectUrls' | 'bio' | 'targetWorkCity' | 'education' | 'workExperience' | 'courses' | 'status' | 'expectedSalary'> {
	minExpectedSalary: number;
	maxExpectedSalary: number;
}