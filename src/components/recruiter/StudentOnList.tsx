import {AvailableStudentData} from "../../types-fe/student-lists";
import {RowStudent} from "./RowStudent";
// import {Table} from "react-bootstrap";

interface Props {
    list: AvailableStudentData[],
    onStudentChange: () => void;
}

export const StudentOnList = (props: Props)=> {

    return (
        <table>
            <tbody>
            {
                props.list.map(el =>(
                    <RowStudent
                        // key={el.student.id}
                        // student={el.student}
                        // onStudentChange={props.onStudentChange}
                    />
                ))
            }
            </tbody>
        </table>
    )
}
