
export interface dataModel {
    name: string
    cpf: string
    email: string
    whatsapp: string
    cep: string
    deliveryMethod: string
    cnh: string
    number: string
    complement: string
}

export interface dataTitle {
    principalTitle: string

}

export interface dataMessages {
    successMessage: string
}

export interface dataMessagesCpf {
    alertCpf: string
}

export interface dataMessagesEmail {
    alertEmail: string
}

export interface dataCep {
    alertCep: string
    cep: string
}

export interface dataMethod {
    alertMethod: string
    methodMoto: string
    methodBicicleta: string
    methodVan: string
}

export interface dataRequiredMsg {
    msgName: string
    msgCpf: string
    msgEmail: string
    msgCep: string
    msgNumber: string
    msgDeliveryMethod: string
    msgCnh: string
}
