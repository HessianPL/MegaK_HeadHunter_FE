import {useEffect, useState} from "react";
import { useCSVReader } from 'react-papaparse';

import './ImportCSV.css';
import { StudentsDataDTO } from '../../types-fe/StudentsDataDTO';

export default function ImportCSV() {
    const { CSVReader } = useCSVReader();
    const [students, setStudents] = useState<StudentsDataDTO[] | []>([]);

    const filterAndValidateCSV = (fileData: StudentsDataDTO[]) => {
        const filtered: StudentsDataDTO[] = fileData.filter((obj) => (StudentsDataDTO.getRequiredFields()).every(field => obj.hasOwnProperty(field)));
        return filtered.map(obj => new StudentsDataDTO(obj));
    }

    const sendStudentsDataToAPI = async () => {
        // const response = await fetch('http://localhost:3001', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(students)
        // });
        // return response.json();
        console.log('Students data sent to API:');
        console.log(students);
    }
    
    return (
        <>
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
                    <div className="reader">
                        <div className="csvReader">
                            <button type='button' {...getRootProps()} className="browseFileBtn">
                                Wybierz plik
                            </button>
                            <div className="acceptedFile">
                                {acceptedFile && acceptedFile.name}
                            </div>
                            <button {...getRemoveFileProps()} className="removeBtn">
                                Usuń
                            </button>
                        </div>
                        <ProgressBar className="progressBar" />
                        <button type="button" className="sendBtn" onClick={sendStudentsDataToAPI}>Importuj dane Kursantów</button>
                    </div>
                )}
            </CSVReader>
        </>
    );
}