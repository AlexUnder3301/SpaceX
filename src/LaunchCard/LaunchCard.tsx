import styles from './style.module.scss'
import { Card, Button } from '@mantine/core'
import dummyPatch from '../assets/dummy-patch.svg'

interface LaunchCardProps {
    name: string,
    rocketName: string,
    patch: string | null,
    handleModalOpen: (name: string) => void
}

const LaunchCard = ({name, rocketName, patch, handleModalOpen}: LaunchCardProps) => {
    return (
        <Card shadow="sm" padding="md" radius="md" withBorder className={styles['launch-card']}>
            <img src={patch || dummyPatch} alt="" className={styles['card-patch']}/>
            <h3 className={styles['card-name']}>{name}</h3>
            <p className={styles['card-rocket']}>{rocketName}</p>
            <Button onClick={() => {
                handleModalOpen(name)
            }} 
            className={styles['card-button']}>See more</Button>
        </Card>
    )
}

export default LaunchCard