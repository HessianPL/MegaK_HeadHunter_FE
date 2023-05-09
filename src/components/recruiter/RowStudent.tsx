import {AvailableStudentData} from "../../types-fe/student-lists";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {CustomToggle} from "./CusstomToggle";
import {Col, Container, Row} from "react-bootstrap";
import { toast } from 'react-toastify';
import {apiUrl} from "../../config/api";

interface Props {
    keyOnItem: string,
    student: AvailableStudentData,
    onStudentChange: () => void;
}

export const RowStudent = (props: Props) => {

    const reservedTheStudent = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        try {
//nie przetestowane @TODO do sprawdzenia jak działa :D
            const res = await fetch(`${apiUrl}/user/change-student-status`, {
                method: 'Patch',
                credentials: 'include',
                body:JSON.stringify({
                    studentId: props.student.id,
                    status:"W trakcie rozmowy"
                })
            });
            toast.success(`Student ${props.student.fullName} został dodany do listy.` );
            // const data = await res.json();
        } finally {

        }
        props.onStudentChange();
    };

    return (
        <>
            <Card>
               <Card.Header className="theme-bg-dark-1 bg-dark-1 border-0">
                  <div>
                   <Row  className="justify-content-md-center">
                       <Col xs={9}><h2>{props.student.fullName}</h2></Col>
                       <Col xs={2}>
                            <button
                                className="ms-auto btn  theme-btn-mainbrand"
                                onClick={reservedTheStudent}
                            >
                                Zarezerwuj rozmowe
                            </button>
                       </Col>
                       <Col xs={1}><CustomToggle eventKey={props.keyOnItem}> </CustomToggle></Col>
                   </Row>
                  </div>

                </Card.Header>
                 <Accordion.Collapse eventKey={props.keyOnItem} className="theme-bg-dark-2 border-0">
                     <Container  className="theme-bg-dark-1" fluid="true"  >
                         <Row lg={10} >
                             <Col>
                                   <Container className="w-100 p-3 SmallContainer">
                                       <Row className="h-75" ><Col sm>Ocena przejścia kursu</Col></Row>
                                       <Row><Col sm> {props.student?.projectDegree}/5</Col></Row>
                                   </Container>
                             </Col>
                             <Col sm>
                                 <Container className="w-100 p-3 SmallContainer">
                                     <Row className="h-75"><Col sm>Ocena aktywnoci i zaangaowania na kursie</Col></Row>
                                     <Row><Col sm> {props.student?.courseEngagement}/5</Col></Row>
                                 </Container>
                             </Col>
                             <Col sm>
                                 <Container className="w-100 p-3 SmallContainer">
                                     <Row className="h-75"><Col sm>Ocena kodu w projekcie własnym</Col></Row>
                                     <Row> <Col sm> {props.student?.projectDegree}/5</Col></Row>
                                 </Container>
                             </Col>
                             <Col sm>
                                 <Container className="w-100 p-3 SmallContainer">
                                     <Row className="h-75"><Col sm>Ocena pracy w zespole Scrum</Col></Row>
                                     <Row><Col sm> {props.student?.teamProjectDegree}/5</Col></Row>
                                 </Container>
                             </Col>
                             <Col sm>
                             <Container className="w-100 p-3 SmallContainer">
                                 <Row className="h-75"><Col sm>Preferowane miejsce pracy</Col></Row>
                                 <Row>   <Col sm>{props.student?.expectedTypeWork}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 SmallContainer">
                                 <Row className="h-75"><Col sm>Docelowe miasto, gdzie chce pracować kandydat</Col></Row>
                                 <Row>  <Col sm>{props.student?.targetWorkCity}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 SmallContainer">
                                 <Row className="h-75"><Col sm>Oczekiwany typ kontraktu</Col></Row>
                                 <Row><Col sm>{props.student?.expectedContractType}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 SmallContainer">
                                 <Row className="h-75"><Col sm>Oczekiwane wynagrodzenie miesięczne netto</Col></Row>
                                 <Row><Col sm>	{props.student?.expectedSalary ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN'}).format(props.student?.expectedSalary) : null}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 SmallContainer">
                                 <Row className="h-75"><Col sm>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</Col></Row>
                                 <Row><Col sm>{props.student?.canTakeApprenticeship ? 'TAK' : 'NIE'}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 SmallContainer">
                                 <Row className="h-75"><Col sm>Komercyjne doświaczenie w programowaniu</Col></Row>
                                 <Row><Col sm>{props.student?.monthsOfCommercialExp} miesięcy</Col></Row>
                             </Container>
                         </Col>
                         </Row>
                     </Container>
                </Accordion.Collapse>
            </Card>
        </>
    )
}
