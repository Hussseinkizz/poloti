import { useEffect, useState } from "react";

// Todo: beautify this, make it work and wb refers to work box, import it!

const PwaUpdater = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onConfirmActivate = () => wb.messageSkipWaiting();

    useEffect(() => {
      wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      wb.addEventListener('waiting', () => setIsOpen(true));
      wb.register();
    }, []);

    const Modal = ({children, isOpen, setIsOpen, heading}) => {
      return (
        <section>
          <h1>{heading}</h1>
          {children}</section>
      )
    }

    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        heading={'New version available!'}
      >
        <div>
          Hey, a new version is available! Please click below to update.
        </div>

        <button onClick={onConfirmActivate}>Reload and update</button>
        <button oncClick={() => setIsOpen(false)}>Cancel</button>
      </Modal>
    );
  }

  export default PwaUpdater;