import {AvailableStudentData} from "../../types-fe/student-lists";
import {apiUrl} from "../../config/api";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {CustomToggle} from "./CusstomToggle";
import {Col, Container, Row} from "react-bootstrap";

interface Props {
    keyOnItem: string,
    student: AvailableStudentData,
    onStudentChange: () => void;
}

export const RowStudent = (props: Props) => {

    const reservedTheStudent = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiUrl}/user/available`, {
                credentials: 'include',
            });
            const data = await res.json();
        } finally {

        }
        props.onStudentChange();
    };

    return (
        <>
            {/*<Accordion.Item eventKey={props.keyOnItem} className="theme-bg-dark-1 bg-dark-1 border-0" >*/}
            <Card>
               <Card.Header className="theme-bg-dark-1 bg-dark-1 border-0">
                 <h3>{props.student.fullName}</h3>
                 <CustomToggle eventKey={props.keyOnItem}>Click me!</CustomToggle>
                   <button type="button" aria-expanded="true" className="accordion-button ">Accordion Item #1</button>
                </Card.Header>
                 <Accordion.Collapse eventKey={props.keyOnItem} className="theme-bg-dark-1 bg-dark-1 border-0">
                     <Card.Body>
                        <Container >
                               <Row  className="justify-content-md-center">
                                   <Col sm>Ocena przejścia kursu</Col>
                                   <Col sm>Ocena aktywnoci i zaangaowania na kursie</Col>
                                   <Col sm>Ocena kodu w projekcie wasnym</Col>
                                   <Col sm>Ocena pracy w zespole Scrum</Col>
                                   <Col sm>Preferowane miejsce pracy</Col>
                                   <Col sm>Docelowe miasto, gdzie chce pracować kandydat</Col>
                                   <Col sm>Oczekiwany typ kontraktu</Col>
                                   <Col sm>Oczekiwane wynagrodzenie miesięczne netto</Col>
                                   <Col sm>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</Col>
                                   <Col sm>Komercyjne doświaczenie w programowaniu</Col>
                               </Row>
                                <Row>
                                   <Col sm> {props.student.projectDegree}/5</Col>
                                   <Col sm> {props.student.courseEngagement}/5</Col>
                                   <Col sm> {props.student.projectDegree}/5</Col>
                                   <Col sm> {props.student.teamProjectDegree}/5</Col>
                                   <Col sm>{props.student.expectedTypeWork}</Col>
                                   <Col sm>{props.student.targetWorkCity}</Col>
                                   <Col sm>{props.student.expectedContractType}</Col>
                                   <Col sm>{props.student.expectedSalary}</Col>
                                   <Col sm>{props.student.canTakeApprenticeship}</Col>
                                   <Col sm>{props.student.monthsOfCommercialExp} miesięcy</Col>
                                </Row>
                               </Container>
                     </Card.Body>
                </Accordion.Collapse>
            </Card>
        {/*</Accordion.Item>*/}
         {/*   */}
         {/*   <Accordion.Item eventKey={props.keyOnItem} className="theme-bg-dark-1 bg-dark-1 border-0" >*/}
         {/*       <div className="accordion-header">{props.student.fullName}*/}
         {/*           <Accordion.Header  >*/}
         {/*       /!*<Container >*!/*/}
         {/*       /!*    <Row  className="justify-content-md-center">*!/*/}
         {/*       /!*        <Col xs={2}>*!/*/}
         {/*                   /!*<button className="ms-auto btn  theme-btn-mainbrand">*!/*/}
         {/*                   /!*    Zarezerwuj rozmowe*!/*/}
         {/*                   /!*</button>*!/*/}
         {/*       /!*        </Col>*!/*/}
         {/*       /!*    </Row>*!/*/}
         {/*       /!*</Container>*!/*/}
         {/*       </Accordion.Header>*/}
         {/*       </div>*/}
         {/*   <Accordion.Body>*/}
         {/*<Container >*/}

         {/*           <Row  className="justify-content-md-center">*/}
         {/*               <Col sm>Ocena przejścia kursu</Col>*/}
         {/*               <Col sm>Ocena aktywnoci i zaangaowania na kursie</Col>*/}
         {/*               <Col sm>Ocena kodu w projekcie wasnym</Col>*/}
         {/*               <Col sm>Ocena pracy w zespole Scrum</Col>*/}
         {/*               <Col sm>Preferowane miejsce pracy</Col>*/}
         {/*               <Col sm>Docelowe miasto, gdzie chce pracować kandydat</Col>*/}
         {/*               <Col sm>Oczekiwany typ kontraktu</Col>*/}
         {/*               <Col sm>Oczekiwane wynagrodzenie miesięczne netto</Col>*/}
         {/*               <Col sm>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</Col>*/}
         {/*               <Col sm>Komercyjne doświaczenie w programowaniu</Col>*/}
         {/*           </Row>*/}
         {/*            <Row>*/}
         {/*               <Col sm> {props.student.projectDegree}/5</Col>*/}
         {/*               <Col sm> {props.student.courseEngagement}/5</Col>*/}
         {/*               <Col sm> {props.student.projectDegree}/5</Col>*/}
         {/*               <Col sm> {props.student.teamProjectDegree}/5</Col>*/}
         {/*               <Col sm>{props.student.expectedTypeWork}</Col>*/}
         {/*               <Col sm>{props.student.targetWorkCity}</Col>*/}
         {/*               <Col sm>{props.student.expectedContractType}</Col>*/}
         {/*               <Col sm>{props.student.expectedSalary}</Col>*/}
         {/*               <Col sm>{props.student.canTakeApprenticeship}</Col>*/}
         {/*               <Col sm>{props.student.monthsOfCommercialExp} miesięcy</Col>*/}
         {/*            </Row>*/}
         {/*           </Container>*/}
         {/*       </Accordion.Body>*/}
         {/*   </Accordion.Item>*/}
        </>
    )
}
