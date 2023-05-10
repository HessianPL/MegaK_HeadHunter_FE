import React, {useState} from "react";
import { useCSVReader } from 'react-papaparse';

import { StudentsDataDTO } from "../../types-fe/StudentsDataDTO";
import { StudentsDataFromFile } from "../../types-fe/StudentsDataFromFile";
import { Spinner } from "../common/Spinner/Spinner";
import { toast } from "react-toastify";

export default function ImportCSV() {
    const [students, setStudents] = useState<StudentsDataDTO[] | []>([]);
    const [loading, setLoading] = useState(false);

    const { CSVReader } = useCSVReader();

    const filterAndValidateCSV = (fileData: StudentsDataFromFile[]) => {
        const filtered: StudentsDataFromFile[] = fileData
            .filter((obj) => (StudentsDataFromFile.getRequiredFields()).every(field => obj.hasOwnProperty(field)));
        const mapped = filtered
            .map((obj) => ({
                ...obj,
                isActive: false,
                bonusProjectUrls: obj.bonusProjectUrls.split(','),}));

        return mapped.map(obj => ({...new StudentsDataDTO(obj)}));
    }

    const sendStudentsDataToAPI = async () => {
        setLoading(true);

        try {
            if (students.length < 1) {
                return console.log('There are no students to import');
            }

            const response = await fetch('http://localhost:3000/register/list', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(students)
            });

            const res = await response.json();

            if (res.message === 'ok') {
                toast.success('Dane zostały poprawnie zaimportowane.');
            } else {
                toast.error('Nie udało się zaimportować danych. Sprawdź ich poprawność i kompletność.');
            }
            return res;
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner/>
    }
    
    return (
        <div className="mt-5 ms-5">
            <h2 className="theme-text-light mb-4">Dodawanie kursantów/ek</h2>
            <a href="/exampleStudentsFile.csv">Przykładowy plik .csv</a>
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
                    </div>
                )}
            </CSVReader>
        </div>
    );
}