export interface AgencyModelInterface {
    id?: number
    name: string
    url: string
    lang: string
    dom_class_name: string
    has_span: number
}
export interface NewsModelInterface {
    id?: number
    agency_id: number
    category_id?: number
    headline: string
    url: string
    created?: Date

}

export interface CategoryModelInterface {
    id?: number
    name: string
}