import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

const { Content } = Layout;

class Register extends Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.setDataList(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 18 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 11,
        },
      },
    };

    return (
      <Content style={{ padding: '25px 70px' }}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Field-1&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('field1', {
              rules: [{ required: true, message: 'Please input field1!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Field-2&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('field2', {
              rules: [{ required: true, message: 'Please input field2!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Field-3&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('field3', {
              rules: [{ required: true, message: 'Please input field3!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Field-4&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('field4', {
              rules: [{ required: true, message: 'Please input field4!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Field-5&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('field5', {
              rules: [{ required: true, message: 'Please input field5!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </Content>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Register);

export default WrappedRegistrationForm;