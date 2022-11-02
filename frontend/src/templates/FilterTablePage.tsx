import React from 'react';
import InputType from './InputType';

interface InputConfig<APIType> {
  title: string, 
  type?: InputType,
  value: (api: APIType) => unknown,
  size: { 
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number
  }
}

interface TableConfig<APIType> {
  content: [string, (api: APIType) => unknown][]
  paging?: boolean
}

interface FilterTablePageType<APIType> {
  filter: InputConfig<APIType>[][]
  table: TableConfig<APIType>
}

function FilterTablePage<APIType>(config: FilterTablePageType<APIType>) {





  const FilterTablePage: React.FC<{children:any}> = (props) => {
    return <div>{props.children}</div>
  };

  FilterTablePage.displayName = `FilterTablePage`;

  return FilterTablePage;
  
}

export default FilterTablePage;
