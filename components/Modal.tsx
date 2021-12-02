import styles from '@/styles/Modal.module.css';
import { useState, useEffect, ReactNode, MouseEvent } from 'react';
import ReactDom from 'react-dom';
import { FaTimes } from 'react-icons/fa';

type ComponentProps = {
  show: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

type PortalProps = {
  children: ReactNode;
  container: HTMLElement | null;
};

export default function Modal({
  show,
  onClose,
  children,
  title,
}: ComponentProps) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <a href='#' onClick={handleClose}>
            <FaTimes />
          </a>
        </div>
        {title && <div>{title}</div>}
        <div className={styles.body}>{children} </div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDom.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
}
