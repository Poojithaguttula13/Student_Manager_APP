import axios from "axios";
const API = "http://localhost:3000/students";

const API_EQUIPMENT = "http://localhost:3000/equipment";
const API_EQUIPMENT_TABLE = "http://localhost:3000/equipmentTable";
const CARDS = "http://localhost:3000/cards";

export const getStudents = () => axios.get(API);
export const createStudent = (data) => axios.post(API, data);
export const removeStudent = (id) => axios.delete(`${API}/${id}`);

export const getEquipment = () => axios.get(API_EQUIPMENT);
export const getEquipmentTable = () => axios.get(API_EQUIPMENT_TABLE);
export const getCards = () => axios.get(CARDS);
