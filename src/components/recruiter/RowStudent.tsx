import {AvailableStudentData} from "../../types-fe/student-lists";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {CustomToggle} from "./CusstomToggle";
import {Col, Container, Row} from "react-bootstrap";
import { toast } from 'react-toastify';
import {apiUrl} from "../../config/api";
import {useState} from "react";

interface Props {
    kindOfList:string,
    keyOnItem: string,
    student: AvailableStudentData,
    onStudentChange: () => void;
}

export const RowStudent = (props: Props) => {
    const [status, setStatus] = useState("W trakcie rozmowy");

    const reservedTheStudent = async (e: React.MouseEvent<Element, MouseEvent>) => {
        e.preventDefault();
        try {
// @TODO do sprawdzenia jak działa
            const res = await fetch(`${apiUrl}/user/change-student-status`, {
                method: 'Patch',
                credentials: 'include',
                body:JSON.stringify({
                    studentId: props.student.id,
                    status: status,
                })
            });
            toast.success(`Student ${props.student.fullName} został dodany do listy.` );
        } finally {

        }
        props.onStudentChange();
    };

    return (
        <>
            <Card className="rounded-0 card">
               <Card.Header className="theme-bg-dark-1 bg-dark-1 border-0 rounded-0">
                  <div>
                      {(props.kindOfList === "ALL") ? (
                          <Row className="justify-content-md-center">
                              <Col xs={9}><p className="fs-5 my-3">{props.student.fullName}</p></Col>
                              <Col xs={2}>
                                  <button
                                      className="ms-auto btn theme-btn-mainbrand my-3"
                                      onClick={reservedTheStudent}
                                  >
                                      Zarezerwuj rozmowę
                                  </button>
                              </Col>
                              <Col xs={1}><CustomToggle eventKey={props.keyOnItem}> </CustomToggle></Col>
                          </Row>
                      ) : (
                          <Row className="justify-content-md-center">
                              <Col xs={1}>
                                  <div>
                                      <p>Rezerwacja do:</p>
                                      <p className="fs-5 my-3">data :)</p>
                                      {/*<p className="fs-5 my-3">{props.student.}</h2>*/}
                                  </div>
                              </Col>
                              <Col xs={6}>
                                  <img
                                      // src={props.student.githubUsername ? `https://github.com/${props.student.githubUsername}.png` : "/defaultAvatar.jpg"}
                                      alt="awatar kursanta/ki"
                                      className="img-fluid rounded-circle mx-auto d-block my-5 w-50"
                                  />
                                  <div className="text-center mb-4">
                                      {/*<p className="fs-5 my-3">{props.student.firstName}
                                       {props.student.lastName}</h1>*/}
                                  </div>
                              </Col>
                              <Col xs={1}>
                                  <button
                                      className="ms-auto btn theme-btn-mainbrand"
                                      onClick={reservedTheStudent}
                                  >
                                      Pokaż CV
                                  </button>
                              </Col>
                              <Col xs={2}>
                                  <button
                                      className="ms-auto btn  theme-btn-mainbrand"
                                      onClick={reservedTheStudent}
                                  >
                                      Brak zainteresowania
                                  </button>
                              </Col>
                              <Col xs={1}>
                                  <button
                                      className="ms-auto btn  theme-btn-mainbrand"
                                      onClick={reservedTheStudent}
                                  >
                                      Zatrudniony
                                  </button>
                              </Col>
                              <Col xs={1}><CustomToggle eventKey={props.keyOnItem}> </CustomToggle></Col>
                          </Row>
                      )
                      }
                  </div>

                </Card.Header>
                 <Accordion.Collapse eventKey={props.keyOnItem} className="theme-bg-dark-2 border-0">
                     <Container  className="theme-bg-dark-1" fluid="true"  >
                         <Row lg={10} >
                             <Col>
                                   <Container className="w-100 p-3 pb-5 SmallContainer">
                                       <Row className="h-75 mb-3" ><Col sm>Ocena przejścia kursu</Col></Row>
                                       <Row><Col sm><span className="fw-bold">{props.student?.projectDegree}</span> / 5</Col></Row>
                                   </Container>
                             </Col>
                             <Col sm>
                                 <Container className="w-100 p-3 pb-5 SmallContainer">
                                     <Row className="h-75 mb-3"><Col sm>Ocena aktywności i zaangażowania na kursie</Col></Row>
                                     <Row><Col sm><span className="fw-bold">{props.student?.courseEngagement}</span> / 5</Col></Row>
                                 </Container>
                             </Col>
                             <Col sm>
                                 <Container className="w-100 p-3 pb-5 SmallContainer">
                                     <Row className="h-75 mb-3"><Col sm>Ocena kodu w projekcie własnym</Col></Row>
                                     <Row><Col sm><span className="fw-bold">{props.student?.projectDegree}</span> / 5</Col></Row>
                                 </Container>
                             </Col>
                             <Col sm>
                                 <Container className="w-100 p-3 pb-5 SmallContainer">
                                     <Row className="h-75 mb-3"><Col sm>Ocena pracy w zespole Scrum</Col></Row>
                                     <Row><Col sm><span className="fw-bold">{props.student?.teamProjectDegree}</span> / 5</Col></Row>
                                 </Container>
                             </Col>
                             <Col sm>
                             <Container className="w-100 p-3 pb-5 SmallContainer">
                                 <Row className="h-75 mb-3"><Col sm>Preferowane miejsce pracy</Col></Row>
                                 <Row><Col sm className="fw-bold">{props.student?.expectedTypeWork}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 pb-5 SmallContainer">
                                 <Row className="h-75 mb-3"><Col sm>Docelowe miasto, gdzie chce pracować kandydat</Col></Row>
                                 <Row><Col sm className="fw-bold">{props.student?.targetWorkCity}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 pb-5 SmallContainer">
                                 <Row className="h-75 mb-3"><Col sm>Oczekiwany typ kontraktu</Col></Row>
                                 <Row><Col sm className="fw-bold">{props.student?.expectedContractType}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 pb-5 SmallContainer">
                                 <Row className="h-75 mb-3"><Col sm>Oczekiwane wynagrodzenie miesięczne netto</Col></Row>
                                 <Row><Col sm className="fw-bold">{props.student?.expectedSalary ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN'}).format(props.student?.expectedSalary) : null}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 pb-5 SmallContainer">
                                 <Row className="h-75 mb-3"><Col sm>Zgoda na odbycie bezpłatnych praktyk/stażu na początek</Col></Row>
                                 <Row><Col sm className="fw-bold">{props.student?.canTakeApprenticeship ? 'TAK' : 'NIE'}</Col></Row>
                             </Container>
                         </Col>
                             <Col sm>
                             <Container className="w-100 p-3 pb-5 SmallContainer">
                                 <Row className="h-75 mb-3"><Col sm>Komercyjne doświaczenie w programowaniu</Col></Row>
                                 <Row><Col sm className="fw-bold">{props.student?.monthsOfCommercialExp} miesięcy</Col></Row>
                             </Container>
                         </Col>
                         </Row>
                     </Container>
                </Accordion.Collapse>
            </Card>
        </>
    )
}
