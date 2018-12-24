import React, { Component, Fragment } from 'react';
import { Table, Menu, Dropdown, Icon, Input, Button, Alert } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import styles from '../style/index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

@connect(({ userList }) => ({
  userList,
}))
class Center extends Component {
  constructor(props) {
    super(props);
    this.state = {
      param: {
        status: 0,
      },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userList/list',
    });
  }

  getColumns = () => {
    const col = [
      { title: '用户名称', dataIndex: 'realName', key: 'realName', width: 200 },
      { title: '联系方式', dataIndex: 'mobile', key: 'mobile', width: 150 },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width: 200,
        render: val => <span>{moment(val).format('YYYY-MM-DD')}</span>,
      },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        width: 200,
        render: (text, record) => {
          const menu = (
            <Menu>
              <Menu.Item key="menu-1">
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                  查看详情
                </a>
              </Menu.Item>
              <Menu.Item key="menu-2">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                  删除
                </a>
              </Menu.Item>
            </Menu>
          );
          return (
            <div className={styles.dropMenu}>
              <a className={styles.dropMenuEdit} data-id={record.id}>
                编辑用户
              </a>
              <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#">
                  更多 <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          );
        },
      },
    ];
    return col;
  };

  getchild = record => {
    const arr = record.goodsList || [];
    return (
      <ul key={record.id} style={{ padding: 0 }}>
        {arr.map((d, index) => {
          const ids = `s_${index}`;
          return (
            <li key={d.id + ids} className={styles.childrenLi}>
              <span style={{ width: '450px' }}>型号： {d.goodsAttr}</span>
              <span style={{ width: '200px' }}>￥{d.goodsAttrPrice}</span>
              <span>x {d.goodsCount}</span>
            </li>
          );
        })
        /* <p style={{ margin: 0 }} key={record.id}>{record.description}</p> */
        }
      </ul>
    );
  };

  handleChange = e => {
    const { param } = this.state;
    this.setState({
      param: {
        ...param,
        status: e,
      },
    });
  };

  handleModalVisible = () => {
    // this.setState({
    //   modalVisible: !!flag,
    // });
  };

  render() {
    const { userList } = this.props;
    const { list } = userList;
    return (
      <PageHeaderWrapper title="员工管理">
        <div style={{ padding: '24px 32px', background: '#fff' }}>
          <div className={styles.searchDiv}>
            <ul>
              <li>
                <span>用户名：</span>
                <Input style={{ width: '230px' }} placeholder="请输入用户名" />
              </li>
              <li>
                <span>联系方式：</span>
                <Input style={{ width: '230px' }} placeholder="请输入联系方式" />
              </li>
            </ul>
            <div
              style={{
                textAlign: 'right',
                paddingTop: '10px',
              }}
            >
              <Button style={{ marginRight: '10px' }}>重置</Button>
              <Button type="primary">搜索</Button>
            </div>
          </div>
          <div className={styles.tableListOperator}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
          </div>
          <div className={styles.tableAlert}>
            <Alert
              message={
                <Fragment>
                  全部用户总数为 <a style={{ fontWeight: 600 }}>{list.length || 0}</a>{' '}
                  个&nbsp;&nbsp;
                </Fragment>
              }
              type="info"
              showIcon
            />
          </div>
          <Table
            className={styles.businessOrderListListTable}
            columns={this.getColumns()}
            dataSource={list}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Center;
