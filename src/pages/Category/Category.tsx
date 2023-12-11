import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { getCategoryById } from "@/store/features/categories"
import { selectCategories } from "@/store/slices/categories"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import st from '../../components/UploadcareUploader/FileUploader.module.scss';
import { OutputFileEntry } from '@uploadcare/blocks';
import { addLectures, getLectures, onPostMockUrl } from "@/store/features/lecture"
import { selectLectures } from "@/store/slices/lectures"
import { ArticleCardImage } from "@/components/ArticleCardImage/ArticleCardImage"
import classes from './Category.module.css';
import Loader from "react-loaders"
import FileUploader from "@/components/UploadcareUploader/FileUploader"
import { LectureDTO } from "@/models/lectures"
import { UploadFileProgress } from "@/hooks/useUploadProgress"

export function Category() {
    const dispatch = useAppDispatch()

    const { selectedCategory, isLoading } = useAppSelector(selectCategories)
    const { lectures, progressData } = useAppSelector(selectLectures)
    const { id } = useParams()

    const [data, setData] = useState<LectureDTO[]>([])

    console.log(progressData, "PROGRESS DATA")

    useEffect(() => {
        setData(lectures)
    }, [lectures, dispatch])

    console.log(data, "DATA")

    const [image, setImage] = useState<OutputFileEntry[]>([]);

    const onAddLecture = () => {
        if (image && image.length > 0) {
            const fd = new FormData()
            image.forEach((img) => {
                if (img && img.file) { // Check if img and img.file are not null
                    fd.append('file', img.file);
                }
            });
            fd.append("upload_preset", "lectures")
            fd.append("cloud_name", "dmdnmlfs5")
            fd.append("tags", "lectures")
            dispatch(addLectures(fd)).then((data) => {
                if (addLectures.fulfilled.match(data)) {
                    const url = data.payload.data.url
                    return dispatch(onPostMockUrl({ id, url })).then((dt: any) => setData((prev: any) => [...prev, dt.payload.data]))
                } else {
                    console.error('Thunk-действие addLectures завершилось с ошибкой:', data.error);
                }
            })
        }
    }



    useEffect(() => {
        dispatch(getCategoryById(String(id)))
    }, [])

    useEffect(() => {
        dispatch(getLectures(String(id)))
    }, [])

    if (isLoading) return <div className={classes.wrapper}>
        <div className={classes.loader}>
            <Loader type="ball-scale-multiple" active />
        </div>
    </div>

    return (
        <Container className={classes.wrapper} size={1400}>

            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    <Text component="span" className={classes.highlight} inherit>
                        {selectedCategory?.name}
                    </Text>{' '}
                </Title>

                <Container p={0} size={600}>
                    <Text size="lg" c="dimmed" className={classes.description}>
                        На этой странице вы найдете богатый и разнообразный набор лекций, посвященных "{selectedCategory?.name}".
                        Мы стремимся предоставить вам уникальную возможность углубить свои знания в этой увлекательной области и получить доступ к актуальной информации.
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button className={classes.control} size="lg" variant="default" color="gray">
                        Загрузить лекцию
                        <FileUploader files={image} uploaderClassName={st.FileUploader} onChange={setImage} theme="dark" />
                    </Button>
                    <Button disabled={image ? false : true} onClick={onAddLecture} className={classes.control} size="lg">
                        Отправить
                    </Button>
                </div>
            </div>


            <div className={classes.card_conteiner}>
                {data?.map((lecture) => <ArticleCardImage key={lecture.id} url={lecture.url} />)}
            </div>
        </Container>
    );
}