import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './HeroContentLeft.module.css';

export function HeroContentLeft() {
    const scrollToCenter = () => {
        window.scrollTo({
            top: 700,
            behavior: 'smooth',
        });
    };

    return (
        <div className={classes.hero}>
            <Overlay
                gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
                opacity={1}
                zIndex={0}
            />
            <Container className={classes.container} size="md">
                <Title className={classes.title}>Добро пожаловать на наш учебный портал!
                </Title>
                <Text className={classes.description} size="xl" mt="xl">
                    Здесь вы найдете удобное место для загрузки и доступа к лекциям вашей учебной группы. Обменяйтесь знаниями, углубляйтесь в учебный материал, и делитесь прозрачно в пределах вашей учебной среды.
                </Text>

                <Button onClick={scrollToCenter} variant="light" size="xl" radius="xl" className={classes.control}>
                    Поиск
                </Button>
            </Container>
        </div>
    );
}