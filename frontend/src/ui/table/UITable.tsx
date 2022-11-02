import { UIDate } from '@ui/datepicker/UIDatePicker';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import UITextField from '../textfield/UITextField';

interface RowDataType {
    id: unknown,
    display: Record<string, React.ReactNode>
}

interface RowType<T> extends RowDataType {
    data: T
}

export class UITableDocument<T> {

    private readonly _MAX_ROWS: number = 7

    private _data: T[]

    private _columns: string[]
    private _rows: Map<unknown, RowType<T>>

    private _description: (data: T) => RowDataType

    private _paging: boolean
    private _pageNumber: number

    private _onRowSelected?: (selectedRow: T) => void
    private _onRowDoubleClicked?: (selectedRow: T) => void

    private _updateComponent?: () => void

    constructor(params: {
        data: T[], 
        columns: string[], 
        description: (data: T) => RowDataType,
        paging?: boolean,
        onRowSelected?: (selectedRow: T) => void,
        onRowDoubleClicked?: (selectedRow: T) => void
    }) {
        this._data                      = params.data
        this._columns                   = params.columns
        this._description               = params.description
        this._paging                    = params.paging ?? true
        this._onRowSelected             = params.onRowSelected
        this._onRowDoubleClicked        = params.onRowDoubleClicked
        this._rows                      = new Map()
        this._pageNumber                = 1
        this.update()
    }

    public update() {
        this._rows.clear()
        this.getPageRows().forEach((rowData, i) => {
            const transformedRowData = this._description(rowData)
            this._rows.set(transformedRowData.id, {data: rowData, ...transformedRowData})
        })
        this._updateComponent?.()
    }

    private getPageRows(): T[] {
        return this._data.slice(this._MAX_ROWS * (this._pageNumber - 1), this._MAX_ROWS * this._pageNumber)
    }

    public getData() {
        return this._data
    }

    public setData(data: T[]) {
        this._data = data
        this.update();
    }

    public getPageNumber(): number {
        return this._pageNumber
    }

    public setPageNumber(pageNumber: number) {
        if(this.getMaxPage() > pageNumber || pageNumber < 1) {
            return;
        }
        this._pageNumber = pageNumber
        this.update()
    }

    public getMaxPage(): number {
        return Math.ceil(this._data.length / this._MAX_ROWS)
    }

    public nextPage() {
        const nextPage = this._pageNumber + 1
        const maxPage = this.getMaxPage()
        if(nextPage > maxPage) {
            this.setPageNumber(nextPage)
        }
    }

    public previousPage() {
        const previousPage = this._pageNumber - 1
        if(previousPage > 0) {
            this.setPageNumber(previousPage)
        }
    }

    public rowMapping(fn: (row: RowType<T>) => JSX.Element): JSX.Element[] {
        return [...this._rows].map(pair => fn(pair[1]))
    }

    public cellMapping(row: RowType<T>, fn: (cell: React.ReactNode) => React.ReactNode): React.ReactNode {
        const cellKeys = Object.keys(row.display)
        return this._columns.map((value, i) => fn(row.display[cellKeys[i]]))
    }

    public columnMapping(fn: (name: string, key: number) => JSX.Element) {
        return this._columns.map((value, i) => fn(value, i))
    }

    public getColumnsLength() {
        return this._columns.length
    }

    public getRowsLength() {
        return this._rows.size
    }

    public triggerOnRowSelected(selectedRow: RowType<T>) {
        this._onRowSelected?.(selectedRow.data)
    }

    public triggerOnRowDoubleClicked(dbClickedRow: RowType<T>) {
        this._onRowDoubleClicked?.(dbClickedRow.data)
    }

    public setComponentUpdaterTrigger(updateComponent: () => void) {
        this._updateComponent = updateComponent
    }

}

interface UITableProps {
    document: UITableDocument<any>
}

const UITable: React.FC<UITableProps> = (props) => {
    const [, setUpdater] = useState<boolean>(false);
    
    useEffect(() => {
        props.document.setComponentUpdaterTrigger(() => setUpdater(update => !update))
    }, []);
   
    return (
        <table className='ui-table'>
            <thead>
                <tr>
                    {props.document.columnMapping((name) => <th> {name} </th> )}
                </tr>
            </thead>
            <tbody>
                {props.document.rowMapping(row => (
                    <tr
                        onClick={() => props.document.triggerOnRowSelected(row)}
                        onDoubleClick={() => props.document.triggerOnRowDoubleClicked(row)}
                    >
                        {props.document.cellMapping(row, (cell) => (
                            <td> {cell} </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={props.document.getColumnsLength()}>
                        <div className='pagination'>
                            <FaAngleLeft onClick={props.document.nextPage} size={32} />
                            <UITextField id="page" defaultValue={String(props.document.getPageNumber())} />
                            <span>de {props.document.getMaxPage()}</span>
                            <FaAngleRight onClick={props.document.previousPage} size={32} />
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default UITable;