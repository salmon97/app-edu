import axios from "axios";
import {API_PREFIX} from "../contants/contants";
import request from "./utils";


export function uploadFile(data) {
  let obj = new FormData();
  obj.append("file", data.file);
  return axios.post(API_PREFIX + 'attachment/upload', obj)
    .then(res => {
      return res;
    }).catch(err => err)
}

export function getWeeks() {
  return request({
    url:'week'
  })
}
export function getHours() {
  return request({
    url:'hour?size=48'
  })
}

export function getUsers(data) {
  return request({
    url: `auth/users/?roleName=${data.roleName}`
  })
}

export function deleteUser(data) {
  return request({
    url: `auth/delete/${data.id}`,
    method: 'delete'
  })
}

export function getStudentGroup(data) {
  return request({
    url: `student/getGroup/${data.id}`
  })
}

export function getPayments(data) {
  return request({
    url: `payment/payments/?page=${data.page}&size=${data.size}`
  })
}

export function addPayment(data) {
  return request({
    url: `payment/addPayment`,
    method: 'post',
    data
  })
}

export function regStaffAndTeacher(data) {
  return request({
    url: `auth/registerTeacher/${data.which}`,
    method: 'post',
    data
  })
}

export function getGroup(data) {
  return request({
    url: `group/getGroup/?page=${data.page}&size=${data.size}`
  })
}

export function deleteChild(data) {
  return request({
    url: `group/deleteChild/?groupId=${data.groupId}&childId=${data.childId}`,
    method: 'delete'
  })
}


export function getCountGrVsSt() {
  return request({
    url: `staff/getCount`
  })
}

export function userMe() {
  return request({
    url: 'auth/userMe'
  })
}

export function submitRate(data) {
  return request({
    url: 'rateHomework/rate',
    method: 'post',
    data
  })
}

export function getStudent(data) {
  return request({
    url: 'student/getStudents/' + data.id
  })
}

export function deleteTeacher(data) {
  return request({
    url: 'teacher/delete/' + data.id,
    method: 'delete'
  })
}

export function deleteStudent(data) {
  return request({
    url: 'student/delete/' + data.id,
    method: 'delete'
  })
}

export function addStudent(data) {
  return request({
    url: 'student/addStudent/?groupCode=' + data.groupCode + '&stId=' + data.stId,
    method: 'post'
  })
}

export function getStudentByEdu(data) {
  return request({
    url: 'student/students/?page=' + data.page + '&size' + data.size
  })
}

export function homeWork(data) {
  return request({
    url: 'rateHomework/homeWork',
    method: 'post',
    data
  })
}

export function makeAttend(data) {
  return request({
    url: 'attendance/attendance',
    method: 'post',
    data
  })
}

export function saveRelation(data) {
  return request({
    url: 'attendance/relation',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: 'auth/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: 'auth/register',
    method: 'post',
    data
  })
}

export function getDitrict(data) {
  return axios.get(API_PREFIX + 'district/search/getByRegion?id=' + data.id)
    .then(res => res)
    .catch(err => err)
}

export function getRegion() {
  return axios.get(API_PREFIX + 'region')
    .then(res => res)
    .catch(err => err)
}

export function checkCode(data) {
  return request({
    url: `auth/checkCode?code=${data}`,
    method: 'post'
  })
}

export function getTeachers(data) {
  return request({
    url: 'teacher/getTeachers/' + data.full
  })
}

export function saveGroup(data) {
  return request({
    url: 'group/addGroup',
    method: 'post',
    data
  })
}

export function getSubjects() {
  return request({
    url: 'subject/getSubjects'
  })
}

export function addSubject(data) {
  return request({
    url: 'subject/addSubject',
    method: 'post',
    data
  })
}

export function deleteSubject(data) {
  return request({
    url: 'subject/delete/' + data,
    method: 'delete'
  })
}

export function getStudentDetail(data) {
  return request({
    url: `student/${data.id}`
  })
}

export function deleteGroup(data) {
  return request({
    url: 'group/deleteGr/' + data.id,
    method: 'delete'
  })
}
