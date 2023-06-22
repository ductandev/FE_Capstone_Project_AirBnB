import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getStoreJson, setStoreJson } from '../../Util/config';


export interface ProductCart {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface ProductQuantity {
  id: number;
  quantity: number;
}

export interface CartState {
  arrProductCart: ProductCart[]
  idProductCart: number
  idQuantity: ProductQuantity[]
}

const initialState: CartState = {
  arrProductCart: getStoreJson('arrProductCart'),
  idProductCart: 0,
  idQuantity: [],
}

const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    getProductCartAction: (state: CartState, action: PayloadAction<ProductCart>) => {
      // immutable redux: tính bất biến
      let productClick = { ...action.payload }; // Tạo một bản sao của đối tượng
      productClick.quantity = 1;

      let existingProduct = state.arrProductCart.find(prod => prod.id === productClick.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.arrProductCart.push(productClick)
      }
      setStoreJson('arrProductCart', state.arrProductCart)
    },

    delProductCartAction: (state: CartState, action: PayloadAction<number>) => {
      let id = action.payload;
      let indexDel = state.arrProductCart.findIndex(prod => prod.id === id);
      if (indexDel !== -1) {
        state.arrProductCart.splice(indexDel, 1);
      }
      setStoreJson('arrProductCart', state.arrProductCart)
    },

    changeQuantityAction: (state: CartState, action: PayloadAction<ProductQuantity>) => {
      let { id, quantity } = action.payload;
      let quantityProdCart = state.arrProductCart.find(prod => prod.id === id);

      if (quantityProdCart) {
        if (quantity === -1 && quantityProdCart.quantity === 1) {
          // Xóa sản phẩm nếu số lượng bé hơn 1
          // .filter : trả về một mảng mới chỉ chứa các phần tử thỏa mãn một điều kiện được xác định.
          // Nếu prod.id khác với id được truyền vào thì phần tử đó sẽ được giữ lại trong mảng kết quả và ngược lại
          // Kết quả của phương thức filter() sẽ được gán lại cho mảng arrProductCart trong state, nhằm cập nhật giá trị mới của mảng này (có thể gọi là xóa)
          const confirmed = window.confirm('Do you really want to delete this product?');
          if (confirmed) {
            state.arrProductCart = state.arrProductCart.filter(prod => prod.id !== id); //Đây là một hàm callback
            setStoreJson('arrProductCart', state.arrProductCart)
          }
        } else {
          quantityProdCart.quantity += quantity;
          setStoreJson('arrProductCart', state.arrProductCart)
        }
      }
    }
  }
});

export const { getProductCartAction, delProductCartAction, changeQuantityAction } = cartReducer.actions

export default cartReducer.reducer