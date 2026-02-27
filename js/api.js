import { ShowData } from "./dom.js"
let api = "http://localhost:3001/data"


export async function GetData() {
    try {
        const response = await axios.get(api)
        return response.data
    } catch (error) {
        console.error(error);

    }
}

export async function appendData() {
    let data = await GetData()
    ShowData(data)
}

export async function checkData(obj) {
    try {
        await axios.put(`${api}/${obj.id}`, obj)
    } catch (error) {
        console.error(error);
    }
}