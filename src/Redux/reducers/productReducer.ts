import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import { httpNonAuth } from '../../Util/config';
import { boolean } from 'yup';

export interface ShopModel {
    id: string;
    name: string;
    alias: string;
    description: string;
    image: string;

}

export interface ProductModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    description: string;
    size: string;
    shortDescription: string;
    quantity: number;
    deleted: boolean;
    categories: string;
    relatedProducts: string;
    feature: boolean;
    image: string;
}
export interface ProductDetailModel {
    id: number;
    name: string;
    alias: string;
    price: number;
    feature: boolean;
    description: string;
    size: string[];
    shortDescription: string;
    quantity: number;
    image: string;
    categories: Category[];
    relatedProducts: RelatedProduct[];
}

export interface Category {
    id: string;
    category: string;
}

export interface RelatedProduct {
    id: number;
    name: string;
    alias: string;
    feature: boolean;
    price: number;
    description: string;
    shortDescription: string;
    image: string;
}
export interface ProductState {
    arrProduct: ProductModel[]
    arrPaging: ProductModel[]
    arrCategory: ProductModel[]
    categoryName: string
    productDetail: ProductDetailModel | null
    arrProductSearch: ProductModel[]
    searchValue: string
    arrShopShoe: ShopModel[]
    idLoading: boolean
}
const initialState: ProductState = {
    arrProduct: [],
    arrPaging: [],
    arrCategory: [],
    categoryName: "",
    productDetail: null,
    arrProductSearch: [],
    searchValue: "",
    arrShopShoe: [],
    idLoading: false,
}
const productReducer = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        getProductsAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrProduct = action.payload;
        },
        getPagingAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrPaging = action.payload;
        },
        getCategoryNameAction: (state: ProductState, action: PayloadAction<string>) => {
            state.categoryName = action.payload;
        },
        getCategoryAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrCategory = action.payload;
        },
        getProductByIdAction: (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
            state.productDetail = action.payload;
        },
        getSearchProductAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
            state.arrProductSearch = action.payload;
        },
        getSearchValueAction: (state: ProductState, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        getShopAction: (state: ProductState, action: PayloadAction<ShopModel[]>) => {
            state.arrShopShoe = action.payload;
        },
    }
});

export const { getProductsAction, getPagingAction, getCategoryAction, getProductByIdAction, getCategoryNameAction, getSearchProductAction, getSearchValueAction , getShopAction} = productReducer.actions

export default productReducer.reducer


// ---------------- action async --------------

export const getDataProductApi = () => {
    return async (dispatch: DispatchType) => {

        const res = await httpNonAuth.get('/api/product');

        const action: PayloadAction<ProductModel[]> = getProductsAction(res.data.content);
        dispatch(action);
    }
}

export const getPagingApi = (pageIndex: number, pageSize: number) => {
    return async (dispatch: DispatchType) => {

        const res = await httpNonAuth.get(`/api/Product/getpaging?pageIndex=${pageIndex}&pageSize=${pageSize}`);

        const action: PayloadAction<ProductModel[]> = getPagingAction(res.data.content.items);
        dispatch(action);
    }
}

export const getProductByCategoryApi = (categoryId: string) => {
    return async (dispatch: DispatchType) => {

        const res = await httpNonAuth.get(`/api/Product/getProductByCategory?categoryId=${categoryId}`);

        const action: PayloadAction<ProductModel[]> = getCategoryAction(res.data.content);
        dispatch(action);
    }
}


export const getProductDetailApi = (id: string) => {
    return async (dispatch: DispatchType) => {

        const res = await httpNonAuth.get(`/api/Product/getbyid?id=${id}`);

        const action: PayloadAction<ProductDetailModel> = getProductByIdAction(res.data.content);
        dispatch(action);
    }
}

export const getProductByKeyWordApi = (keyword: string) => {
    return async (dispatch: DispatchType) => {

        const res = await httpNonAuth.get(`/api/Product?keyword=${keyword}`);

        console.log("🚀 ~ file: productReducer.ts:147 ~ return ~ res:", res.data.content)
        const action: PayloadAction<ProductModel[]> = getSearchProductAction(res.data.content);
        dispatch(action);
    }
}

export const getShopApi =  (keyword: string) => {
    return async (dispatch: DispatchType) => {

        const res = await httpNonAuth.get(`/api/Product/getAllStore?keyword=${keyword}`);

        
        console.log("🚀 ~ file: productReducer.ts:166 ~ return ~ res:", res.data.content)

        const action: PayloadAction<ShopModel[]> = getShopAction(res.data.content);
        dispatch(action);
    }
}

