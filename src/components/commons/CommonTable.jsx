import React, { useState } from 'react';
import { Divider, Empty, Pagination, Radio, Table } from 'antd';
import styled from 'styled-components';





const CommonTable =  React.memo(({ data, columns, rowSelectionType, setSelection, handlePagination,total,loadding,tableChange ,type}) => {
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    handlePagination(current, pageSize);
  };

  let rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelection(selectedRows)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: type,
      name: type?"":record?.name,
    }),
  };

    
  
  return (
    <TableStyle>

      <div className='common_table'>
      <Table
        rowSelection={{
          type: rowSelectionType,
          ...rowSelection,
        }}
        loading={loadding}
        rowKey={"_id"}
        locale={{
          emptyText:  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />,
        }}
        columns={columns}
        dataSource={data}
        onChange={tableChange}
        pagination={false}
        className=' text-base'
      />

      </div>

      {type?"":<div className='common_pagination'>
      <Pagination 
        total={total}
        defaultPageSize={5}
        defaultCurrent={1}
        pageSizeOptions={['5','10','20']}
        showSizeChanger={true}
        onChange={onShowSizeChange}
        
      />
      </div>}
    </TableStyle>
  );
});

const TableStyle = styled.div`
border: 1px solid #e2e2e2;

margin: 0 24px;
margin-top: 20px;
background-color: white;

.common_table{
  width: 100%;
overflow-x: auto;

}
.common_pagination{
  margin:40px 15px;
  display: flex;
  justify-content: flex-end;
}


    th{
        font-size: 17px;
        background-color: #ececec !important;


    }

    tr{
        font-size: 15px;
    }

    tr:n{
        font-size: 15px;
        background-color: red;
    }
`

export default CommonTable;



