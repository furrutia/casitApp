export class UpdateCasaDto {

    private constructor(
        public readonly id: number,
        public readonly descripcion?: string,
        public readonly barrio?: string,
        public readonly valor?: string,
    ){}


    get values() {
        const returnObj: {[key: string]: any} = {};
        if(this.descripcion !== undefined) returnObj.descripcion = this.descripcion;
        if(this.barrio !== undefined) returnObj.barrio = this.barrio;
        if(this.valor !== undefined) returnObj.valor = this.valor;
        return returnObj;
    }

    static create( props: {[key: string]: any} ): [string | undefined, UpdateCasaDto?]  {

        const { id, descripcion, barrio, valor } = props;

        if (!id || isNaN(id)) return ['ID is required and must be a number'];
        if (!descripcion) return ['descripcion is required'];
        if (!barrio) return ['barrio is required'];
        if (!valor) return ['valor is required'];

        return [undefined, new UpdateCasaDto(id, descripcion, barrio, valor)];
    }
}