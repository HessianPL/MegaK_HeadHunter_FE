import {useEffect, useState} from "react";
import {Spinner} from "../common/Spinner/Spinner";
import {AvailableStudentData} from "../../types-fe/student-lists";
import {apiUrl} from "../../config/api";
import { TableWithStudents } from "./TableWithStudents";
import {StudentMenu} from "../student/StudentMenu";

export const ListOfStudents = () => {
    const [list, setList] = useState<AvailableStudentData[] | null>(null)

    const refreshListOfStudents = async () => {
        try {
            setList(null);

            const res = await fetch(`${apiUrl}/user/available`, {
                credentials: 'include',
            });
            const data = await res.json();
            setList(data);
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
            <div className="col-lg-10 col-12 px-4 theme-bg-dark-1 mx-auto ">
                <h5> Bedzie tu pasek do zmiany listy </h5>
                <h5>Będzie tu wyszukiwanie/ filtrowanie</h5>
                <TableWithStudents list={list} onStudentChange={refreshListOfStudents} />
                <div> ilość elementów ...</div>
            </div>

        </>)
}
