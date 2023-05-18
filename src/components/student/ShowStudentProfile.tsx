import {StudentCvResponse, StudentStatus} from "../../types-fe/student-lists";
import {StudentEntity} from "../../types-fe/student-entity";
import {useContext} from "react";
import {UserContext} from "../../contexts/user-context";
import {Link} from "react-router-dom";
import {apiUrl} from "../../config/api";
import {toast} from "react-toastify";

interface Props {
    student:StudentEntity
}

export const ShowStudentProfile= (props:Props) => {
    const {student} = props;
    const {role, id} = useContext(UserContext);

    const changeStatusOfTheStudent = async (e: React.MouseEvent<Element, MouseEvent>, status: string) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiUrl}/user/change-student-status`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    studentId: props.student.id,
                    status: status,
                })
            });
            toast.success(`Student zmienił status na:"${status}"` );

        } finally {

        }
    };

    return <>
        <div className="row m-3">
            <div className="col-lg-3 col-12 px-4 theme-bg-dark-1">
                <div className="theme-bg-dark-1 border-0">
                    <img
                        src={student.githubUsername ? `https://github.com/${student.githubUsername}.png` : "/defaultAvatar.jpg"}
                        alt="awatar kursanta/ki"
                        className="img-fluid rounded-circle mx-auto d-block my-5 w-50"
                    />
                    <div className="text-center mb-4">
                        <h1 className="fs-3">{student.firstName} {student.lastName}</h1>
                        <p><a href={`https://github.com/${student.githubUsername}`} target="_blank"><i className="bi bi-github"/> {student.githubUsername}</a></p>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="row">
                        <div className="col-1 mb-2"><i className="bi bi-telephone-fill theme-text-dark-0"/></div>
                        <div className="col-10 mb-2">{`+48 ${student.tel?.slice(0, 3)} ${student.tel?.slice(3, 6)} ${student.tel?.slice(6)}`}</div>
                    </div>
                    <div className="row">
                        <div className="col-1"><i className="bi bi-envelope-fill theme-text-dark-0"/></div>
                        <div className="col-10">{student.email}</div>
                    </div>
                </div>
                <div className="mb-5">
                    <h2 className="theme-text-dark-0 fs-6">O mnie</h2>
                    <p className="lh-lg">{student?.bio}</p>
                </div>
                <div>
                    {role === 'HR'
                        ? <button
                            className="btn theme-btn-mainbrand w-100 py-2 mb-2"
                            onClick={e=>changeStatusOfTheStudent(e, StudentStatus.Available)}
                        >
                            Brak zainteresowania
                    </button>
                        : null}
                    <button
                        className="btn theme-btn-mainbrand w-100 py-2 mb-2"
                        onClick={e=>changeStatusOfTheStudent(e, StudentStatus.Hired)}
                    >
                        Zatrudniony
                    </button>
                    {role === 'Student'
                        ? <Link to={'/student/edit'} className="btn theme-btn-mainbrand w-100 py-2 mb-2">Edytuj profil</Link>
                        : null}
                </div>
            </div>

            <div className="col-lg-9 col-12 theme-bg-dark-2">

                {/*oceny*/}
                <section>
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Oceny</h2>
                    <div className="pt-3 px-4 pb-4">

                        <div className="row theme-text-medium-light">
                            <div className="col-3">
                                <div>Ocena przejścia kursu</div>
                            </div>
                            <div className="col-3">
                                <div>Ocena aktywności i zaangażowania na kursie</div>
                            </div>
                            <div className="col-3">
                                <div>Ocena kodu w projekcie własnym</div>
                            </div>
                            <div className="col-3">
                                <div>Ocena pracy w zespole Scrum</div>
                            </div>
                        </div>

                        <div className="row mt-4">
                            <div className="col-3">
                                <div className="row">
                                    <div className="col-3">
                                        <strong>{student?.courseCompletion}</strong> <span className="theme-text-medium-light">/ 5</span>
                                    </div>
                                    <div className="col-9">
                                        <i className={Number(student.courseCompletion) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseCompletion) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseCompletion) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseCompletion) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseCompletion) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row">
                                    <div className="col-3">
                                        <strong>{student?.courseEngagement}</strong> <span className="theme-text-medium-light">/ 5</span>
                                    </div>
                                    <div className="col-9">
                                        <i className={Number(student.courseEngagement) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseEngagement) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseEngagement) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseEngagement) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.courseEngagement) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row">
                                    <div className="col-3">
                                        <strong>{student?.projectDegree}</strong> <span className="theme-text-medium-light">/ 5</span>
                                    </div>
                                    <div className="col-9">
                                        <i className={Number(student.projectDegree) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.projectDegree) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.projectDegree) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.projectDegree) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.projectDegree) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="row">
                                    <div className="col-3">
                                        <strong>{student?.teamProjectDegree}</strong> <span className="theme-text-medium-light">/ 5</span>
                                    </div>
                                    <div className="col-9">
                                        <i className={Number(student.teamProjectDegree) >= 1 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.teamProjectDegree) >= 2 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.teamProjectDegree) >= 3 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.teamProjectDegree) >= 4 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                        <i className={Number(student.teamProjectDegree) >= 5 ? `bi bi-star-fill me-1  theme-text-mainbrand` : `bi bi-star-fill me-1  theme-text-dark-0`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*oczekiwania*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Oczekiwania w stosunku do zatrudnienia</h2>
                    <div className="pt-3 px-4 pb-4">
                        <div className="row theme-text-medium-light">
                            <div className="col-2 theme-border-dark-2">
                                Preferowane miejsce pracy
                            </div>
                            <div className="col-2 theme-border-dark-2">
                                Docelowe miasto, w którym chce pracować kandydat
                            </div>
                            <div className="col-2 theme-border-dark-2">
                                Oczekiwany typ umowy
                            </div>
                            <div className="col-2 theme-border-dark-2">
                                Oczekiwane wynagrodzenie miesięczne netto
                            </div>
                            <div className="col-2 theme-border-dark-2">
                                Zgoda na odbycie bezpłatnych praktyk/stażu na początek
                            </div>
                            <div className="col-2">
                                Komercyjne doświadczenie w programowaniu
                            </div>
                        </div>
                        <div className="row fw-bold">
                            <div className="col-2 theme-border-dark-2 pt-3">
                                {student?.expectedTypeWork}
                            </div>
                            <div className="col-2 theme-border-dark-2 pt-3">
                                {student?.targetWorkCity}
                            </div>
                            <div className="col-2 theme-border-dark-2 pt-3">
                                {student?.expectedContractType}
                            </div>
                            <div className="col-2 theme-border-dark-2 pt-3">
                                {student?.expectedSalary ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN'}).format(student?.expectedSalary) : null}
                            </div>
                            <div className="col-2 theme-border-dark-2 pt-3">
                                {student?.canTakeApprenticeship ? 'TAK' : 'NIE'}
                            </div>
                            <div className="col-2 pt-3">
                                Liczba miesięcy: {student?.monthsOfCommercialExp}
                            </div>
                        </div>
                    </div>

                </section>
                {/*edu*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Edukacja</h2>
                    <div className="pt-3 px-4 pb-4"><pre>{student?.education}</pre></div>
                </section>
                {/*kursy*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Kursy</h2>
                    <div className="pt-3 px-4 pb-4"><pre>{student?.courses}</pre></div>
                </section>
                {/*doświadczenie*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Doświadczenie zawodowe</h2>
                    <div className="pt-3 px-4 pb-4"><pre>{student?.workExperience}</pre></div>
                </section>
                {/*portfolio*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Portfolio</h2>
                    <div className="pt-3 px-4 pb-4">
                        {student?.portfolioUrls?.map((el, i) => <p key={i} className="mb-1 align-middle"><a href={el} target="_blank"><i className="bi bi-paperclip fs-3 align-middle"/> {el}</a></p>)}
                    </div>
                </section>
                {/*projekt w zespole Scrumowym*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Projekt w zespole Scrumowym</h2>
                    <div className="pt-3 px-4 pb-4">
                        {student?.bonusProjectUrls.map((el, i) => <p key={i} className="mb-1 align-middle"><a href={el} target="_blank"><i className="bi bi-paperclip fs-3 align-middle"/> {el}</a></p>)}
                    </div>
                </section>
                {/*projekt indywidualny*/}
                <section className="mb-4">
                    <h2 className="theme-bg-dark-1 fs-4 py-3 ps-4">Projekt na zaliczenie</h2>
                    <div className="pt-3 px-4 pb-4">
                        {student?.projectUrls?.map((el, i) => <p key={i} className="mb-1 align-middle"><a href={el} target="_blank"><i className="bi bi-paperclip fs-3 align-middle"/> {el}</a></p>)}
                    </div>
                </section>
            </div>
        </div>
    </>
}
