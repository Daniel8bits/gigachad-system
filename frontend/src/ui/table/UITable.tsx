import React, { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import UITextField from '../textfield/UITextField';

type ColumnData = {
    [key: string]: string
}

type ValuesData = {
    [key: keyof ColumnData]: string
}

interface UITableProps {
    columns: ColumnData
    values: Array<ValuesData>
    onClick?: (e : React.MouseEvent, data: ColumnData) => void
}

const limit = 2;

const UITable: React.FC<UITableProps> = (props) => {
    const [page, setPage] = useState(1);


    const columnsKeys = useMemo<(keyof ColumnData)[]>(() => Object.keys(props.columns), [props.columns]);

    const totalPages = useMemo(() => {
        const numPages = Math.ceil(props.values.length / limit);
        if (numPages === 0) return 1;
        return numPages;
    }, [props.values]);

    const changePage = (n: number) => () => {
        let newPage = page + n;
        if (newPage <= 0) newPage = 1;
        if (newPage > totalPages) newPage = totalPages;
        setPage(newPage );
    }
    
    const rows = useMemo(() => {
        return props.values.slice(limit * (page - 1), limit * page);
    }, [props.values, page]);
    
    const length = columnsKeys.length;
    return (
        <table className='ui-table'>
            <thead>
                <tr>
                    {columnsKeys.map((key) => <th>{props.columns[key]}</th>)}
                </tr>
            </thead>
            <tbody>
                {rows.map((item) => {
                    return <tr onClick={(e) => props.onClick && props.onClick(e,item)}>
                        {columnsKeys.map((key: keyof ColumnData) => {
                            return <td>{item[key]}</td>
                        })}
                    </tr>
                })}

            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={length}>
                        <div className='pagination'>
                            <FaAngleLeft onClick={changePage(-1)} size={32} />
                            <UITextField id="page" defaultValue={String(page)} />
                            <span>de {totalPages}</span>
                            <FaAngleRight onClick={changePage(1)} size={32} />
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default UITable;