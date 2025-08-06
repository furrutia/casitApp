export class CreateCasaDto {

    private constructor(
        public readonly descripcion: string,
        public readonly barrio: string,
        public readonly valor: string,
    ){}

    static create( props: {[key: string]: any} ): [string | undefined, CreateCasaDto?]  {

        const { descripcion, barrio, valor } = props;

        if (!descripcion) return ['descripcion is required'];
        if (!barrio) return ['barrio is required'];
        if (!valor) return ['valor is required'];

        return [undefined, new CreateCasaDto(descripcion, barrio, valor)];
    }
}