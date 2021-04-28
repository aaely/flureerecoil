export type Product = {
    'product/category': Category,
    'product/cost': number,
    'product/handle': string,
    'product/inventory': number,
    'product/name': string,
    'product/imageHash': string,
    'product/productProfileId': Profile,
    _id: number
  }

export const initProduct = (): Product => ({
    'product/category': initCategory(),
    'product/cost': 0,
    'product/handle': '',
    'product/inventory': 0,
    'product/name': '',
    'product/imageHash': '',
    'product/productProfileId': initProfile(),
    _id: 0
})
  
  export type Category = {
    _id: number,
    'category/name': string,
    'category/handle': string,
    'category/description': string
  }

  export const initCategory = (): Category => ({
    _id: 0,
    'category/name': '',
    'category/handle': '',
    'category/description': ''
  })
  
  type Profile = {
    'productprofile/cannabinoidConcentrations': number[],
    'productprofile/cannabinoidIds': Cannabinoid[],
    'productprofile/productId': number,
    'productprofile/terpeneConcentrations': number[],
    'productprofile/terpeneIds': Terpene[],
    _id: number
  }

  export const initProfile = (): Profile => ({
    'productprofile/cannabinoidConcentrations': [],
    'productprofile/cannabinoidIds': initCannabinoids(),
    'productprofile/productId': 0,
    'productprofile/terpeneConcentrations': [],
    'productprofile/terpeneIds': initTerpenes(),
    _id: 0
  })

  export interface MySyntheticEvent {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: EventTarget;
    timeStamp: Date;
    type: string;
}

interface EventTarget {
    id: string,
    value: any
}

export type Item = {
    cost: number,
    id: number,
    name: string,
    quantity: number
}

export const initCart = (): Array<Item> => [{
    cost: 0,
    id: 0,
    name: '',
    quantity: 0
}]

export type UserProfile = {
    country: string,
    displayName: string,
    emails: string[],
    followers: number,
    id: string,
    photos: Photos[],
    product: string,
    profileUrl: string,
    provider: string,
    username: string
}

type Photos = {
    value: string
}

const initPhotos = (): Array<Photos> => [{
    value: ''
}]

export const initUser = (): UserProfile =>  ({
    country: '',
    displayName: '',
    emails: [''],
    followers: 0,
    id: '',
    photos: initPhotos(),
    product: '',
    profileUrl: '',
    provider: '',
    username: ''
})

export type Terpene = {
    _id: number,
    'terpene/handle': string,
    'terpene/name': string,
    'terpene/scentDesc': string,
    'terpene/effectDesc': string
}

export type Cannabinoid = {
    _id: number,
    'cannabinoid/handle': string,
    'cannabinoid/name': string,
    'cannabinoid/effectDesc': string
}

export const initTerpenes = (): Array<Terpene> => [{
    _id: 0,
    'terpene/handle': '',
    'terpene/name': '',
    'terpene/scentDesc': '',
    'terpene/effectDesc': ''
}]

export const initTerpene = (id: number, handle: string, name: string, scentDesc: string, effectDesc: string): Terpene => ({
    _id: id,
    'terpene/handle': handle,
    'terpene/name': name,
    'terpene/scentDesc': scentDesc,
    'terpene/effectDesc': effectDesc
})

export const initCannabinoids = (): Array<Cannabinoid> => [{
    _id: 0,
    'cannabinoid/handle': '',
    'cannabinoid/name': '',
    'cannabinoid/effectDesc': ''
}]

export const initCannabinoid = (id: number, handle: string, name: string, effectDesc: string): Cannabinoid => ({
    _id: id,
    'cannabinoid/handle': handle,
    'cannabinoid/name': name,
    'cannabinoid/effectDesc': effectDesc
})

export type Customer  = {
    _id: number,
    'customer/phone': string,
    'customer/email': string,
    'customer/license': string,
    'customer/firstName': string,
    'customer/lastName': string,
    'customer/purchases': PurchaseReceipt[],
    'customer/handle': string,
    'customer/dob': string,
}

export type Location = {
    _id: number,
    'location/handle': string,
    'location/nickName': string,
    'location/taxRate': number,
    'location/street': string,
    'location/city': string,
    'location/state': string,
    'location/zip': string    
}

export type PurchaseReceipt = {
    _id: number,
    'purchaseReceipt/handle': string,
    'purchaseReceipt/purchaser': Customer,
    'purchaseReceipt/products': string,
    'purchaseReceipt/quantities': number [],
    'purchaseReceipt/grandTotal': number,
    'purchaseReceipt/amountTax': number,
    'purchaseReceipt/rawTotal': number,
    'purchaseReceipt/locationId': Location,
    'purchaseReceipt/state': string,
    'purchaseReceipt/zip': string
}

export const initCustomer = (): Customer => ({
    _id: 0,
    'customer/phone': '',
    'customer/email': '',
    'customer/license': '',
    'customer/firstName': '',
    'customer/lastName': '',
    'customer/purchases': [],
    'customer/handle': '',
    'customer/dob': '',
})

export const initPurchaseReceipt = (): PurchaseReceipt => ({
    _id: 0,
    'purchaseReceipt/handle': '',
    'purchaseReceipt/purchaser': initCustomer(),
    'purchaseReceipt/products': '',
    'purchaseReceipt/quantities': [],
    'purchaseReceipt/grandTotal': 0,
    'purchaseReceipt/amountTax': 0,
    'purchaseReceipt/rawTotal': 0,
    'purchaseReceipt/locationId': initLocation(),
    'purchaseReceipt/state': '',
    'purchaseReceipt/zip': ''
})

export const initPurchaseReceipts = (): PurchaseReceipt[] => [{
    _id: 0,
    'purchaseReceipt/handle': '',
    'purchaseReceipt/purchaser': initCustomer(),
    'purchaseReceipt/products': '',
    'purchaseReceipt/quantities': [],
    'purchaseReceipt/grandTotal': 0,
    'purchaseReceipt/amountTax': 0,
    'purchaseReceipt/rawTotal': 0,
    'purchaseReceipt/locationId': initLocation(),
    'purchaseReceipt/state': '',
    'purchaseReceipt/zip': ''
}]


export const initLocation = (): Location => ({
    _id: 0,
    'location/handle': '',
    'location/nickName': '',
    'location/taxRate': 0,
    'location/street': '',
    'location/city': '',
    'location/state': '',
    'location/zip': ''
})

export const initLocations = (): Location[] => [{
    _id: 0,
    'location/handle': '',
    'location/nickName': '',
    'location/taxRate': 0,
    'location/street': '',
    'location/city': '',
    'location/state': '',
    'location/zip': ''
}]
