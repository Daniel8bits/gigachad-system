import UIScroll from '@ui/scroll/UIScroll';
import React from 'react';
import {MdOutlineClose} from 'react-icons/md'

interface FilterTableModalLayoutProps {
  title: string
  onClose: () => void 
  children: any
}

const FilterTableModalLayout: React.FC<FilterTableModalLayoutProps> = (props) => {
  return (
    <div className='filter-table-modal-layout'>
      <div className='header'>
        <h2> {props.title} </h2>
        <button type='button' onClick={props.onClose}> <MdOutlineClose  /> </button>
      </div>
      <UIScroll maxHeight={window.innerHeight*0.75}>
        {props.children}
      </UIScroll>
    </div>
  );
};

export default FilterTableModalLayout;