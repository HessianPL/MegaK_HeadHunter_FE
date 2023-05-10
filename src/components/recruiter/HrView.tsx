import {ListOfStudents} from "./ListOfStudents";
import "./HrView.css"
import {useEffect, useState} from "react";
import {AvailableStudentData} from "../../types-fe/student-lists";
import {apiUrl} from "../../config/api";
import {Spinner} from "../common/Spinner/Spinner";
import {SearchAndFilterBar} from "./SearchAndFilterBar";

export const HrView = () => {
    const [list, setList] = useState<AvailableStudentData[] | null>(null);
    const [kindOfList, setKindOfList] = useState<string>("ALL");

    const refreshListOfStudents = async () => {

        if (kindOfList ==="ALL") {
            try {
                setList(null);

                const res = await fetch(`${apiUrl}/user/available`, {
                    credentials: 'include',
                });
                const data = await res.json();
                setList(data);
            } finally {

            }
        }else {
            try {
                // setList(null);
                // const res = await fetch(`${apiUrl}/user/reserved-students`, {
                //     credentials: 'include',
                // });
                // const data = await res.json();
                // console.log(data)
                // setList(data);

            } finally {

            }
        }
    };

    useEffect(() => {
        refreshListOfStudents();
    }, [kindOfList]);

    if (list === null) {
        return <Spinner/>;
    }

    return <>
        <div className="col-lg-10 col-12 px-4 theme-bg-dark-1 mx-auto ">
            <button onClick={()=>setKindOfList("ALL")}>Lista All</button>
            <button onClick={()=>setKindOfList("ForThisHR")}>Lista do rozmowy</button>
            <SearchAndFilterBar/>
            <ListOfStudents list={list} kindOfList={kindOfList} onStudentChange={refreshListOfStudents} />
        </div>
    </>
}

