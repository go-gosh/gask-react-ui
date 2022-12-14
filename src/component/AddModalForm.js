import {useState} from "react";
import {useForm} from "antd/es/form/Form";
import {Button, Form, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

function AddModalForm(props) {
    const {onOk, name} = props
    const [visible, setVisible] = useState(false)
    const [form] = useForm()
    const handleCancel = () => {
        form.resetFields()
        setVisible(false)
    }
    const handleOk = () => {
        form.validateFields().then(value => {
            onOk(value)
            handleCancel()
        })
    }
    return <div style={{display: 'flex'}}>
        <Button style={{marginLeft: 'auto'}} onClick={() => setVisible(true)} type={'primary'}
                icon={<PlusOutlined/>}>Add</Button>
        <Modal
            title={`Create ${name}`}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form labelCol={{span: 6}} wrapperCol={{span: 14}} form={form}>
                {props.children}
            </Form>
        </Modal>
    </div>
}

AddModalForm.propTypes = {
    name: PropTypes.string,
    onOk: PropTypes.func,
}

AddModalForm.defaultProps = {
    name: '',
    onOk: value => console.log(value),
}

export default AddModalForm
