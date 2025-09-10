import styles from './style.module.scss'
import { createPortal } from 'react-dom';
import { memo } from 'react';
import dummyPatch from '../assets/dummy-patch.svg'
interface LaunchModalProps {
    patch: string | null,
    name: string,
    rocket: string,
    details: string | null,
    onClick: () => void
}
interface PortalProps {
    children: React.ReactNode;
}

const Portal = ({ children }: PortalProps) => {
    const portalRoot = document.getElementById('portal-root')
    return portalRoot ? createPortal(children, portalRoot) : null
}

const MemoizedPortal = memo(Portal)

const LaunchModal = ({ patch, name, rocket, details, onClick }: LaunchModalProps) => {
    return (
        <MemoizedPortal>
            <div className={styles['modal-overlay']}>
                <div className={styles['launch-modal']}>
                    <div className={styles['modal-header']}>
                        <h2>{name}</h2>
                        <div onClick={onClick} className={styles['modal-header-button']}>X</div>
                    </div>
                    <img src={patch || dummyPatch} alt="" className={styles['modal-patch']}/>
                    <div className={styles['modal-section-container']}>
                        <h3 className={styles['modal-section-container__heading']}>Mission name:</h3>
                        <p className={styles['modal-section-container__content']}>{name}</p>
                    </div>
                    <div className={styles['modal-section-container']}>
                        <h3 className={styles['modal-section-container__heading']}>Rocket name:</h3>
                        <p className={styles['modal-section-container__content']}>{rocket}</p>
                    </div>
                    <div className={styles['modal-section-container']}>
                        <h3 className={styles['modal-section-container__heading']}>Details</h3>
                        <p className={styles['modal-section-container__content']}>{details || 'No details :('}</p>
                    </div>
                </div>
            </div>
        </MemoizedPortal>
    )
}

export default LaunchModal