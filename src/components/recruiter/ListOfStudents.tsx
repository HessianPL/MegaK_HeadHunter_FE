import {OneStudentOnList} from "./OneStudentOnList";
import {useEffect, useState} from "react";
import {Spinner} from "../common/Spinner/Spinner";
import {AvailableStudentData} from "../../types-fe/student-lists";

const fakeStudent: AvailableStudentData= {

    fullName: "Jan K.",
    courseCompletion: "5",
    courseEngagement: "3",
    projectDegree: "5",
    teamProjectDegree: "4",
    expectedTypeWork: 'Wyłącznie zdalnie',
    targetWorkCity: "Warszawa",
    expectedContractType: "Możliwe B2B",
    expectedSalary:20000,
    canTakeApprenticeship: true,
    monthsOfCommercialExp: 2,
}

const ListOfFakeStudent = [fakeStudent, fakeStudent]

export const ListOfStudents = () => {
    const [list, SetList] = useState<AvailableStudentData[] | null>(ListOfFakeStudent)


    const refreshListOfStudents = async () => {
        try {
            // SetListOfStudents(null);

            //fetch()


        } finally {

        }
    };

    useEffect(() => {
        refreshListOfStudents();
    }, []);

    if (list === null) {
        return <Spinner/>;
    }

    return (
        <>
            <h2>Butony do zmiany widoku </h2>
            <h2>Wyszukiwanie</h2>
            <OneStudentOnList list={list} onStudentChange={refreshListOfStudents}/>
        </>)
}
