import {AvailableStudentData} from "../../types-fe/student-lists";
import { TableWithStudents } from "./TableWithStudents";

interface Props {
    kindOfList: string,
    list: AvailableStudentData[],
    onStudentChange: () => void;
}
export const ListOfStudents = (props:Props) => {

    return <>
                <TableWithStudents kindOfList={props.kindOfList} list={props.list} onStudentChange={props.onStudentChange} />
                <div> liczba elementów ...</div>
    </>
}
