import request from '@/utils/request';

export async function userList() {
  return request('/api/staff/queryStaffList', {
    method: 'GET',
  });
}
export async function userList1() {
  return request('/api/staff/queryStaffList', {
    method: 'GET',
  });
}
