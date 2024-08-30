
    
import api from '../../api/api';

class OrganizationsService {
    createOrganization(data) {
        return api
            .post("/organizations", data)
            .then(response => {
                return response.data.data;
            });
    }

    updateOrganization(data, id) {
        return api
            .patch("/organizations/" + id, data)
            .then(response => {
                return response.data.data;
            });
    }

    searchOrganization({page, limit,searchText=null,sort=null,order}) {
        let url = `/organizations?page=${page}&limit=${limit}`
        if(sort){
    const sortValue = order == 'ascend' ? sort : order == 'descend' ? '-'+sort:'';
            url = url + `&sort=${sortValue}`
        }

        if(searchText){
           
            url = url + `&searchText=${searchText}`
        }

        return api
            .get(url)
            .then(response => {
                return {data:response.data.data,total:response.data.total};
            });
    }

    getOrganization(id) {
        return api
            .get("/organizations/" + id)
            .then(response => {
                return response.data.data;
            });
    }


    deleteOrganization( id) {
        return api
            .delete("/organizations/" + id)
            .then(response => {
                return response.data.data;
            });
    }

    organizationsDo({method,payload}){
        return api
            .post("/organizations/do",{method,payload})
            .then(response => {
                return response.data.data;
            });
    }

    organizationDo({method,payload,id}){
        return api
            .post("/organizations/do/"+id,{method,payload})
            .then(response => {
                return response.data.data;
            });
    }
}

export default new OrganizationsService();

    