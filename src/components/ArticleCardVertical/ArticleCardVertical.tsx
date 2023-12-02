import { Card, Image, Avatar, Text, Group } from '@mantine/core';
import classes from './ArticleCardVertical.module.css';
import { useNavigate } from 'react-router-dom';

interface ArticleCardVerticalProps {
    name: string,
    id: string
}

export function ArticleCardVertical({ name, id }: ArticleCardVerticalProps) {
    const navigate = useNavigate()
    return (
        <Card onClick={() => navigate(`/category/${id}`)} withBorder radius="md" p={0} className={classes.card}>
            <Group wrap="nowrap" gap={0}>
                <div className={classes.body}>
                    <Text tt="uppercase" c="dimmed" fw={700} size="xs">
                        Предмет
                    </Text>
                    <Text className={classes.title} mt="xs" mb="md">
                        {name}
                    </Text>
                    <Group wrap="nowrap" gap="xs">
                        <Group gap="xs" wrap="nowrap">
                            <Avatar
                                size={20}
                                src="/user.png"
                            />
                            <Text size="xs">Преподаватель</Text>
                        </Group>
                        <Text size="xs" c="dimmed">
                            •
                        </Text>
                        <Text size="xs" c="dimmed">
                            Feb 6th
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
}