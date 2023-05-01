import { useState } from "react";
import { useCSVReader } from 'react-papaparse';

import { StudentsDataDTO } from '../../types-fe/StudentsDataDTO';

export default function ImportCSV() {
    const { CSVReader } = useCSVReader();
    const [students, setStudents] = useState<StudentsDataDTO[] | []>([]);
    const [ CSVImportResult, setCSVImportResult] = useState<boolean | undefined>();

    const filterAndValidateCSV = (fileData: StudentsDataDTO[]) => {
        const filtered: StudentsDataDTO[] = fileData.filter((obj) => (StudentsDataDTO.getRequiredFields()).every(field => obj.hasOwnProperty(field)));
        return filtered.map(obj => ({...new StudentsDataDTO(obj), isActive: false}));
    }

    const sendStudentsDataToAPI = async () => {
        if (students.length < 1) {
            return console.log('There are no students to import');
        }
        // @TODO: complete when API is ready
        //
        // const response = await fetch('http://localhost:3001', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(students)
        // });
        // const data = await response.json();
        // setCSVImportResult(data.ok);
        //
        console.log('Students data sent to API:'); //@TODO: delete in production
        console.log(students); //@TODO: delete in production
    }
    
    return (
        <div className="mt-5 ms-5">
            <h2 className="theme-text-light mb-4">Dodawanie kursantów/ek</h2>
            <CSVReader
                onUploadAccepted={(results: any) => {
                    setStudents(filterAndValidateCSV(results.data));
                }}
                config={{header: true}}
            >
                {({
                      getRootProps,
                      acceptedFile,
                      ProgressBar,
                      getRemoveFileProps,
                  }: any) => (
                    <div className="container reader ms-0">
                        <div className="row">
                            <div className="col d-flex p-0 my-2">
                                <button type='button' {...getRootProps()}
                                        className="btn theme-btn-mainbrand me-2">
                                    Wybierz plik
                                </button>
                                <div className="col d-flex acceptedFile theme-bg-dark-1 border-0">
                                    <div className="theme-text-light px-2">
                                        {acceptedFile && acceptedFile.name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="d-flex flex-row-reverse p-0">
                                <button type="button"
                                        className="btn theme-btn-mainbrand"
                                        onClick={sendStudentsDataToAPI}>
                                    Importuj dane
                                </button>
                                <button {...getRemoveFileProps()}
                                        className="btn theme-btn-dark-2 me-2">
                                Usuń
                                </button>
                                <ProgressBar className="progressBar me-2 mt-3" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-flex p-0 my-2">
                                <p style={{color: "white"}}>{
                                    CSVImportResult === undefined ? null :
                                        CSVImportResult
                                            ? "Dane Kursantów zostały poprawnie zaimportowane"
                                            : "Wystąpił błąd podczas importu danych Kursantów. Dane nie zostały zaimportowane."
                                }</p>
                            </div>
                        </div>
                    </div>
                )}
            </CSVReader>
        </div>
    );
}