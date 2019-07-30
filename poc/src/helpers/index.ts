


export function toArray<T>(map: { [name: string]: T }, sortNames?: boolean): T[] {

    const ret: T[] = [];
    if (!!map) {
        if (!sortNames) { return Object.values(map); }

        const keys = Object.keys(map).sort();

        for (const key of keys) {
            if (map.hasOwnProperty(key)) {
                ret.push(map[key]);
            }
        }
    }
    return ret;
}

export function getOrAdd<T>(array: T[], predicate: (value: T) => boolean, factory: () => T) {

    const existing = array.find(predicate);
    if (existing === undefined) {

        const value = factory();
        array.push(value);
        return value;
    }
    return existing;
}


export declare type ItemSet<T> = Array<T | T[]>;

export function forEachItem<T>(items: Array<T | T[]>, handler: (item: T) => void) {
    
    if (!items) {
        return;
    }

    items.forEach(item=>{
        if (Array.isArray(item)) {
            item.forEach(handler);
        } else{
            handler(item);
        }
    });
}