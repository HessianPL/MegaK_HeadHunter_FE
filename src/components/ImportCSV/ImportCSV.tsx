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

    useEffect(() => {
        //@TODO: uncomment below when API is ready
        // const postStudentsToAPI = async() => {
        //     const response = await fetch('http://localhost:3001', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(users)
        //     });
        //     return response.json();
        // }
        // postStudentsToAPI();
        console.log(students); //@TODO: delete in production
    }, [students])

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
                            <button type='button' {...getRootProps()} className="browseFile">
                                Wybierz plik
                            </button>
                            <div className="acceptedFile">
                                {acceptedFile && acceptedFile.name}
                            </div>
                            <button {...getRemoveFileProps()} className="remove">
                                Usuń
                            </button>
                        </div>
                        <ProgressBar className="progressBar" />
                    </div>
                )}
            </CSVReader>
        </>
    );
}