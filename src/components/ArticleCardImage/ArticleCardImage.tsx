import { Card } from '@mantine/core';
import classes from './ArticleCardImage.module.css';
import { DonwloadIcon, WatchIcon } from '../../assets/icons/icons.jsx';

interface ArticleCardImageProps {
    url: string,
}

export function ArticleCardImage({ url }: ArticleCardImageProps) {

    return (
        <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            // href={url}
            // target='blank'
            component="a"
        >
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${url})`,
                }}
            />
            <div className={classes.overlay}>
                <div className={classes.icons}>
                    <DonwloadIcon url={url} />
                    <WatchIcon url={url} />
                </div>
            </div>
        </Card>
    );
}