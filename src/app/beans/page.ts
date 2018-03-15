export class Page<T> {
    _embedded: any;
    _links: {
        first: {
            href: string;
        },
        self: {
            href: string;
        },
        next: {
            href: string;
        },
        prev: {
            href: string;
        }
        last: {
            href: string;
        }
        profile: {
            href: string;
        }
    };
    page: {
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
    }

    public get resources(): T[] {
        let val = this._embedded;
        return val[Object.keys(val)[0]];
    }
    getResources(): T[] {
        let val = this._embedded;
        return val[Object.keys(val)[0]];
    } 
}