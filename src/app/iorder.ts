import {IDetailOrder} from './idetail-order'
export interface IOrder {
    id: number,
    userId: number,
    tenNguoiNhannHang: string,
    diachi: string,
    sdt: string,
    tongTien: number,
    trangThai: number
}
