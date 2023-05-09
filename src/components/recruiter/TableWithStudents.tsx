import {AvailableStudentData} from "../../types-fe/student-lists";
import {RowStudent} from "./RowStudent";
import Accordion from 'react-bootstrap/Accordion';

interface Props {
    list: AvailableStudentData[],
    onStudentChange: () => void;
}

export const TableWithStudents = (props: Props)=> {
    return (
        <Accordion defaultActiveKey={['0']} alwaysOpen>
            {
                props.list.map((el, index) => (
                            <RowStudent
                                key={el.id}
                                keyOnItem={index+''}
                                student={el}
                                onStudentChange={props.onStudentChange}
                            />
                        )
                )
            }
        </Accordion>
    )
}
