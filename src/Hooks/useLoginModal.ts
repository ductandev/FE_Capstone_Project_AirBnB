/*
    Đoạn code này sử dụng thư viện zustand
    để tạo một hook tùy chỉnh trong React
    để quản lý trạng thái của một modal đăng ký.
*/ 
import { create} from 'zustand'

interface LoginModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
    isOpen: false,
    // Khi gọi onOpen, ta sử dụng hàm set để cập nhật giá trị của thuộc tính isOpen thành true.
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useLoginModal;