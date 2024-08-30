
    
import api from '../../api/api';

class ColorsService {
    createColor(data) {
        return api
            .post("/colors", data)
            .then(response => {
                return response.data.data;
            });
    }

    updateColor(data, id) {
        return api
            .patch("/colors/" + id, data)
            .then(response => {
                return response.data.data;
            });
    }

    searchColor({page, limit,searchText=null,sort=null,order}) {
        let url = `/colors?page=${page}&limit=${limit}`
    //     if(sort){
    // const sortValue = order == 'ascend' ? sort : order == 'descend' ? '-'+sort:'';
    //         url = url + `&sort=${sortValue}`
    //     }

        if(searchText){
           
            url = url + `&searchText=${searchText}`
        }

        return api
            .get(url)
            .then(response => {
                return {data:response.data.data,total:response.data.total};
            });
    }

    getColor(id) {
        return api
            .get("/colors/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deleteColor( id) {
        return api
            .delete("/colors/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    colorsDo({method,payload}){
        return api
            .post("/colors/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    colorDo({method,payload,id}){
        return api
            .post("/colors/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new ColorsService();

    