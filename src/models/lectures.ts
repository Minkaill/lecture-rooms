export interface LectureDTO {
    id: string,
    name: string,
    categoryId: string,
    url_image: string
}

export interface ILecture {
    lectures: LectureDTO[]
}