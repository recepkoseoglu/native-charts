export class Arrays {
    static indexOf(array: Array<any>, item: any): number {
        if (array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] === item) {
                    return i;
                }
            }
        }
        return -1;
    }

    static remove(array: Array<any>, item: any): boolean {
        let index = Arrays.indexOf(array, item);
        if (index >= 0) {
            array.splice(index, 1);
            return true;
        }
        return false;
    }


    /**
     * Finds the index of the item with target value from the given array. Checks arrayItem[key] === target returns index if matches.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {number} The index of the target. Returns "-1" in case of no match.
     */
    static indexOfByKey(source: Array<any>, key: string, target: any): number {
        for (let i = 0; i < source.length; i += 1) {
            if (source[i][key] === target) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Returns the value of the item with the given key from the array. Checks arrayItem[key] === target returns value if matches.
     * @param {Array} source Source array for the operation.
     * @param {string} key Key for checking array items.
     * @param {any} target Target to match.
     * @returns {any} The item. Returns "undefined" in case of no match.
     */
    static getValueByKey(source: Array<any>, key: string, target: any): any {
        const index: number = Arrays.indexOfByKey(source, key, target);
        return index !== -1 ? source[index] : undefined;
    }

}

export default Arrays;