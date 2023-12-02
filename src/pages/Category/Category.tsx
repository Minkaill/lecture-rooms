import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { getCategoryById } from "@/store/features/categories"
import { selectCategories } from "@/store/slices/categories"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './Category.module.css';
import Loader from "react-loaders"
import axios from "axios"
import { getLectures } from "@/store/features/lecture"
import { selectLectures } from "@/store/slices/lectures"
import { ArticleCardImage } from "@/components/ArticleCardImage/ArticleCardImage"

export function Category() {
    const { selectedCategory, isLoading } = useAppSelector(selectCategories)
    const { lectures } = useAppSelector(selectLectures)
    const dispatch = useAppDispatch()
    const fileRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const { id } = useParams()

    const [image, setImage] = useState<File | string>("");
    const [fileBase64, setFileBase64] = useState<string>("")
    console.log(fileBase64)

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = URL.createObjectURL((event.target.files as FileList)[0])
        setImage(selectedFile);
        convertFile(event.target.files)
    };

    const handleImageApi = () => {
        try {
            if (image) {
                const formData = new FormData()
                formData.append("url_image", fileBase64)
                axios.post(`https://653fb19b9e8bd3be29e10e51.mockapi.io/categories/${id}/lectures`, formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch((error) => {
                    alert(`Ошибка: Слишком большой размер файла`)
                })
            } else {
                alert("Выберите файл перед отправкой")
            }
        } catch (error) {
            alert("Что-то пошло не так")
        }
    }

    const handleUploadButtonClick = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    };

    const convertFile = (files: FileList | null) => {
        if (files) {
            const fileR = files[0] || ""
            const fileType: string = fileR.type || ""
            console.log("This file upload is of type:", fileType)
            const reader = new FileReader()
            reader.readAsBinaryString(fileR)
            reader.onload = (ev: any) => {
                setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
            }
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
                    <input ref={fileRef} type="file" hidden onChange={handleImage} />
                    <Button onClick={handleUploadButtonClick} className={classes.control} size="lg" variant="default" color="gray">
                        Загрузить лекцию
                    </Button>
                    <Button disabled={image ? false : true} onClick={handleImageApi} className={classes.control} size="lg">
                        Отправить
                    </Button>
                </div>
            </div>

            <div className={classes.card_conteiner}>
                {lectures?.map((lecture) => <ArticleCardImage key={lecture.id} url_image={lecture.url_image} />)}
            </div>
        </Container>
    );
}