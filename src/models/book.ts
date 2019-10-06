
export interface Book {
    title: string,
    price: number,
    condition: string,
    uploader: string,
    location:{
        lat: number,
        long: number,
    },
    image: string,
    description: string

}