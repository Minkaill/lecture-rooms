import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { getCategoryById } from "@/store/features/categories"
import { selectCategories } from "@/store/slices/categories"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Title, Text, Button, Container } from '@mantine/core';
import { Dots } from './Dots';
import { getLectures } from "@/store/features/lecture"
import { selectLectures } from "@/store/slices/lectures"
import { ArticleCardImage } from "@/components/ArticleCardImage/ArticleCardImage"
import { Buffer } from "buffer"
import classes from './Category.module.css';
import Loader from "react-loaders"
import axios from "axios"

export function Category() {
    const { selectedCategory, isLoading } = useAppSelector(selectCategories)
    const { lectures } = useAppSelector(selectLectures)
    const dispatch = useAppDispatch()
    const fileRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const { id } = useParams()

    const [image, setImage] = useState<File | string>("");
    const [images, setImages] = useState<any>([])
    const [url, setUrl] = useState<any>("")

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        setImage(event.target.files[0]);
    };

    const cloudName = "dmdnmlfs5";
    const apiKey = "737714675811424";
    const apiSecret = "7MT5DIwdla1eSt8EOX7PhoRN_Fw";

    const imageUrl = "https://res.cloudinary.com/dmdnmlfs5/image/upload/"

    async function getFolders() {
        const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/lectures.json`
            ,
            {
                method: "GET",
                headers: {
                    Authorization: `Basic ${Buffer.from(apiKey + ':' + apiSecret).toString('base64')}`
                }
            }
        ).then(r => r.json()).then((data) => setImages(data)).catch((e: any) => console.warn(e))
        return response;
    }

    useEffect(() => {
        getFolders()
    }, [])

    console.log(images.resources)

    const handleImageApi = () => {
        try {
            if (image) {
                const formData = new FormData()
                formData.append("file", image)
                formData.append("upload_preset", "lectures")
                formData.append("cloud_name", "dmdnmlfs5")
                formData.append("tags", "lectures")
                axios.post(`https://api.cloudinary.com/v1_1/dmdnmlfs5/image/upload`, formData)
                    .then(({ data }: any) => setUrl(data)).catch((error) => alert(`Ошибка: ${error}`))
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

    // const test = `${imageUrl}${images.resources[0].public_id}.${images.resources[0].format}`

    return (
        <Container className={classes.wrapper} size={1400}>
            {/* <img src={`${url}${images.resources[0]}`} alt="" /> */}
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
                {lectures?.map((lecture) => <ArticleCardImage key={lecture.id} url_image={lecture.url_image} name={lecture.name} />)}
            </div>
        </Container>
    );
}