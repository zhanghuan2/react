import React, { Component, Fragment } from 'react';
import { Table, Menu, Dropdown, Icon, Input, Select, Button, Alert } from 'antd';
import { connect } from 'dva';
import styles from '../style/index.less';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Option } = Select;

@connect(({ orderList }) => ({
  orderList,
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
      type: 'orderList/list',
    });
  }

  getColumns = () => {
    const col = [
      { title: '订单名称', dataIndex: 'orderName', key: 'orderName', width: 200 },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: text => {
          let word = '-';
          switch (text) {
            case 201:
              word = '未发货';
              break;
            case 300:
              word = '已发货';
              break;
            case 301:
              word = '已完结';
              break;
            case 101:
              word = '已取消';
              break;
            default:
              word = '-';
          }
          return word;
        },
      },
      { title: '联系方式', dataIndex: 'mobile', key: 'mobile', width: 150 },
      {
        title: '金额',
        dataIndex: 'balance',
        key: 'balance',
        width: 200,
        render: text => {
          if (text === null) {
            return '-';
          }
          return <span className={styles.tableListSpan}>未付款：￥{text}</span>;
        },
      },
      { title: '型号总数', dataIndex: 'total', key: 'total' },
      { title: '创建时间', dataIndex: 'addTimeStr', key: 'addTimeStr' },
      {
        title: '操作',
        dataIndex: '',
        key: 'x',
        render: (text, record) => {
          const menu = (
            <Menu>
              <Menu.Item key="menu-1">
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                  变更金额
                </a>
              </Menu.Item>
              <Menu.Item key="menu-2">
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                  变更状态
                </a>
              </Menu.Item>
              <Menu.Item key="menu-3">
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                  查看详情
                </a>
              </Menu.Item>
            </Menu>
          );
          return (
            <div className={styles.dropMenu}>
              <a className={styles.dropMenuEdit} data-id={record.id}>
                编辑订单
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
    const { orderList } = this.props;
    const { list } = orderList;
    const { param } = this.state;
    return (
      <PageHeaderWrapper title="订单管理">
        <div style={{ padding: '24px 32px', background: '#fff' }}>
          <div className={styles.searchDiv}>
            <ul>
              <li>
                <span>订单号：</span>
                <Input style={{ width: '230px' }} placeholder="请输入订单号" />
              </li>
              <li>
                <span>状态：</span>
                <Select
                  defaultValue={param.status}
                  value={param.status}
                  style={{ width: 230 }}
                  onChange={this.handleChange}
                >
                  <Option value={0}>全部</Option>
                  <Option value="201">未发货</Option>
                  <Option value="300">已发货</Option>
                  <Option value="301">已完结</Option>
                  <Option value="101">已取消</Option>
                </Select>
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
                  全部订单总数为 <a style={{ fontWeight: 600 }}>30</a> 项&nbsp;&nbsp;
                </Fragment>
              }
              type="info"
              showIcon
            />
          </div>
          <Table
            className={styles.businessOrderListListTable}
            columns={this.getColumns()}
            expandedRowRender={record => this.getchild(record)}
            dataSource={list}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Center;
