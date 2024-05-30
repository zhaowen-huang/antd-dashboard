/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";

const useDisclosure = (onClose?: () => void, onOpen?: () => void) => {
    const [isOpen, setIsOpen] = useState(false);
    const setClose = () => {
        if (onClose) onClose();
        setIsOpen(false);
    };
    const setOpen = () => {
        if (onOpen) onOpen();
        setIsOpen(true);
    };
    return {
        isOpen,
        setClose,
        setOpen,
    };
};
export default useDisclosure;
