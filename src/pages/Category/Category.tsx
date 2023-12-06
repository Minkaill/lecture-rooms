import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { getCategoryById } from "@/store/features/categories"
import { selectCategories } from "@/store/slices/categories"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import { addLectures, getLectures, onPostMockUrl } from "@/store/features/lecture"
import { selectLectures } from "@/store/slices/lectures"
import { ArticleCardImage } from "@/components/ArticleCardImage/ArticleCardImage"
import classes from './Category.module.css';
import Loader from "react-loaders"

export function Category() {
    const { selectedCategory, isLoading } = useAppSelector(selectCategories)
    const { lectures } = useAppSelector(selectLectures)
    const fileRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const [image, setImage] = useState<File | string>("");

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setImage(event.target.files[0]);
    };

    const onAddLecture = () => {
        if (image) {
            const fd = new FormData()
            fd.append("file", image)
            fd.append("upload_preset", "lectures")
            fd.append("cloud_name", "dmdnmlfs5")
            fd.append("tags", "lectures")
            dispatch(addLectures(fd)).then((data) => {
                if (addLectures.fulfilled.match(data)) {
                    const url = data.payload.data.url
                    return dispatch(onPostMockUrl({ id, url }))
                } else {
                    console.error('Thunk-действие addLectures завершилось с ошибкой:', data.error);
                }
            })
        }
    }

    const handleUploadButtonClick = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

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
                    <input ref={fileRef} type="file" hidden onChange={handleImage} />
                    <Button onClick={handleUploadButtonClick} className={classes.control} size="lg" variant="default" color="gray">
                        Загрузить лекцию
                    </Button>
                    <Button disabled={image ? false : true} onClick={onAddLecture} className={classes.control} size="lg">
                        Отправить
                    </Button>
                </div>
            </div>

            <div className={classes.card_conteiner}>
                {lectures?.map((lecture) => <ArticleCardImage key={lecture.id} url={lecture.url} />)}
            </div>
        </Container>
    );
}