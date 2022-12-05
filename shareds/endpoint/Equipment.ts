
export type IEquipment = {

}

export namespace findAll {
    export type Request = {
        query: {
            qrcode: string
            name: string
            maintenancedate: string
        }
    }
    export type Response = Array<IEquipment>
}

export namespace create {
    export type Request = {
        body: {
            qrCode: string
            name: string
            maintenanceDate: Date
        }
    }
    export type Response = IEquipment | false
}


export namespace findOne {
    export type Request = {
        params: {
            qrCode: string
        }
    }
    export type Response = IEquipment
}

export namespace update {
    export type Request = {
        params: {
            qrCode: string
        }
        body: {
            name: string
            maintenanceDate: Date
        }
    }
    export type Response = IEquipment | false
}


export namespace del {
    export type Request = {
        params: {
            qrCode: string
        }
    }
    export type Response = boolean
}


export {

}