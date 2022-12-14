import {CreateMilestone, DeleteMilestone, ListMilestone, UpdateMilestone} from "../api/milestone";
import {DatePicker, Form, Input, message, Popconfirm, Progress, Space, Table, Tag, Typography} from "antd";
import {useEffect, useState} from "react";
import {ListMilestoneTag} from "../api/milestone-tag";
import {DateText} from "../util/date-text";
import dayjs from "dayjs";
import AddModalForm from "../component/AddModalForm";


function Milestone() {
    const [tagOpts, setTagOpts] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [tagFilter, setTagFilter] = useState(undefined);
    const [needFresh, setNeedFresh] = useState(false);
    const [updatedId, setUpdatedId] = useState(0);
    const [updatedEntity, setUpdatedEntity] = useState({});

    useEffect(() => {
        ListMilestoneTag({pageSize: 100}).then(res => {
            setTagOpts(res.data.data?.map(v => ({text: v, value: v})) ?? [])
        })
        ListMilestone({page, pageSize, tag: tagFilter}).then(res => {
            setData(res.data.data ?? [])
            setTotal(res.data.total ?? 0)
        })
    }, [needFresh, page, pageSize, tagFilter])

    const successFresh = () => {
        setNeedFresh(!needFresh)
        return message.success('success').then()
    }

    const columns = [
        {title: '#', dataIndex: 'id', valueType: 'indexBox', width: 48},
        {
            title: 'Title',
            dataIndex: 'title',
            render: (text, {id}) => (id === updatedId ? <Input autoFocus value={updatedEntity.title}
                                                               onChange={e => setUpdatedEntity({
                                                                   ...updatedEntity,
                                                                   title: e.target.value
                                                               })}/> : text)
        },
        {
            title: 'Progress',
            hideInForm: true,
            editable: false,
            width: '8%',
            render: (_, record) => (
                <Progress percent={record.point === 0 ? 0 : Math.floor(record.progress / record.point)}
                          format={percent => (`${percent}%`)}></Progress>)
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            width: '10%',
            filterMultiple: false,
            filters: tagOpts,
            render: (_, record) => (
                <Space size={1} wrap={true}>{record.tags?.map((tag) => (<Tag>{tag}</Tag>))}</Space>)
        },
        {
            title: 'Started at',
            width: '10%',
            dataIndex: 'startedAt',
            render: (text, {id}) => id === updatedId ?
                <DatePicker allowClear={false} showTime value={dayjs(updatedEntity.startedAt)}
                            onChange={date => setUpdatedEntity({
                                ...updatedEntity,
                                startedAt: date
                            })}/> : DateText(text)
        },
        {
            title: 'Deadline',
            width: '10%',
            dataIndex: 'deadline',
            render: (text, {id}) => id === updatedId ?
                <DatePicker showTime
                            value={updatedEntity.deadline ? dayjs(updatedEntity.deadline) : undefined}
                            onChange={date => setUpdatedEntity({
                                ...updatedEntity,
                                deadline: date
                            })}/> : DateText(text)
        },
        {
            title: 'Action', width: '10%', render: (text, row) => [
                <Space>
                    {row.id === updatedId ? <>
                        <Popconfirm title={'Save it?'}
                                    onConfirm={() => UpdateMilestone(row.id, updatedEntity).then(() => {
                                        successFresh().then(setUpdatedId(0))
                                    })}>
                            <Typography.Link>Save</Typography.Link>
                        </Popconfirm>
                        <Typography.Link onClick={() => setUpdatedId(0)}>Cancel</Typography.Link>
                    </> : <>
                        <Typography.Link onClick={() => {
                            setUpdatedEntity(row)
                            setUpdatedId(row.id)
                        }}>Edit </Typography.Link>
                        <Popconfirm title={'Delete it?'} onConfirm={() => DeleteMilestone(row.id).then(successFresh)}>
                            <Typography.Link>Delete</Typography.Link>
                        </Popconfirm></>}
                </Space>
            ],
        },
    ]
    return (<>
        <AddModalForm
            name={'milestone'}
            onOk={value => CreateMilestone(value).then(successFresh)}>
            <Form.Item name='title' label='Title'><Input autoFocus/></Form.Item>
            <Form.Item name='startedAt' label='Start at' initialValue={dayjs()}>
                <DatePicker allowClear={false} showTime/>
            </Form.Item>
            <Form.Item name='deadline' label='Deadline'><DatePicker showTime/></Form.Item>
        </AddModalForm>

        <Table
            style={{margin: 15}}
            columns={columns}
            dataSource={data}
            pagination={{
                total,
                pageSize,
                current: page,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
            onChange={(pagination, filters) => {
                setPage(pagination.current)
                setPageSize(pagination.pageSize)
                for (const f in filters) {
                    setTagFilter(filters[f]?.pop() ?? undefined)
                }
            }}
        />
    </>)
}

export default Milestone
