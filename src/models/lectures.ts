export interface LectureDTO {
    id: string,
    categoryId: string,
    url: string
}

export interface ILecture {
    lectures: LectureDTO[]
}