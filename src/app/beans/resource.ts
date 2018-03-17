export abstract class Resource {
    _links: {
        self: {
            href: string
        }
    }

    getSelfLink(): string {
        return this._links.self.href;
    }

    getLink(resourceName: string) {
        return this._links[resourceName].href;
    }
}