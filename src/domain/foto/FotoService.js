export default class FotoService {
    constructor(resource) {
        this._resource = resource;
    }

    lista(){
        return this._resource.get('v1/fotos')
            .then(response => response, err => {
                console.log(err);
                throw new Error('Não foi possível obter as fotos, tente mais tarde');

            });
    }

    cadastra(foto){
        if (foto._id) {
            return this._resource.put(`v1/fotos/${foto._id}`, foto)
                .then(response => response, err => {
                    console.log(err);
                    throw new Error('Não foi possível alterar a foto');
                })
            
        } else {

            return this._resource.post('v1/fotos', foto)
        }
    }

    apaga(id){
        return this._resource.delete(`v1/fotos/${id}`)
            .then(response => response, err => {
                console.log(err);
                throw new Error('Não foi possível cadastrar a foto');
            })
    }

    busca(id){
        return this._resource.get(`v1/fotos/${id}`)
        
    }
}