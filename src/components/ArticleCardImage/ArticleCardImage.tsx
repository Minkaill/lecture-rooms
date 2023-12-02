import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import classes from './ArticleCardImage.module.css';

interface ArticleCardImageProps {
    url_image: string
}

export function ArticleCardImage({ url_image }: ArticleCardImageProps) {
    console.log(url_image)
    const theme = useMantineTheme();
    return (
        <Card
            p="lg"
            shadow="lg"
            className={classes.card}
            radius="md"
            component="a"
        >
            <div
                className={classes.image}
                style={{
                    backgroundImage: `url(${url_image})`,
                }}
            />
            <div className={classes.overlay} />

            <div className={classes.content}>
                <div>
                    <Text size="lg" className={classes.title} fw={500}>
                        Journey to Swiss Alps
                    </Text>

                    <Group justify="space-between" gap="xs">
                        <Text size="sm" className={classes.author}>
                            Robert Gluesticker
                        </Text>

                        <Group gap="lg">
                            <Center>
                                <IconEye
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="sm" className={classes.bodyText}>
                                    7847
                                </Text>
                            </Center>
                            <Center>
                                <IconMessageCircle
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="sm" className={classes.bodyText}>
                                    5
                                </Text>
                            </Center>
                        </Group>
                    </Group>
                </div>
            </div>
        </Card>
    );
}