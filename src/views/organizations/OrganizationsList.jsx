
    import React, { useEffect, useRef, useState } from 'react'
    import CommonTable from '../../components/commons/CommonTable'
    import {
        MoreOutlined,
        ReloadOutlined
    } from '@ant-design/icons';
    import { Button, Dropdown, Input } from 'antd';
    import styled from 'styled-components';
    import CommonModal from '../../components/commons/CommonModel';

    import organizationsService from './OrganizationsService';
    import OrganizationsEdit from './OrganizationsEdit';
    import { NavLink, useSearchParams } from 'react-router-dom';
    import { HeaderStyle, SearchInputStyle } from '../../components/commons/CommonStyles';
    import CommonDeleteModal from '../../components/commons/CommonDeleteModal';
    import { useDispatch, useSelector } from 'react-redux';
    import { searchOrganizations, updateOrganizationsState, organizationsSearchText } from './OrganizationsRedux';
    import { color } from '../colors/ColorsRedux';

    const OrganizationsList = () => {
        const [organizationsData, setOrganizationsData] = useState([])
        const [total, setTotal] = useState()

        const searchText = useSelector(organizationsSearchText);
        const [loading, setLoading] = useState();
        const [organizationsSelection, setOrganizationsSelection] = useState([])
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

        const [modeID, setModeID] = useState('');
        const [searchParams, setSearchParams] = useSearchParams()

        const delayTimerRef = useRef(null);
        const dispatch = useDispatch();
        const mainColor = useSelector(color);
        

        const getPaginationInfo = () => {

            return [searchParams.get('page') || 1, searchParams.get('limit') || 5]
        }


        useEffect(() => {
            const [page, limit] = getPaginationInfo();
            dispatch(updateOrganizationsState({ page: page, limit: limit }))
            // setSearchParams({ ...Object.fromEntries(searchParams), 'searchText': e.target.value })
            searchData()
        }, [])
        

    async function searchData() {
            try {
                setLoading(true)
                const { payload } = await dispatch(searchOrganizations());
                setOrganizationsData(payload.data)
                setTotal(payload.total)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }


        const searchHandler = (e) => {
            const { value } = e.target;
            const [page, limit] = getPaginationInfo();

            // setSearchParams({ page: page, limit: limit })
            dispatch(updateOrganizationsState({ page: page, limit: limit, searchText: value }))
            clearTimeout(delayTimerRef.current);
            delayTimerRef.current = setTimeout(() => {
                searchData()
            }, 500);
        }

        const handlePagination = async (page, pageSize) => {
            // permmission exmple

            // if (!(await authService.checkPermmision('organizations', 'read'))) {
            //     return message.error('You have not a permmission');
            // }

            setSearchParams({ page: page, limit: pageSize })
            dispatch(updateOrganizationsState({ page: page, limit: pageSize }))

            searchData()
        }

        const tableChange = (pagination, filters, sorter) => {
            const { field, order } = sorter;
            dispatch(updateOrganizationsState({ sort: field, order: order }))

            searchData()
        }
        
        const handleReload = () => {
            const [page, limit] = getPaginationInfo();

            setSearchParams({ page: 1, limit: 5 })
            dispatch(updateOrganizationsState({ page: 1, limit: 5, sort: '', order: '', searchText: '' }))
            searchData();
        }
        

        const handleDelete = async () => {
            try {
                setLoading(true)
                const data = await organizationsService.deleteOrganization(modeID);
                setIsDeleteModalOpen(false)

                searchData()
                setLoading(false)
            }catch (err) {
                setLoading(false)
            }
        }
        
        const onClick = ({ key }, record) => {
            if (key == 'edit') {

                setIsModalOpen(true)
            } else if (key === 'delete') {
                setIsDeleteModalOpen(true)
            }
        };
        
        
        const items = [
            {
                key: 'edit',
                label: (
                    <Button type="text">Edit</Button>
                ),


            },
            {
                key: 'delete',
                label: (
                    <Button type="text"> Delete</Button>
                ),
            },
            {
                key: '3',
                label: (
                    <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                        3rd menu item
                    </a>
                ),
            },
        ];
        
        
        
    
    const columns = [
        
                {
                title: ' ',
                dataIndex: 'action',
                render: (_, recored) => {
                    return (
                        <Dropdown
                            menu={{
                                items,
                                onClick: (value) => onClick(value, recored)
                            }}
                            trigger={['click']}

                            placement="bottomLeft"
                        >
                            <Button type='text' icon={<MoreOutlined style={{ fontSize: 20 }} />} onClick={() => {
                                setModeID(recored._id)
                            }}>

                            </Button>
                        </Dropdown>
                    )
                },

            },
            
     
            {
                title: 'id',
                dataIndex: 'id',
                render: (text, recored) => {
                    return <NavLink style={{ color: "#2f1dca" }} state={recored} to={`${recored._id}`}>{text}</NavLink>
                },
                sorter: true
            },
             
            {
                title: 'name',
                dataIndex: 'name',
                sorter: true

            },
             
            {
                title: 'description',
                dataIndex: 'description',
                sorter: true

            },
             
            {
                title: 'logo',
                dataIndex: 'logo',
                sorter: true

            },
             
            {
                title: 'capital',
                dataIndex: 'capital',
                sorter: true

            },
             
            {
                title: 'country',
                dataIndex: 'country',
                sorter: true

            },
             
            {
                title: 'status',
                dataIndex: 'status',
                sorter: true

            },
             
            {
                title: 'created_at',
                dataIndex: 'created_at',
                sorter: true

            },
            
    ];
    
    return (
            <div>

                {
                    isModalOpen ? <CommonModal width={1000} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} >
                    <OrganizationsEdit organizationsData={organizationsData} searchData={searchData} setMode={setModeID} mode={modeID} isModelOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                    </CommonModal> : ""
                }

                {
                    isDeleteModalOpen ?
                        <CommonDeleteModal setIsModalOpen={setIsDeleteModalOpen}
                            handleDelete={handleDelete}
                            loading={loading}
                            isModalOpen={isDeleteModalOpen}  >
                            <h1 className=' text-2xl'>Are you sure?</h1>
                        </CommonDeleteModal> : ""
                }

                <HeaderStyle  style={{
                                    backgroundImage:mainColor ? `linear-gradient(to right, white , ${mainColor})` : `linear-gradient(to right, white , $#110330)`
                                 }}>
                    <div className='header_left'>
                        <p>Organizations</p>
                    </div>

                    <Button onClick={handleReload} size='large' >
                        <ReloadOutlined size={25} style={{ color: 'white', fontSize: 20 }} />
                    </Button>


                    <div className='header_right'>
                        <Button onClick={() => {
                            setModeID('')
                            setIsModalOpen(true)
                        }} size='large' >Add</Button>

                    </div>

                </HeaderStyle>


                <div className='flex flex-row gap-6'>
                    <SearchInputStyle>
                        <Input onChange={searchHandler}
                            placeholder="Search"
                            value={searchText}
                            allowClear />
                    </SearchInputStyle>
                </div>

                <CommonTable
                    rowSelectionType={"checkbox"}
                    data={organizationsData}
                    columns={columns}
                    setSelection={setOrganizationsSelection}
                    handlePagination={handlePagination}
                    total={total}
                    loadding={loading}
                    tableChange={tableChange}

                />
            </div>
        )
    }
    
    export default OrganizationsList
    